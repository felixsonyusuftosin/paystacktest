/**
 * @file Mid component
 */

import React from 'react'
import Animate from 'animate.css-react'
import 'animate.css/animate.css'

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
				<Animate
					enter="fadeInDown"
					leave="fadeOutUp"
					appear="fadeInDown"
					animate={true}>
					<section className="statement-section">
						<p className="word style" id="sentence">
							{openingCrawl}
						</p>
					</section>
				</Animate>
			)}
			{!actors && <img src={Icon} alt="Star wars" />}
			<section className="actor-list">
				<Table {...props} />
			</section>
		</div>
	)
}
