import { feedbackService } from "./feedback.service.js";


export async function addFeedback(req, res) {

    try {
        const { loggedinUser } = req
        if (!loggedinUser) return res.status(401).send({ error: 'Not authenticated' })

        const { section, vote, snapshotId, targetId } = req.body

        const numVote = Number(vote)

        if (numVote !== 1 && numVote !== -1) {
            return res.status(400).send({ error: 'Vote must be 1 or -1' })
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