import { dashboardService } from "./dashboard.service.js"


export async function getDashboard(req, res) {
    const { loggedinUser } = req
    try {
        const snapshot = await dashboardService.getSnapshot(loggedinUser._id)
        res.send(snapshot)
    } catch (err) {
        console.error('Failed to get dashboard:', err);
        res.status(500).json({ error: 'Failed to load dashboard' });
    }
}