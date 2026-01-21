import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cookieParser())
app.use(express.json())
// app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
    console.log('__dirname: ', __dirname)
} else {
    const corOptions = {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173','http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corOptions))
}

import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { dashboardRoutes } from './api/dashboard/dashboard.routes.js'
import { feedbackRoutes } from './api/feedback/feedback.routes.js'

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/feedback', feedbackRoutes)

// app.get('/**', (req,res) => {
//     res.sendFile(path.resolve('public/index.html'))
// })

app.get('/', (req, res) => {
    res.send('<h1>CRYPTO ADVISOR</h1>')
})

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log('Server is running on port: ', port)
})