import { dbService } from "../../services/db.service.js";
import { ObjectId } from "mongodb"
import { dashboardService } from "../dashboard/dashboard.service.js";

export const userService = {
    // query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

// async function query(filterBy = {}) {
//     const criteria = _buildCriteria(filterBy)
//     try {
//         const collection = await dbService.getCollection('user')
//         var users = await collection.find(criteria).toArray()
//         users = users.map(user => {
//             delete user.password
//             return user
//         })
//         return users
//     } catch (err) {
//         console.log('ERROR: Failed to get users')
//         throw err
//     }
// }

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: new ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        console.log('ERROR: Failed to get User')
        throw err
    }
}

async function getByEmail(email) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        console.log('ERROR: Failed to find user')
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: new ObjectId(userId) })
    } catch (err) {
        console.log('Failed to delete user')
        throw err
    }
}

async function update(updates) {
    try {
        const changesToSave = {
            onboardingCompleted: updates.onboardingCompleted,
            preferences: updates.preferences,
            updatedAt: new Date()
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: new ObjectId(updates._id) }, { $set: changesToSave })
        const updatedUser = collection.findOne({ _id: new ObjectId(updates._id) })
         await dashboardService.clearSnapshot(updates._id);
        return updatedUser
    } catch (err) {
        console.log('Cannot update user')
        throw err
    }
}

async function add(user) {
    try {
        const existUser = await getByEmail(user.email)
        if (existUser) throw new Error('email already exist')

        const userToAdd = {
            name: user.name,
            email: user.email,
            hashPassword: user.password,
            onboardingCompleted: false,
            preferences: {
                assets: [],
                investorType: "",
                contentTypes: []
            },
            createdAt: new Date(),
            updatedAt: ""
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        console.log('Cannot add user')
        throw err
    }
}



// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.txt) {
//         const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
//         criteria.$or = [
//             {
//                 username: txtCriteria
//             },
//             {
//                 fullname: txtCriteria
//             }
//         ]
//     }
//     return criteria
// }