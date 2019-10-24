/**
 * @file implementation of generic action, reads the actions from action dictionary
 */

import { actionDictionary } from '@store'

export const setUpActions = (actionConstants = actionDictionary) => {
	const actions = {}

	actionConstants.map(actionConstant => {
		actions[actionConstant] = {
			request: `REQUEST_${actionConstant}`,
			recieve: `RECIEVE_${actionConstant}`,
			fail: `FAIL_${actionConstant}`
		}
	})
	return actions
}
