/**
 * @file Mid component
 */

import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Table } from '@home/table'
import '@home/mid/styles/mid.scss'
import Icon from './starwars.png'

let interval
export const Mid = () => {
	const word = useSelector(state =>
		state.selectedMovie.payload
			? state.selectedMovie.payload.opening_crawl
			: ' '
	)

	const actors = useSelector(
		state => state.actorsList.payload && state.actorsList.payload.characters
	)

	if (interval) {
		clearInterval(interval)
	}

	const splitWords = word.split('')

	let sentence = ''
	const animateCallback = useCallback(ref => {
		if (!ref) {
			return
		}
		interval = setInterval(() => {
			if (splitWords.length) {
				const el = splitWords.shift()
				sentence += el
				ref.innerText = sentence
			} else {
				document.getElementById('sentence').classList.add('style')
				clearInterval(interval)
			}
		}, 150)
	})

	return (
		<div className="mid">
			{actors && actors.length && (
				<section className="statement-section">
					<p className="word" ref={animateCallback} id="sentence"></p>
				</section>
			)}
			{!actors && <img src={Icon} alt="Star wars" />}
			<section className="actor-list">
				<Table />
			</section>
		</div>
	)
}
