/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (2.0.0).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const INTEGRITY_CHECKSUM = '65d33ca82955e1c5928aed19d1bdf3f9'
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse')
const activeClientIds = new Set()

self.addEventListener('install', function () {
    self.skipWaiting()
})

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
    const clientId = event.source.id

    if (!clientId || !event.data) {
        return
    }

    const allClients = await self.clients.matchAll({
        type: 'window',
    })

    switch (event.data.type) {
        case 'KEEPALIVE_REQUEST': {
            sendToClient(event.source, {
                type: 'KEEPALIVE_RESPONSE',
            })
            break
        }

        case 'INTEGRITY_CHECK_REQUEST': {
            sendToClient(event.source, {
                type: 'INTEGRITY_CHECK_RESPONSE',
                payload: INTEGRITY_CHECKSUM,
            })
            break
        }

        case 'MOCK_ACTIVATE': {
            activeClientIds.add(clientId)

            sendToClient(event.source, {
                type: 'MOCKING_ENABLED',
                payload: true,
            })
            break
        }

        case 'MOCK_DEACTIVATE': {
            activeClientIds.delete(clientId)
            break
        }

        case 'CLIENT_CLOSED': {
            activeClientIds.delete(clientId)

            const remainingClients = allClients.filter((client) => {
                return client.id !== clientId
            })

            // Unregister itself when there are no more clients
            if (remainingClients.length === 0) {
                self.registration.unregister()
            }

            break
        }
    }
})

self.addEventListener('fetch', function (event) {
    const { request } = event
    const accept = request.headers.get('accept') || ''

    // Bypass server-sent events.
    if (accept.includes('text/event-stream')) {
        return
    }

    // Bypass navigation requests.
    if (request.mode === 'navigate') {
        return
    }

    // Opening the DevTools triggers the "only-if-cached" request
    // that cannot be handled by the worker. Bypass such requests.
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
        return
    }

    // Bypass all requests when there are no active clients.
    // Prevents the self-unregistered worked from handling requests
    // after it's been deleted (still remains active until the next reload).
    if (activeClientIds.size === 0) {
        return
    }

    // Generate unique request ID.
    const requestId = Math.random().toString(16).slice(2)

    event.respondWith(
        handleRequest(event, requestId).catch((error) => {
            if (error.name === 'NetworkError') {
                console.warn(
                    '[MSW] Successfully emulated a network error for the "%s %s" request.',
                    request.method,
                    request.url,
                )
            }

            // At this point, any exception indicates that the original request
            // wasn't handled by the mocked service worker. Rethrow it to let
            // the browser handle it naturally.
            throw error
        }),
    )
})

async function handleRequest(event, requestId) {
    const client = await resolveMainClient(event)
    const response = await getResponse(event, client, requestId)

    // Send back the response clone for the "response:*" life-cycle events.
    // Ensure MSW is active and ready to handle the message, otherwise
    // this message will pend indefinitely.
    if (client && activeClientIds.has(client.id)) {
        ; (async function () {
            const clonedResponse = response.clone()
            sendToClient(client, {
                type: 'RESPONSE',
                payload: {
                    requestId,
                    type: clonedResponse.type,
                    ok: clonedResponse.ok,
                    status: clonedResponse.status,
                    statusText: clonedResponse.statusText,
                    body:
                        clonedResponse.body === null ? null : await clonedResponse.text(),
                    headers: Object.fromEntries(clonedResponse.headers.entries()),
                    redirected: clonedResponse.redirected,
                },
            })
        })()
    }

    return response
}

// Resolve the main client for the given event.
// Client that issues a request doesn't equal the client that registered
// the worker, so we need to resolve the client that registered the worker.
async function resolveMainClient(event) {
    const client = await self.clients.get(event.clientId)

    if (client?.frameType === 'top-level') {
        return client
    }

    const allClients = await self.clients.matchAll({
        type: 'window',
    })

    return allClients
        .filter((client) => {
            // Get only those clients that are currently visible.
            return client.visibilityState === 'visible'
        })
        .find((client) => {
            // Find the client ID that's recorded in the
            // set of clients that have registered the worker.
            return activeClientIds.has(client.id)
        })
}

async function getResponse(event, client, requestId) {
    const { request } = event
    const clonedRequest = request.clone()

    function passthrough() {
        // Clone the request because it might've been already used
        // (i.e. its body has been read and sent to the client).
        const headers = Object.fromEntries(clonedRequest.headers.entries())

        // Remove MSW-specific headers to prevent them from being sent.
        // Remove only a single instance of the header.
        // https://github.com/mswjs/msw/issues/1160
        const headersEntries = Object.entries(headers).filter(([key]) => {
            return !key.toLowerCase().startsWith('x-msw')
        })

        return fetch(clonedRequest, {
            headers: headersEntries,
        })
    }

    // Bypass mocking when the client is not active.
    if (!client) {
        return passthrough()
    }

    // Bypass initial page load requests (i.e. static assets).
    // The absence of the immediate/parent client in the map of the active clients
    // means that MSW hasn't dispatched the "MOCK_ACTIVATE" event yet.
    // This means that the client is still performing the initial page load.
    // When that happens, we want to bypass mocking entirely.
    if (!activeClientIds.has(client.id)) {
        return passthrough()
    }

    // Bypass requests with the explicit bypass header
    if (request.headers.get('x-msw-bypass') === 'true') {
        return passthrough()
    }

    // WARN: Be aware that this is a workaround for the issue where the client
    // is not properly identified during the first request. This is a temporary
    // solution that will be removed once the issue is fixed.
    // https://github.com/mswjs/msw/issues/1150
    if (request.url.includes('localhost:5173')) {
        return passthrough()
    }

    // Notify the client that a request has been intercepted.
    const clientMessage = await sendToClient(client, {
        type: 'REQUEST',
        payload: {
            id: requestId,
            url: request.url,
            method: request.method,
            headers: Object.fromEntries(request.headers.entries()),
            cache: request.cache,
            mode: request.mode,
            credentials: request.credentials,
            destination: request.destination,
            integrity: request.integrity,
            redirect: request.redirect,
            referrer: request.referrer,
            referrerPolicy: request.referrerPolicy,
            body: await request.text(),
            bodyUsed: request.bodyUsed,
            keepalive: request.keepalive,
        },
    })

    switch (clientMessage.type) {
        case 'MOCK_RESPONSE': {
            return respondWithMock(clientMessage.data)
        }

        case 'MOCK_NOT_FOUND': {
            return passthrough()
        }

        case 'NETWORK_ERROR': {
            const { name, message } = clientMessage.data
            const networkError = new Error(message)
            networkError.name = name

            // Rejecting a request Promise is equivalent
            // to throwing a network error.
            throw networkError
        }
    }

    return passthrough()
}

function sendToClient(client, message) {
    return new Promise((resolve, reject) => {
        const channel = new MessageChannel()

        channel.port1.onmessage = (event) => {
            if (event.data && event.data.error) {
                return reject(event.data.error)
            }

            resolve(event.data)
        }

        client.postMessage(
            message,
            [channel.port2],
        )
    })
}

function sleep(timeMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeMs)
    })
}

async function respondWithMock(response) {
    await sleep(response.delay)
    return new Response(response.body, response)
}
