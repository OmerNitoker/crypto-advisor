import { useState } from 'react';
import { userService } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function LoginSignup() {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isSignup, setIsSignup] = useState(false);
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    function clearState() {
        setCredentials({ name: '', password: '', email: '' });
        setIsSignup(false);
    }

    function handleChange({ target }) {
        const field = target.name;
        const value = target.value;
        setCredentials({ ...credentials, [field]: value });
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault();
        if (!credentials.email || !credentials.password) return;
        try {
            const user = await login(credentials);
            navigate(user.onboardingCompleted ? '/' : '/onboarding');
        } catch (err) {
            console.log('Failed to login', err);
            throw err;
        } finally {
            clearState();
        }
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault();
        if (!credentials.name || !credentials.password || !credentials.email) return;
        try {
            const user = await signup(credentials);
            navigate(user.onboardingCompleted ? '/' : '/onboarding');
        } catch (err) {
            console.log('Cannot signup', err);
            throw err;
        } finally {
            clearState();
            
        }
    }

    function toggleSignup() {
        setIsSignup(!isSignup);
    }

    const title = isSignup ? 'Create your account' : 'Welcome back';
    const subtitle = isSignup
        ? 'Sign up to get your personalized crypto dashboard.'
        : 'Log in to see your daily AI-powered crypto snapshot.';

    return (
        <section className="login-page">
            <div className="login-page-hero">
                <img src="/imgs/logo.png" />
            </div>
            <div className="login-page-panel">
                <div className="auth-card">
                    <h2 className="auth-title">{title}</h2>
                    <p className="auth-subtitle">{subtitle}</p>

                    <div className="auth-toggle">
                        {isSignup ? (
                            <>
                                <span>Already have an account?</span>
                                <button
                                    type="button"
                                    onClick={toggleSignup}
                                >
                                    Log in
                                </button>
                            </>
                        ) : (
                            <>
                                <span>Don&apos;t have an account?</span>
                                <button
                                    type="button"
                                    onClick={toggleSignup}
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </div>

                    {!isSignup && (
                        <form className="login-form" onSubmit={onLogin} noValidate>
                            <div className="form-row">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={credentials.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                    autoFocus
                                />
                            </div>

                            <div className="form-row">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    value={credentials.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button className="login-submit-btn" type="submit">
                                Login
                            </button>
                        </form>
                    )}

                    {isSignup && (
                        <form className="signup-form" onSubmit={onSignup} noValidate>
                            <div className="form-row">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={credentials.name}
                                    placeholder="Full name"
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="form-row">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={credentials.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                />
                            </div>

                            <div className="form-row">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    value={credentials.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button className="signup-submit-btn" type="submit">
                                Sign up
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section >
    );
}
