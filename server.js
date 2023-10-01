import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { logger } from './services/logger.service.js'
logger.info('server.js loaded...')

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()


app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

// App Configuration
if (process.env.NODE_ENV === 'production') {

	app.use(express.static(path.resolve(__dirname, 'public')))
	console.log('__dirname: ', __dirname)
} else {
	// Configuring CORS
	const corsOptions = {
	
		origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:5173', 'http://localhost:5173'],
		credentials: true,
	}
	app.use(cors(corsOptions))
}

import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { toyRoutes } from './api/toy/toy.routes.js'

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)

app.get('/**', (req, res) => {
	res.sendFile(path.resolve('public/index.html'))
})

const port = process.env.PORT || 3030

app.listen(port, () => {
    logger.info('Server is running on port: ' + port)
  })