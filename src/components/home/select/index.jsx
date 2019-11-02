/**
 * @file left component
 */

// third party imports
import React, { useEffect } from 'react'

// Local Imports
import '@home/select/styles/select.scss'
import { getAllCharacters } from '@api'
import { SelectWidget } from '@widgets'

export const Select = ({
	films,
	setErrorMessage,
	pending,
	selectedMovie,
	setSelectedMovie,
	characterList,
	setCharacterList,
	setFullCharacterList
}) => {
	const onSelectChange = event => {
		const { target = {} } = event
		const { value } = target

		const movieSelected =
			films.find(film => +film.episode_id === +value) || null
		setSelectedMovie(movieSelected)
	}

	const onSelectCancel = () => {
		setSelectedMovie(null)
		setCharacterList({ pending: false, payload: null, error: false })
		setFullCharacterList(null)
	}

	useEffect(() => {
		fetchNewActorsList()
	}, [selectedMovie])

	const fetchNewActorsList = async () => {
		if (selectedMovie) {
			setCharacterList({
				...characterList,
				pending: true,
				payload: null,
				error: false
			})
			try {
				const characters = await getAllCharacters(selectedMovie)
				setCharacterList({
					...characterList,
					payload: characters,
					pending: false,
					error: false
				})
				setFullCharacterList(characters)
			} catch (err) {
				setErrorMessage(err.message)
				setCharacterList({
					...characterList,
					error: err.message,
					pending: false,
					payload: null
				})
			}
		}
	}

	return (
		<div className="top">
			<div className="select-bar">
				<SelectWidget
					onChange={onSelectChange}
					onCancel={onSelectCancel}
					loading={pending.toString()}
					valuename="episode_id"
					labelname="title"
					placeholder="Select movie ..."
					options={films}
				/>
			</div>
		</div>
	)
}
