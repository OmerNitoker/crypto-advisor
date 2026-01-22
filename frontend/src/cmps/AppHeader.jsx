// src/cmps/layout/AppHeader.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export function AppHeader() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isDashboard = location.pathname === '/';
    const isLogin = location.pathname === '/login';

    async function onLogout() {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    }

    function goHome() {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }

    function goOnboarding() {
        navigate('/onboarding');
    }

    const showActions = user && !isLogin;

    return (
        <header className="app-header">
            <div className="app-header__inner">
                {/* Brand */}
                <button
                    type="button"
                    className="app-header__brand"
                    onClick={goHome}
                >
                    <div className="app-header__logo">
                        {/* אם תרצה לשים לוגו אמיתי: החלף ל <img src="/branding/logo.svg" alt="CryptoKnight logo" /> */}
                        <span className="app-header__logo-initial">CK</span>
                    </div>
                    <div className="app-header__brand-text">
                        <span className="app-header__title">CryptoKnight</span>
                        <span className="app-header__subtitle">
                            Daily AI-powered crypto advisor
                        </span>
                    </div>
                </button>

                {/* Spacer */}
                <div className="app-header__spacer" />

                {/* Actions */}
                {showActions && (
                    <div className="app-header__actions">
                        {isDashboard && (
                            <button
                                type="button"
                                className="btn btn-ghost app-header__btn"
                                onClick={goOnboarding}
                            >
                                Update preferences
                            </button>
                        )}

                        <button
                            type="button"
                            className="btn btn-ghost app-header__btn app-header__btn--logout"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
