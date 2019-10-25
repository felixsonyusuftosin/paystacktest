import React, { useState } from 'react'
import { Select as SelectDropDown } from 'react-dropdown-select'
import { Loader } from '@widgets'
import { useSelector, useDispatch } from 'react-redux'
import { filterByGender, sortActorsByName, sortActorsByHeight } from '@utils'
import { dispatchActionsSync } from '@store'
import '@home/table/styles/table.scss'

const genderIcon = {
	male: 'male',
	female: 'female',
	hermaphrodite: 'meh-o',
	'n/a': 'question',
	none: 'question-circle'
}
const genderOptions = [
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' },
	{ label: 'Hermaphrodite', value: 'hermaphrodite' },
	{ label: 'Not Specified', value: 'n/a' },
	{ label: 'None', value: 'none' }
]

export const Table = () => {
	const dispatch = useDispatch()

	let totalHeightCm = 0
	let totalHeightIn = 0
	let totalHeightft = 0

	const actorsPending = useSelector(state => state.actorsList.pending)
	const actorsError = useSelector(state => state.actorsList.error)
	const actors = useSelector(state =>
		state.actorsList.payload ? state.actorsList.payload.characters : null
	)

	if (actors && actors.length) {
		const reduced = actors.reduce((total, currentValue) => {
			const height = isNaN(+currentValue.height) ? 0 : +currentValue.height

			return total + height
		}, 0)

		totalHeightCm = reduced
		totalHeightIn = parseInt(reduced / 25.4, 10)
		totalHeightft = parseInt(reduced / 30.4, 10)
	}

	const formatComputedHeight = `${totalHeightCm}cm (${totalHeightft}ft/${totalHeightIn}in)`

	const fullActorsList = useSelector(state =>
		state.fullActorsList ? state.fullActorsList.payload : null
	)

	const [sortParameter, setSorting] = useState({
		name: 'name',
		oorder: 'ascending'
	})

	const sortTableByName = () => {
		if (actors) {
			const order =
				sortParameter.order === 'ascending' ? 'descending' : 'ascending'
			const sortedActors = sortActorsByName(
				[...actors.characters],
				order === 'ascending'
			)
			const sortedActorsFilm = { ...actors, characters: sortedActors }

			dispatch(dispatchActionsSync('ACTORS_LIST', sortedActorsFilm))
			setSorting({ name: 'name', order })
		}
	}

	const sortTableByHeight = () => {
		if (actors) {
			const order =
				sortParameter.order === 'ascending' ? 'descending' : 'ascending'
			const sortedActors = sortActorsByHeight(
				[...actors.characters],
				order === 'ascending'
			)
			const sortedActorsFilm = { ...actors, characters: sortedActors }

			dispatch(dispatchActionsSync('ACTORS_LIST', sortedActorsFilm))
			setSorting({ name: 'height', order })
		}
	}

	const onFilterByGender = gender => {
		if (gender.length) {
			const filteredActors = filterByGender(
				gender[0].value,
				fullActorsList.characters
			)
			const filteredActorsFilm = { ...actors, characters: filteredActors }

			dispatch(dispatchActionsSync('ACTORS_LIST', filteredActorsFilm))
		}
	}

	const clearGenderFilter = () => {
		dispatch(dispatchActionsSync('ACTORS_LIST', fullActorsList))
	}

	const componentUiState = {
		actorsNotEmpty: actors && actors.length,
		isAscendingSortByName:
			sortParameter === 'name' && sortParameter.order === 'ascending',
		isDescendingSortByName:
			sortParameter === 'name' && sortParameter.order === 'descending',
		isAscendingSortByHeight:
			sortParameter === 'height' && sortParameter.order === 'ascending',
		isDescendingSortByHeight:
			sortParameter === 'height' && sortParameter.order === 'descending',
		actorsListIsReady: actors && !actorsPending && !actorsError,
		noMovieSelected: !actors && !actorsPending && !actorsError,
		actorsListIsLoading: !actors && !actorsError && actorsPending,
		actorsListErroredWhileFetching: !actors && !actorsPending && actorsError
	}

	const {
		actorsNotEmpty,
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
		<section className="table">
			{actorsNotEmpty && (
				<div className="row table-header">
					<div className="column">
						<span> Gender</span>
						<div className="select-bar">
							<SelectDropDown
								options={genderOptions}
								labelField="label"
								valueField="value"
								onClearAll={clearGenderFilter}
								onChange={onFilterByGender}
								clearable={true}
							/>
						</div>
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
								<i className={`fa fa-${genderIcon[actor.gender]}`}></i>{' '}
							</div>
							<div className="column"> {actor.name}</div>
							<div className="column"> {actor.height} </div>
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
				<div className="row">
					<h3 className="no-data">
						Please select a movie to see the list of actors
					</h3>
				</div>
			) : null}

			{actorsListIsLoading && (
				<div className="row laoder">
					<Loader />
				</div>
			)}

			{actorsListErroredWhileFetching && (
				<div className="row">
					<h3 className="no-data">{actorsError}</h3>
				</div>
			)}
		</section>
	)
}
