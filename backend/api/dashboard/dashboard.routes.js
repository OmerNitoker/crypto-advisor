import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { getDashboard } from './dashboard.controller.js'

export const dashboardRoutes = express.Router()

dashboardRoutes.get('/', requireAuth, getDashboard)
