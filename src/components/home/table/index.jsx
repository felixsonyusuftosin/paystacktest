import React, { useState } from 'react'

import { Loader, SelectWidget } from '@widgets'
import {
	filterByGender,
	sortActorsByName,
	sortActorsByHeight,
	sortActorsByGender,
	getDistinctByGender
} from '@utils'
import '@home/table/styles/table.scss'

const genderIcon = {
	male: 'male',
	female: 'female',
	hermaphrodite: 'meh-o',
	'n/a': 'question',
	none: 'question-circle'
}

const CMToInchesRatio = 25.4
const CMToFeetRatio = 30.4

export const Table = ({
	selectedMovie,
	characterList,
	setCharacterList,
	fullCharacterList
}) => {
	const actorsPending = characterList.pending
	const actorsError = characterList.error
	const actors = characterList.payload ? characterList.payload.characters : null
	const movie = selectedMovie || {}
	const fullActorsList = fullCharacterList ? fullCharacterList : null

	const genderOptions = () => {
		if (fullActorsList) {
			const { characters } = fullActorsList

			if (characters && characters.length) {
				return getDistinctByGender(characters, 'gender')
			}
			return []
		}
		return []
	}

	const computedHeight = () => {
		if (actors && actors.length) {
			return actors.reduce((total, currentValue) => {
				const height = isNaN(+currentValue.height) ? 0 : +currentValue.height
				return total + height
			}, 0)
		}
		return 0
	}

	const totalHeightCm = computedHeight()
	const totalHeightIn = parseInt(computedHeight() / CMToInchesRatio)
	const totalHeightFt = parseInt(computedHeight() / CMToFeetRatio)

	const formatComputedHeight = `${totalHeightCm}cm (${totalHeightFt}ft/${totalHeightIn}in)`
	const [sortParameter, setSorting] = useState({
		name: {
			order: 'descending'
		},
		height: {
			order: 'descending'
		},
		gender: {
			order: 'descending'
		},
		activeSort: ''
	})

	const sortTableByName = () => {
		if (actors) {
			const order =
				sortParameter.name.order === 'ascending' ? 'descending' : 'ascending'
			const sortedActors = sortActorsByName([...actors], order === 'ascending')
			const sortedActorsFilm = { ...movie, characters: sortedActors }

			setCharacterList({ ...characterList, payload: sortedActorsFilm })
			setSorting({
				...sortParameter,
				name: { order },
				activeSort: 'name'
			})
		}
	}

	const sortTableByGender = () => {
		if (actors) {
			const order =
				sortParameter.gender.order === 'ascending' ? 'descending' : 'ascending'
			const sortedActors = sortActorsByGender(
				[...actors],
				order === 'ascending'
			)
			const sortedActorsFilm = { ...movie, characters: sortedActors }

			setCharacterList({ ...characterList, payload: sortedActorsFilm })
			setSorting({
				...sortParameter,
				gender: { order },
				activeSort: 'gender'
			})
		}
	}

	const sortTableByHeight = () => {
		if (actors) {
			const order =
				sortParameter.height.order === 'ascending' ? 'descending' : 'ascending'
			const sortedActors = sortActorsByHeight(
				[...actors],
				order === 'ascending'
			)
			const sortedActorsFilm = { ...movie, characters: sortedActors }

			setCharacterList({ ...characterList, payload: sortedActorsFilm })
			setSorting({
				...sortParameter,
				height: { order },
				activeSort: 'height'
			})
		}
	}

	const onFilterByGender = $event => {
		const { target } = $event
		const { value } = target
		const filteredActors = filterByGender(value, fullActorsList.characters)
		const filteredActorsFilm = { ...movie, characters: filteredActors }

		setCharacterList({ ...characterList, payload: filteredActorsFilm })
	}

	const clearGenderFilter = () => {
		setCharacterList({ ...characterList, payload: fullActorsList })
	}

	const componentUiState = {
		isAscendingSortByGender:
			sortParameter.activeSort === 'gender' &&
			sortParameter.gender.order === 'ascending',
		isDescendingSortByGender:
			sortParameter.activeSort === 'gender' &&
			sortParameter.gender.order === 'descending',
		isAscendingSortByName:
			sortParameter.activeSort === 'name' &&
			sortParameter.name.order === 'ascending',
		isDescendingSortByName:
			sortParameter.activeSort === 'name' &&
			sortParameter.name.order === 'descending',
		isAscendingSortByHeight:
			sortParameter.activeSort === 'height' &&
			sortParameter.height.order === 'ascending',
		isDescendingSortByHeight:
			sortParameter.activeSort === 'height' &&
			sortParameter.height.order === 'descending',
		actorsListIsReady: actors && !actorsPending && !actorsError,
		noMovieSelected: !actors && !actorsPending && !actorsError,
		actorsListIsLoading: !actors && !actorsError && actorsPending,
		actorsListErroredWhileFetching: !actors && !actorsPending && actorsError
	}

	const {
		isAscendingSortByGender,
		isDescendingSortByGender,
		isAscendingSortByHeight,
		isAscendingSortByName,
		isDescendingSortByHeight,
		isDescendingSortByName,
		actorsListIsReady,
		noMovieSelected,
		actorsListIsLoading,
		actorsListErroredWhileFetching
	} = componentUiState

	return (
		<React.Fragment>
			{actorsListIsReady && (
				<React.Fragment>
					<p className="actor-header">
						<strong>{`${movie.title}`}</strong>
					</p>
					<div className="gender-bar-holder">
						<div className="select-bar  gender-bar ">
							<SelectWidget
								style={{
									borderColor: '#666',
									boxSizing: 'border-box',
									padding: '0px 10px',
									color: '#666',
									fontSize: '0.9rem',
									height: '35px'
								}}
								onChange={onFilterByGender}
								onCancel={clearGenderFilter}
								options={genderOptions()}
							/>
						</div>
					</div>
				</React.Fragment>
			)}

			<section className="table">
				{actorsListIsReady && (
					<div className="row table-header">
						<div className="column" onClick={sortTableByGender}>
							<span>
								Gender
								{isAscendingSortByGender && <i className="fa fa-arrow-up" />}
								{isDescendingSortByGender && <i className="fa fa-arrow-down" />}
							</span>
						</div>
						<div className="column" onClick={sortTableByName}>
							<span>
								Name {isAscendingSortByName && <i className="fa fa-arrow-up" />}
								{isDescendingSortByName && <i className="fa fa-arrow-down" />}
							</span>
						</div>
						<div className="column" onClick={sortTableByHeight}>
							<span>
								Height{' '}
								{isAscendingSortByHeight && <i className="fa fa-arrow-up" />}
								{isDescendingSortByHeight && <i className="fa fa-arrow-down" />}
							</span>
						</div>
					</div>
				)}

				{actorsListIsReady
					? actors.map((actor, index) => (
							<div className="row" key={index}>
								<div className="column">
									<i
										title={actor.gender}
										className={`fa fa-${genderIcon[actor.gender]}`}></i>{' '}
								</div>
								<div title={actor.name} className="column">
									{' '}
									{actor.name}
								</div>
								<div title={actor.height} className="column">
									{' '}
									{actor.height}{' '}
								</div>
							</div>
					  ))
					: null}

				{actorsListIsReady && (
					<div className="row footer">
						<div className="column"></div>
						<div className="column"> {actors.length} &nbsp; Actors </div>
						<div className="column">{formatComputedHeight}</div>
					</div>
				)}

				{noMovieSelected ? (
					<h3 className="no-data">
						Please select a movie to see the list of actors
					</h3>
				) : null}

				{actorsListIsLoading && (
					<div className="loader">
						<Loader />
					</div>
				)}

				{actorsListErroredWhileFetching && (
					<h3 className="no-data">{actorsError}</h3>
				)}
			</section>
		</React.Fragment>
	)
}
