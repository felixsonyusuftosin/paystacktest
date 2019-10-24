/**
 * @file define error class for api responses
 */
import { logger } from '@utils'

const E3XX = status => status > 299 && status < 400
const E4XX = status => status > 399 && status < 500

export const apiError = ({ status, url }) => {
	switch (status) {
		case 301:
			logger.warn(`${url} returned 301 on ${new Date().toLocaleTimeString()}`)
			return 'The requested resource have moved permanently'
		case 400:
			logger.warn(`${url} returned 400 on ${new Date().toLocaleTimeString()}`)
			return 'Please perform that action by filling all parameters again'
		case 401:
			logger.warn(`${url} returned 401 on ${new Date().toLocaleTimeString()}`)
			return 'This action requires for you to login please refresh your browser and try again'
		case 404:
			logger.warn(`${url} returned 404 on ${new Date().toLocaleTimeString()}`)
			return 'No content was returned'
		case 500:
			logger.error(`${url} returned 500 on ${new Date().toLocaleTimeString()}`)
			return 'Sorry something happened contact administrator'
		default:
			if (E3XX(status)) {
				logger.warn(
					`${url} returned ${status} on ${new Date().toLocaleTimeString()}`
				)
				return `Sorry, this resource has moved or it is being redirected`
			} else if (E4XX(status)) {
				logger.warn(
					`${url} returned ${status} on ${new Date().toLocaleTimeString()}`
				)
				return `Sorry, we could not understand the request you just posted`
			} else {
				logger.warn(
					`${url} returned ${status} on ${new Date().toLocaleTimeString()}`
				)
				return 'Sorry an error occoured while executing your request'
			}
	}
}
