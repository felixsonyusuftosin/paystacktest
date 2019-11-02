/**
 * @file Mid component
 */

import React from 'react'

import { Table } from '@home/table'
import '@home/mid/styles/mid.scss'
import Icon from './starwars.png'

export const Mid = props => {
	const { characterList, selectedMovie } = props
	const openingCrawl = selectedMovie ? selectedMovie.opening_crawl : ''
	const actors = characterList.payload ? characterList.payload.characters : null

	return (
		<div className="mid">
			{actors && actors.length && (
				<section className="statement-section  animation-appear">
					<p className="word style" id="sentence">
						{openingCrawl}
					</p>
				</section>
			)}
			{!actors && <img src={Icon} alt="Star wars" />}
			<section className="actor-list">
				<Table {...props} />
			</section>
		</div>
	)
}
