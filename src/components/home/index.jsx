import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { Select } from '@home/select'
import { Left } from '@home/left'
import { Mid } from '@home/mid'
import { Footer } from '@home/footer'
import { dispatchActionsAsync } from '@store'
import { getFilmsAsync } from '@api'

export const Home = () => {
	const [selectedTheme, selectTheme] = useState('dark-theme')
	const films = useSelector(state => state.fetchFilms.payload)
	const pending = useSelector(state => state.fetchFilms.pending, shallowEqual)
	const error = useSelector(state => state.fetchFilms.error, shallowEqual)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!films && !error && !pending) {
			dispatch(
				dispatchActionsAsync('FETCH_FILMS', getFilmsAsync, [
					'https://swapi.co/api/films'
				])
			)
		}
	})

	return (
		<div className={selectedTheme}>
			<div className="container ">
				<Left />
				<section className="main">
					<Select
						films={films}
						pending={pending}
						selectedTheme={selectedTheme}
						selectTheme={selectTheme}
						error={error}
					/>
					<Mid />
				</section>
			</div>
			<Footer />
		</div>
	)
}