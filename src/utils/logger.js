/**
 * @file here is a very goood place to log errors to a logging service like sentry
 */

export const logger = {
	error: err => console.error(err),
	warn: warning => console.warn(warning),
	message: message => console.log(message),
	dir: directory => console.dir(directory)
}
