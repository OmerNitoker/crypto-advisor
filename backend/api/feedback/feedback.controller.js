import { feedbackService } from "./feedback.service.js";


export async function addFeedback(req, res) {

    try {
        const { loggedinUser } = req
        if (!loggedinUser) return res.status(401).send({ error: 'Not authenticated' })

        const { section, vote, snapshotId, targetId } = req.body

        const numVote = Number(vote)
        if (vote === 0) {
            console.log('ID:', loggedinUser._id)
            await feedbackService.remove({
                userId: loggedinUser._id,
                section,
                snapshotId,
                targetId,
            })
            return res.status(204).end()
        }

        const savedFeedback = await feedbackService.add({
            userId: loggedinUser._id,
            section,
            vote: numVote,
            snapshotId,
            targetId
        })

        res.status(201).send({ feedback: savedFeedback })

    } catch (err) {
        console.error('Failed to add feedback', err);
        res.status(500).send({ error: 'Failed to add feedback' })
    }


}