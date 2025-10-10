import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// ✅ CHECKPOINT: MSW browser setup for development
export const worker = setupWorker(...handlers)
