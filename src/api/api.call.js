import { Observable } from 'rxjs'
import { apiError } from '@api/error'
import { logger } from '@utils'
import { getCachedApiRequests, setCachedApiRequests } from '@api'

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
			const interceptCachedRequest = getCachedApiRequests(
				`${filmInstance.title}${filmInstance.episode_id.toString()}`
			)

			if (interceptCachedRequest) {
				subscriber.next(interceptCachedRequest)
				return
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
					setCachedApiRequests(
						`${filmInstance.title}${filmInstance.episode_id.toString()}`,
						proxyFilmInstance
					)

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
				setCachedApiRequests(
					`${filmInstance.title}${filmInstance.episode_id.toString()}`,
					proxyFilmInstance
				)
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
		const interceptCachedRequest = getCachedApiRequests(url)

		if (interceptCachedRequest) {
			return interceptCachedRequest
		}
		const filmsAsJson = await fetch(url, headers)

		if (!filmsAsJson) {
			subscriber.error(apiError({ status: 500, url }))
		}
		const { status, ok } = filmsAsJson
		if (status == 404) {
			setCachedApiRequests(url, {})
			return {}
		}
		if (!ok) {
			throw new Error(apiError({ status, url }))
		}

		const films = await filmsAsJson.json()

		setCachedApiRequests(url, films.results)
		return films.results
	} catch (err) {
		logger.error(err)
		throw new Error(apiError({ status: 500, url }))
	}
}
