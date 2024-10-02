import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { indexRouter } from './routes'

import dotenv from 'dotenv'

dotenv.config()

export const prisma = new PrismaClient()

async function main() {
	const app = express()

	app.use(cors())
	app.use(express.json())

	app.use('/', indexRouter)

	const PORT = Number(process.env.PORT) || 4200

	app.listen(PORT, () => console.log(`🚀 Server ready at ${PORT}`))
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
