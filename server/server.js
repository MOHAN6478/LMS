import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'

// Initialize Express
const app = express()
const port = process.env.PORT || 5000

// Connect to database
await connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req,res) => res.send('API working'))
app.post('/clerk', clerkWebhooks)


app.listen(port, () => console.log(`Sever is running http://localhost:${port}`))

