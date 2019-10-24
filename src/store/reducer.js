/**
 * @file define generic reducers
 */

import { setUpActions } from '@store'

// initial default state
const initialState = {
	pending: false,
	payload: null,
	error: null
}

export const genericReducer = () => {
	const reducers = {}
	Object.keys(setUpActions()).map(actionKey => {
		reducers[actionKey] = (state = initialState, action) => {
			switch (action.type) {
				case setUpActions()[actionKey].request: {
					return {
						...state,
						pending: true,
						payload: null,
						error: false
					}
				}
				case setUpActions()[actionKey].recieve: {
					return {
						...state,
						pending: false,
						payload: action.payload,
						error: false
					}
				}
				case setUpActions()[actionKey].fail: {
					return {
						...state,
						pending: false,
						payload: null,
						error: action.payload
					}
				}
				default:
					return state
			}
		}
		return reducers
	})
	return reducers
}
