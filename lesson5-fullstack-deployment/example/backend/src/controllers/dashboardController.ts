import { Request, Response } from 'express';
import { Dashboard } from '../models/Dashboard';

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
export const getDashboard = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any)?._id;

        // Get or create dashboard for user
        let dashboard = await Dashboard.findOne({ userId });

        if (!dashboard) {
            dashboard = await Dashboard.create({
                userId,
                widgets: [
                    { id: 'welcome', type: 'welcome', position: { x: 0, y: 0 } },
                    { id: 'stats', type: 'stats', position: { x: 1, y: 0 } },
                ],
            });
        }

        res.json({
            success: true,
            data: {
                dashboard: {
                    id: dashboard._id,
                    userId: dashboard.userId,
                    widgets: dashboard.widgets,
                    layout: dashboard.layout,
                    settings: dashboard.settings,
                },
            },
        });
    } catch (error: any) {
        console.error('Get dashboard error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Update dashboard layout
// @route   PUT /api/dashboard/layout
// @access  Private
export const updateLayout = async (req: Request, res: Response) => {
    try {
        const { layout } = req.body;
        const userId = (req.user as any)?._id;

        const dashboard = await Dashboard.findOneAndUpdate(
            { userId },
            { layout },
            { new: true, upsert: true }
        );

        res.json({
            success: true,
            data: {
                dashboard: {
                    id: dashboard._id,
                    userId: dashboard.userId,
                    widgets: dashboard.widgets,
                    layout: dashboard.layout,
                    settings: dashboard.settings,
                },
            },
        });
    } catch (error: any) {
        console.error('Update layout error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Add widget to dashboard
// @route   POST /api/dashboard/widgets
// @access  Private
export const addWidget = async (req: Request, res: Response) => {
    try {
        const { widget } = req.body;
        const userId = (req.user as any)?._id;

        const dashboard = await Dashboard.findOne({ userId });

        if (!dashboard) {
            return res.status(404).json({ error: 'Dashboard not found' });
        }

        dashboard.widgets.push(widget);
        await dashboard.save();

        res.json({
            success: true,
            data: {
                dashboard: {
                    id: dashboard._id,
                    userId: dashboard.userId,
                    widgets: dashboard.widgets,
                    layout: dashboard.layout,
                    settings: dashboard.settings,
                },
            },
        });
    } catch (error: any) {
        console.error('Add widget error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Remove widget from dashboard
// @route   DELETE /api/dashboard/widgets/:widgetId
// @access  Private
export const removeWidget = async (req: Request, res: Response) => {
    try {
        const { widgetId } = req.params;
        const userId = (req.user as any)?._id;

        const dashboard = await Dashboard.findOne({ userId });

        if (!dashboard) {
            return res.status(404).json({ error: 'Dashboard not found' });
        }

        dashboard.widgets = dashboard.widgets.filter(
            (widget: any) => widget.id !== widgetId
        );
        await dashboard.save();

        res.json({
            success: true,
            data: {
                dashboard: {
                    id: dashboard._id,
                    userId: dashboard.userId,
                    widgets: dashboard.widgets,
                    layout: dashboard.layout,
                    settings: dashboard.settings,
                },
            },
        });
    } catch (error: any) {
        console.error('Remove widget error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
