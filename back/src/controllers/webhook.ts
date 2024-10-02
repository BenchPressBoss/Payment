import { EnumOrderStatus } from '@prisma/client'
import type { Request, Response } from 'express'
import { prisma } from '../main'

export const webhook = async (
	req: Request,
	res: Response
): Promise<Response<any, Record<string, any>>> => {
	if (req.body.event === 'payment.succeeded') {
		const orderId = Number(req.body.object.description.split('#')[1])

		await prisma.order.update({
			where: {
				id: orderId
			},
			data: {
				status: EnumOrderStatus.PAYED
			}
		})

		return res.status(200).json({ success: true })
	}

	return res.status(200).json({ success: true })
}
