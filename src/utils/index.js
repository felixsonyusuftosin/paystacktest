/**
 * @file exports for utils file
 */
export {
	convertStringToSnakeCase,
	convertStringToCamelCase,
	convertStringToTitleCase
} from '@utils/strings'
export { logger } from '@utils/logger'
export {
	filterByGender,
	sortActorsByName,
	sortActorsByHeight,
	sortMoviesByDate,
	sortActorsByGender,
	getDistinctByGender
} from '@utils/array.manipulation'
