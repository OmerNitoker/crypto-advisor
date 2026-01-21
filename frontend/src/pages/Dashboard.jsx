
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import { dashboardService } from "../services/dashboard.service"
import { DashboardGrid } from '../cmps/DashboardGrid'


export function Dashboard() {

    const { user } = useAuth()
    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let isCancelled = false;

        async function loadData() {
            setLoading(true);
            setError('');
            try {
                const data = await dashboardService.getDashboard()
                if (!isCancelled) setDashboard(data)
            } catch (err) {
                if (!isCancelled) setError(err.message || 'Failed to load dashboard')
            } finally {
                if (!isCancelled) setLoading(false)
            }
        }

        loadData();

        return () => {
            isCancelled = true;
        }
    }, [])

    if(!user) return(<div>loading...</div>)


    return (
        <section style={{ maxWidth: 1100, margin: '1.5rem auto', padding: '0 1rem' }}>
            <header style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ marginBottom: '0.25rem' }}>
                    Hi {user.name || 'friend'} 👋
                </h1>
                <p style={{ margin: 0 }}>
                    Here&apos;s your personalized crypto dashboard for today.
                </p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', opacity: 0.8 }}>
                    Dashboard updates automatically every day at 09:00.
                </p>

                <div style={{ marginTop: '0.75rem' }}>
                    <button
                        type="button"
                        onClick={() => (window.location.href = '/onboarding')}
                        style={{ marginRight: '0.5rem' }}
                    >
                        Update preferences
                    </button>
                </div>
            </header>

            {loading && <p>Loading your dashboard...</p>}
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && dashboard && (
                <DashboardGrid dashboard={dashboard} />
            )}
        </section>
    )
}