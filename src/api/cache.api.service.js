import { logger } from '@utils'

export const getCachedApiRequests = key => {
	try {
		const existingCache = sessionStorage.getItem(key)
		if (!existingCache) {
			return false
		}
		return JSON.parse(existingCache)
	} catch (err) {
		logger.error(`Could not cache requests from ${key} - ${err}`)
	}
}

export const setCachedApiRequests = (key, data) => {
	try {
		const isCacheExistiing = sessionStorage.getItem(key)

		if (isCacheExistiing) {
			sessionStorage.removeItem(key)
		}
		return sessionStorage.setItem(key, JSON.stringify(data))
	} catch (err) {
		logger.error(`Could not get cached requests from ${key} - ${err}`)
		return false
	}
}
