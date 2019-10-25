import React, { useEffect } from 'react'
import { Paginate } from '@utils'
import '@widgets/pagination/pagination.scss'
import { useSelector } from 'react-redux'

export const Pagination = ({ children, pageSize = 10, onActorsLoaded }) => {
	const actors = useSelector(
		state => state.actorsList.payload && state.actorsList.payload.characters
	)

	const paginate = new Paginate(actors, pageSize)
	let {
		pages,
		allPages,
		currentPage,
		pageItems,
		computePages,
		goToNextPage,
		goToPreviousPage,
		goToPage,
		goToLastPage,
		goToFirstPage,
		_nextable,
		_prevable
	} = paginate

	const runPaginationUpdate = (actorsList = actors) => {
		if (actorsList && actorsList.length) {
			onActorsLoaded(paginate.computePages())
			currentPage = paginate.currentPage
			_nextable = paginate._nextable
			_prevable = paginate._prevable
			pages = paginate.pages
			pageItems = paginate.pageItems
			allPages = paginate.allPages
		}
	}

	useEffect(() => {
		runPaginationUpdate()
	}, [actors])

	const eventActorsLoaded = newActorsList => {
		onActorsLoaded(newActorsList)
	}
	return (
		<React.Fragment>
			{children}
			{actors && actors.length && (
				<div className="pagination">
					<button onClick={() => eventActorsLoaded(goToFirstPage())}>
						First
					</button>
					<button
						className={!_prevable ? 'disabled' : ''}
						onClick={() => eventActorsLoaded(goToPreviousPage())}>
						<i className="fa fa-angle-left"></i>
					</button>
					{pages.map((page, index) => (
						<button
							className={currentPage === page ? 'highlight' : ''}
							key={index}
							onClick={() => eventActorsLoaded(goToPage(page))}>
							{page}
						</button>
					))}
					<button
						className={!_nextable ? 'disabled' : ''}
						onClick={() => eventActorsLoaded(goToNextPage())}>
						<i className="fa fa-angle-right"></i>
					</button>
					<button onClick={() => eventActorsLoaded(goToLastPage())}>
						Last
					</button>
				</div>
			)}
		</React.Fragment>
	)
}
