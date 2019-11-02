import React, { useState, useEffect } from 'react'
import { Select } from '@home/select'
import { Mid } from '@home/mid'
import { Footer } from '@home/footer'
import { getFilmsAsync } from '@api'
import { sortMoviesByDate } from '@utils'
import { Notification } from '@widgets'

const moviesUrl = 'https://swapi.co/api/films'

export const Home = () => {
	const [selectedTheme, selectTheme] = useState('dark-theme')
	const [message, setMessage] = useState('hah you have encountered an error')
	const [films, setFilms] = useState({
		payload: null,
		pending: false,
		error: false
	})

	const [selectedMovie, setSelectedMovie] = useState(null)
	const [characterList, setCharacterList] = useState({
		payload: null,
		pending: false,
		error: false
	})
	const [fullCharacterList, setFullCharacterList] = useState(null)

	getFilmsAsync(moviesUrl)

	useEffect(() => {
		const fetchFilms = async () => {
			if (!films.payload && !films.error && !films.pending) {
				setFilms({ ...films, pending: true })
				try {
					const films = await getFilmsAsync(moviesUrl)
					setFilms({
						...films,
						pending: false,
						payload: sortMoviesByDate(films)
					})
				} catch (error) {
					setMessage(error)
					setFilms({
						payload: null,
						pending: false,
						error
					})
				}
			}
		}
		fetchFilms()
	})

	return (
		<div className={selectedTheme}>
			<Notification message={message} setMessage={setMessage} />
			<div className="container ">
				<section className="main">
					<Select
						selectedMovie={selectedMovie}
						setErrorMessage={setMessage}
						setSelectedMovie={setSelectedMovie}
						characterList={characterList}
						setCharacterList={setCharacterList}
						fullCharacterList={fullCharacterList}
						setFullCharacterList={setFullCharacterList}
						films={films.payload || []}
						pending={films.pending}
						selectedTheme={selectedTheme}
						selectTheme={selectTheme}
						error={films.error}
					/>
					<Mid
						setErrorMessage={setMessage}
						selectedMovie={selectedMovie}
						characterList={characterList}
						setCharacterList={setCharacterList}
						fullCharacterList={fullCharacterList}
						setFullCharacterList={setFullCharacterList}
					/>
				</section>
			</div>
			<Footer />
		</div>
	)
}
