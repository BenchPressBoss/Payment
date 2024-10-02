import type { Request, Response } from 'express'
import { CurrencyEnum } from 'yookassa-ts/lib/types/Common'
import { PaymentMethodsEnum } from 'yookassa-ts/lib/types/PaymentMethod'
import YooKassa from 'yookassa-ts/lib/yookassa'
import { prisma } from '../main'

export const yooKassa = new YooKassa({
	shopId: process.env['SHOP_ID'],
	secretKey: process.env['SECRET_KEY']
})

export const checkout = async (req: Request, res: Response): Promise<void> => {
	if (!req.body) {
		res.status(400).json({ error: 'No body' })
		return
	}

	try {
		const order = await prisma.order.create({
			data: req.body
		})

		const payment = await yooKassa.createPayment({
			amount: {
				value: req.body.total.toFixed(2),
				currency: CurrencyEnum.RUB
			},
			payment_method_data: {
				type: PaymentMethodsEnum.bank_card
			},
			capture: true,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			confirmation: {
				type: 'redirect',
				return_url: 'http://localhost:5173/thanks'
			},
			description: `Order #${order.id}`
		})

		res.json(payment)
	} catch (error) {
		console.error('Error during order creation:', error)
		res.status(500).json({ error: 'Internal server error' })
		return
	}
}
