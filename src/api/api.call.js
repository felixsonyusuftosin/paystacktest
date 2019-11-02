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

export const getAllCharacters = async (
	filmInstance,
	modifiedFetchOptions = {}
) => {
	try {
		// use a meaningfull key to label to session key
		const key = `${filmInstance.title}${filmInstance.episode_id.toString()}`
		let proxyFilmInstance = { ...filmInstance, characters: [] } // create a proxy filminstance to return as resolved list
		const interceptedCachedRequest = getCachedApiRequests(key)

		// intercept reqiest and return the cached response from session storage
		if (interceptedCachedRequest) {
			return interceptedCachedRequest
		}

		const mergedFetchOptions = { ...fetchOptions, ...modifiedFetchOptions }
		const { headers } = mergedFetchOptions
		const { characters } = filmInstance

		const getArrayOfResponseCharacters = async () =>
			characters.map(async url => {
				const character = await fetch(url, headers)
				const { status, ok } = character
				if (status == 404) {
					return {}
				}
				if (!ok) {
					throw new Error(apiError({ status, url: 'Error fetching character' }))
				}
				return character.json()
			})

		const arrayOfResponseCharacters = await getArrayOfResponseCharacters()
		const arrayOfCharacters = await Promise.all(arrayOfResponseCharacters)

		if (!arrayOfCharacters) {
			throw new Error(apiError, { status: 500, url: 'Error reading data ' })
		}

		proxyFilmInstance = {
			...proxyFilmInstance,
			characters: arrayOfCharacters
		}

		setCachedApiRequests(key, proxyFilmInstance)
		return proxyFilmInstance
	} catch (err) {
		logger.error(err)
		throw new Error(apiError({ status: 500, err }))
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
			throw new Error(error(apiError({ status: 500, url })))
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
