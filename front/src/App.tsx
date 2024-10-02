import { GameItem } from './games/GameItem'
import { GAMES } from './games/games.data'

function App() {
	return (
		<section>
			<h1 className='text-5xl font-bold text-center mb-10'>Bench Store</h1>
			<div className='grid grid-cols-2 gap-5'>
				{GAMES.map(game => (
					<GameItem key={game.name} game={game} />
				))}
			</div>
		</section>
	)
}

export default App
