import { useState } from 'react'
import { userService } from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' })
    const [isSignup, setIsSignup] = useState(false)
    const { login, signup } = useAuth()
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ name: '', password: '', email: '' })
        setIsSignup(false)
    }


    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.email || !credentials.password) return
        try {
            const user = await login(credentials)
            navigate(user.onboardingCompleted ? '/' : '/onboarding')
        } catch (err) {
            console.log('Failed to login', err)
            throw err
        }
        finally {
            clearState()
        }
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.name || !credentials.password || !credentials.email) return
        try {
            const user = await signup(credentials)
            navigate(user.onboardingCompleted ? '/' : '/onboarding')
        } catch (err) {
            console.log('Cannot signup', err)
            throw err
        }
        finally {
            clearState()
        }
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    // async function loginGuest(ev) {
    //     try {
    //         ev.preventDefault()
    //         const creds = {
    //             username: 'guy_yaakov',
    //             password: 'guy123',
    //             fullname: 'Guy Yaakov'
    //         }
    //         await login(creds)
    //         navigate('/')
    //     } catch (err) {
    //         console.log('Failed to login as guest:', err)
    //         throw err
    //     }
    //     finally {
    //         clearState()
    //     }
    // }


    return (
        <div className="login-page">
            {/* <img className="loginsignup-image" src={loginImg} alt="mockup" /> */}
            {!isSignup && <form className="login-form" onSubmit={onLogin}>
                {/* <div className="pasta-logo">
                    <img src={logoImg} alt="" />
                </div> */}
                <input
                    type="mail"
                    name="email"
                    value={credentials.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    autoFocus
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button className='login-submit-btn'>Login!</button>
                <p>Don't have an account? <span className='login-signup-btn' onClick={toggleSignup}>Sign up</span></p>
                {/* <p>or</p>
                <button className="login-demo-btn fw600" onClick={loginGuest}> Continue as guest</button> */}

            </form>}
            <div className="signup-section">
                {isSignup && <form className="signup-form" onSubmit={onSignup}>
                    {/* <div className="pasta-logo">
                        <img src={logoImg} alt="" />
                    </div> */}
                    <input
                        type="text"
                        name="name"
                        value={credentials.name}
                        placeholder="Full name"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="mail"
                        name="email"
                        value={credentials.email}
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button className='signup-submit-btn'>Signup!</button>
                    <p>Have an account? <span className='login-signup-btn' onClick={toggleSignup}>Log in</span></p>
                    {/* <button className="login-demo-btn fw600" onClick={loginGuest}> Continue as guest</button> */}
                </form>}
            </div>
        </div>
    )
}
