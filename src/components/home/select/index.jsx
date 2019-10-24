/**
 * @file left component
 */

// third party imports
import React, { useEffect } from 'react'
import { Select as SelectDropDown } from 'react-dropdown-select'
import { useDispatch, useSelector } from 'react-redux'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'

// Local Imports
import '@home/select/styles/select.scss'
import { dispatchActionsSync, dispatchActionsObservable } from '@store'
import { getActorsAsObservable } from '@api'

export const Select = ({
	selectTheme,
	selectedTheme,
	films,
	pending,
	error
}) => {
	const dispatch = useDispatch()
	const selectedMovie = useSelector(state =>
		state.selectedMovie.payload ? state.selectedMovie.payload : null
	)

	const onSelectChange = value => {
		dispatch(dispatchActionsSync('SELECTED_MOVIE', value[0]))
	}

	const onClear = () => {
		dispatch(dispatchActionsSync('SELECTED_MOVIE', null))
		dispatch(dispatchActionsSync('ACTORS_LIST', null))
		dispatch(dispatchActionsSync('FULL_ACTORS_LIST', null))
	}

	useEffect(() => {
		fetchNewActorsList()
	}, [selectedMovie])

	useEffect(() => {
		if (error) {
			NotificationManager.error(error, 'Whoops')
		}
	}, [error])

	const fetchNewActorsList = () => {
		if (selectedMovie) {
			dispatch(
				dispatchActionsObservable('ACTORS_LIST', getActorsAsObservable, [
					selectedMovie
				])
			)
			dispatch(
				dispatchActionsObservable('FULL_ACTORS_LIST', getActorsAsObservable, [
					selectedMovie
				])
			)
		}
	}

	return (
		<div className="top">
			<div className="select-bar">
				<SelectDropDown
					onChange={onSelectChange}
					loading={pending && !error}
					options={films}
					disabled={pending}
					clearable={true}
					sortBy="release_date"
					labelField="title"
					valueField="episode_id"
					onClearAll={onClear}
				/>
			</div>
			<div className="switch-context">
				<span
					className={selectedTheme === 'dark-theme' ? 'span selected' : 'span'}
					onClick={() => selectTheme('dark-theme')}>
					Dark Theme
				</span>
				<span
					className={selectedTheme === 'light-theme' ? 'span selected' : 'span'}
					onClick={() => selectTheme('light-theme')}>
					Light Theme
				</span>
			</div>
			<NotificationContainer />
		</div>
	)
}
