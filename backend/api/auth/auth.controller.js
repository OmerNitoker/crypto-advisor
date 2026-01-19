import { authService } from "./auth.service.js";

export async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        console.log('Failed to login')
        res.status(500).send({ err: 'Failed to login' })
    }
}

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body

        const account = await authService.signup(name, email, password )
        const user = await authService.login(email, password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        console.log('Failed to signup')
        res.status(500).send({ err: 'Failed to signup' })
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        console.log('Failed to logout')
        res.status(500).send({err: 'Failed to logout'})
    }
}