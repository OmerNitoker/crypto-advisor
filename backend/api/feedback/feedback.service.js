import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'



export const feedbackService = {
    add
}

async function add({ userId, section, vote, snapshotId, targetId }) {

    if (!userId) throw new Error('Missing userId');
    if (!section) throw new Error('Missing section');
    if (vote !== 1 && vote !== -1) throw new Error('Invalid vote');
    if (!snapshotId) throw new Error('Missing snapshotId');
    if (!targetId) throw new Error('Missing targetId')

    const feedbackToSave = {
        userId: new ObjectId(userId),
        section,
        vote,
        snapshotId: new ObjectId(snapshotId),
        targetId,
        createdAt: new Date()
    }

    try {
        const collection = await dbService.getCollection('feedback')
        const { insertedId } = await collection.insertOne(feedbackToSave)
        return { ...feedbackToSave, _id: insertedId }
    } catch (err) {
        console.error('Failed to add feedback', err)
        throw err
    }
}