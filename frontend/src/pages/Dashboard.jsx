import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { dashboardService } from "../services/dashboard.service";
import { DashboardGrid } from '../cmps/DashboardGrid';

export function Dashboard() {
    const { user } = useAuth();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isCancelled = false;

        async function loadData() {
            setLoading(true);
            setError('');
            try {
                const data = await dashboardService.getDashboard();
                if (!isCancelled) setDashboard(data);
            } catch (err) {
                if (!isCancelled) setError(err.message || 'Failed to load dashboard');
            } finally {
                if (!isCancelled) setLoading(false);
            }
        }

        loadData();

        return () => {
            isCancelled = true;
        };
    }, []);

    if (!user) return <div className="page">Loading...</div>;

    return (
        <section className="page page--dashboard">
            <header className="page-header">
                <h1 className="page-header__title">
                    Hi {user.name.split(' ')[0] || 'friend'}!
                </h1>
                <p className="page-header__subtitle">
                    Here&apos;s your personalized crypto dashboard for today.
                </p>
                <p className="page-header__meta">
                    Dashboard updates automatically every day.
                </p>
            </header>

            {loading && (
                <div className="dashboard-loader">
                    <div className="spinner" />
                    <span>Building your dashboard...</span>
                </div>
            )}


            {error && (
                <p className="page-status page-status--error">{error}</p>
            )}

            {!loading && !error && dashboard && (
                <DashboardGrid dashboard={dashboard} />
            )}
        </section>
    );
}
