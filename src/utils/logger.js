/**
 * @file here is a very goood place to log errors to a logging service like sentry
 */

const ENVIRONMENT = process.env.NODE_ENV

export const logger = {
	error: err => {
		// you can implement method to right to a logger service here
		if (ENVIRONMENT === 'development') {
			console.error(err)
		}
	},
	warn: warning => {
		// you can implement method to right to a logger service here
		if (ENVIRONMENT === 'development') {
			console.warn(warning)
		}
	},
	message: message => {
		// you can implement method to right to a logger service here
		if (ENVIRONMENT === 'development') {
			console.log(message)
		}
	},
	dir: directory => {
		// you can implement method to right to a logger service here
		if (ENVIRONMENT === 'development') {
			console.dir(directory)
		}
	}
}
