/**
 * @file Mid component
 */

import React from 'react'
import { useSelector } from 'react-redux'
import Animate from 'animate.css-react'
import 'animate.css/animate.css'

import { Table } from '@home/table'
import '@home/mid/styles/mid.scss'
import Icon from './starwars.png'

export const Mid = () => {
	const word = useSelector(state =>
		state.selectedMovie.payload
			? state.selectedMovie.payload.opening_crawl
			: ' '
	)

	const actors = useSelector(
		state => state.actorsList.payload && state.actorsList.payload.characters
	)

	return (
		<div className="mid">
			{actors && actors.length && (
				<Animate
					enter="fadeInDown"
					leave="fadeOutUp"
					appear="fadeInDown"
					change="fadeInDown"
					animate={true}
					component="p">
					<section className="statement-section">
						<p className="word style" id="sentence">
							{word}
						</p>
					</section>
				</Animate>
			)}
			{!actors && <img src={Icon} alt="Star wars" />}
			<section className="actor-list">
				<Table />
			</section>
		</div>
	)
}
