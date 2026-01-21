import express from 'express'
import { addFeedback } from './feedback.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

export const feedbackRoutes = express.Router()

feedbackRoutes.post('/', requireAuth, addFeedback)
