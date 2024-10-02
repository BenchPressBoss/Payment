import { Router } from 'express'
import { checkout } from '../controllers'
import { webhook } from '../controllers/webhook'

export const indexRouter = Router()

indexRouter.post('/checkout', checkout)
indexRouter.post('/webhook', webhook)
