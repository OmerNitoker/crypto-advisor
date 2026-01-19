import Cryptr from "cryptr"
import bcrypt from 'bcrypt'
import { userService } from "../user/user.service.js"

export const authService = {
    login,
    signup,
    getLoginToken,
    validateToken
}

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-1234')

async function login(email, password) {
    const user = await userService.getByEmail(email)
    if (!user) throw new Error('Invalid email or password')
    const match = await bcrypt.compare(password, user.hashPassword)
    if (!match) throw new Error('Invalid email or password')

    delete user.password
    return user
}

async function signup(name, email, password ) {
    const saltRounds = 10

    if (!name || !password || !email) throw new Error('Missing details')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ name, password: hash, email })
}

function getLoginToken(user) {
    const userInfo = { _id: user._id, name: user.name }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}