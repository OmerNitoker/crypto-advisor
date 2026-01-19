import { userService } from "./user.service.js";

// export async function getUsers(req, res) {
//     try {
//         const filterBy = {
//             txt: req.query?.txt || ''
//         }
//         const users = await userService.query(filterBy)
//         res.send(users)
//     } catch (err) {
//         console.log('Failed to get users')
//         res.status(500).send({err: 'Failed to get users'})
//     }
// }

export async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.userId)
        res.send(user)
    } catch (err) {
        console.log('Failed to get user')
        res.status(500).send({err: 'Failed to get user'})
    }
}

export async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        console.log('Failed to update user', err)
        res.status(500).send({err: 'Failed to update user'})       
    }
}