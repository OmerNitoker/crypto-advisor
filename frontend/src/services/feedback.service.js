import { httpService } from "./http.service"

const BASE_URL = 'feedback/'

export const feedbackService = {
    addFeedback
}

async function addFeedback(feedback) {
    //feedback supposed to be {sec tion, vote, snapshotId, targetId }
    return httpService.post(BASE_URL, feedback)
}