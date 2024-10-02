import { useState } from 'react'
import { IGame } from '../types'

export function GameItem({ game }: { game: IGame }) {
	const [isLoading, setIsLoading] = useState(false)

	const handleBuyClick = () => {
		setIsLoading(true)

		const userInput = prompt('Enter your email:')
		if (userInput) {
			const email = userInput

			fetch('http://localhost:4200/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, items: [game.name], total: game.price }),
			})
				.then(response => response.json())
				.then(data => {
					const paymentUrl = data.confirmation.confirmation_url as string
					if (paymentUrl) window.location.replace(paymentUrl)
				})
				.catch(error => {
					console.error('Error:', error)
				})
				.finally(() => {
					setIsLoading(false)
				})
		}
	}

	return (
		<div>
			<img
				src={game.image}
				alt={game.name}
				className='w-full h-64 object-cover rounded shadow-xl'
			/>
			<div className='my-4'>
				<h2 className='text-xl font-bold'>{game.name}</h2>
				<p className='text-gray-500'>{game.price} ₽</p>
			</div>
			<button onClick={handleBuyClick} disabled={isLoading}>
				{isLoading ? 'Loading...' : 'Buy'}
			</button>
		</div>
	)
}
