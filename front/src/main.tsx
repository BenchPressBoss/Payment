import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/thanks' element={<div>Thanks! 🎉</div>} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
