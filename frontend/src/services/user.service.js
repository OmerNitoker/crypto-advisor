import { httpService } from "./http.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL_AUTH = 'auth/'
const BASE_URL_USER = 'user/'

export const userService = {
    getLoggedinUser,
    loginUser,
    signupUser,
    updateUser,
    setLoggedinUser,
    logoutUser,
    getDefaultPrefs
}

async function loginUser({ email, password }) {
    const loggedInUser = getLoggedinUser()
    if (loggedInUser) {
        throw new Error('User already logged in')
    }
    try {
        const user = await httpService.post(BASE_URL_AUTH + 'login', { email, password })
        if (user) return setLoggedinUser(user)
    } catch (err) {
        console.log('Unable to login', err)
        throw err
    }
}

async function signupUser(credentials) {
    const newUser = await httpService.post(BASE_URL_AUTH + 'signup', credentials)


    if (newUser) {
        return setLoggedinUser(newUser)
    } else {
        throw new Error('Signup failed');
    }
}

async function updateUser(userUpdates) {
    const updatedUser = await httpService.put(BASE_URL_USER + userUpdates._id, userUpdates)
    setLoggedinUser(updatedUser)
    return updatedUser;
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function logoutUser() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getDefaultPrefs() {
    return {
        assets: [],
        investorType: "",
        contentTypes: []
    }
}