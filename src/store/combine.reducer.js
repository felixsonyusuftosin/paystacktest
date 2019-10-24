import { combineReducers } from 'redux'

import { convertStringToCamelCase } from '@utils'
import { genericReducer } from '@store'

const flattenedReducers = () => {
	const mergedReducers = {}
	const storeBlueprint = genericReducer()

	Object.keys(storeBlueprint).map(key => {
		const adaptedBluePrintKey = String(
			convertStringToCamelCase(key.toLocaleLowerCase())
		)

		mergedReducers[adaptedBluePrintKey] = storeBlueprint[key]
		return mergedReducers
	})
	return mergedReducers
}

export default combineReducers({
	...flattenedReducers()
})
