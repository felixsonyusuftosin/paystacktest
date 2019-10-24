import { Observable } from 'rxjs'
import { apiError } from '@api/error'
import { logger } from '@utils'

export const fetchOptions = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	},
	body: {}
}

export const getActorsAsObservable = (
	filmInstance,
	modifiedFetchOptions = {}
) => {
	try {
		return new Observable(subscriber => {
			const {
				title,
				episode_id,
				opening_crawl,
				director,
				producer,
				release_date
			} = filmInstance
			let proxyFilmInstance = {
				title,
				episode_id,
				opening_crawl,
				director,
				producer,
				release_date,
				characters: []
			}

			const mergedFetchOptions = { ...fetchOptions, ...modifiedFetchOptions }

			const { headers } = mergedFetchOptions
			const { characters } = filmInstance

			characters.map(async url => {
				const charactersAsJson = await fetch(url, headers)

				if (!charactersAsJson) {
					subscriber.error(apiError({ status: 500, url }))
					return
				}
				const { status, ok } = charactersAsJson

				if (status == 404) {
					subscriber.next(proxyFilmInstance)
					return
				}
				if (!ok) {
					subscriber.error(apiError(status, url))
					return
				}
				const character = await charactersAsJson.json()

				if (!character) {
					subscriber.error(apiError({ status: 500, url }))
				}
				const newlyResolvedCharacters = [
					...proxyFilmInstance.characters,
					character
				]

				proxyFilmInstance = {
					...proxyFilmInstance,
					characters: newlyResolvedCharacters
				}
				subscriber.next(proxyFilmInstance)
			})
		})
	} catch (err) {
		logger.error(err)
		throw new Error(apiError({ status: 500, url }))
	}
}

export const getFilmsAsync = async url => {
	try {
		const { headers } = fetchOptions
		const filmsAsJson = await fetch(url, headers)

		if (!filmsAsJson) {
			subscriber.error(apiError({ status: 500, url }))
		}
		const { status, ok } = filmsAsJson
		if (status == 404) {
			return []
		}
		if (!ok) {
			throw new Error(apiError({ status, url }))
		}

		const films = await filmsAsJson.json()

		return films.results
	} catch (err) {
		logger.error(err)
		throw new Error(apiError({ status: 500, url }))
	}
}
