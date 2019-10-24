/**
 * @file define actionCreators
 */

import { setUpActions } from '@store'

/**
 * @function returnActionsAsync passes the appropriate async actions to the reducer
 * @param { string } actionDictionaryKey
 */
export const returnActionsAsync = actionDictionaryKey => {
	const actionSet = setUpActions()[actionDictionaryKey]
	if (!actionSet) {
		throw new Error(
			`The dictKey ${actionDictionaryKey} does not match any parameter of the actionDictionary object `
		)
	}
	// return appropriate action types
	const returnSet = {
		request() {
			return {
				type: actionSet.request,
				fetching: true,
				payload: null
			}
		},
		recieve(data) {
			return {
				type: actionSet.recieve,
				fetching: false,
				payload: data
			}
		},
		fail(error) {
			return {
				type: actionSet.fail,
				fetching: false,
				payload: error
			}
		}
	}
	return returnSet
}

/**
 * @function returnActionSync passes the appropriate synchronous action to the store
 * @param  { Object } - value, to be passed to the reducer
 *  @param { string } - actionDictionaryKey
 */
const returnActionsSync = actionDictionaryKey => {
	return {
		recieve(value) {
			return {
				type: `RECIEVE_${actionDictionaryKey}`,
				fetching: false,
				payload: value
			}
		}
	}
}

export const dispatchActionsSync = (dictKey, eventAction, parameters = []) => {
	if (!dictKey) {
		throw new Error(
			' !invalid request , you did not pass in adequate parameters '
		)
	}
	const actions = returnActionsSync(dictKey)

	if (typeof eventAction === 'function') {
		return actions.recieve(eventAction.apply(this, parameters))
	} else {
		return actions.recieve(eventAction)
	}
}

export const dispatchActionsObservable = (
	dictKey,
	eventAction,
	parameters = []
) => {
	if (!dictKey || !eventAction) {
		throw new Error(
			' !invalid request , you did not pass in adequate parameters '
		)
	}
	const actions = returnActionsAsync(dictKey)

	return async dispatch => {
		dispatch(actions.request())

		const observableStream = eventAction.apply(this, parameters)
		const subscription = observableStream.subscribe({
			next: response => {
				dispatch(actions.recieve(response))
			},
			error: err => dispatch(actions.fail(err))
		})
	}
}

export const dispatchActionsAsync = (dictKey, eventAction, parameters = []) => {
	if (!dictKey) {
		throw new Error(
			' !invalid request , you did not pass in adequate parameters '
		)
	}
	const actions = returnActionsAsync(dictKey)

	return async dispatch => {
		dispatch(actions.request())
		try {
			const eventPromise = eventAction.apply(this, parameters)
			return Promise.resolve(eventPromise)
				.then(value => {
					return dispatch(actions.recieve(value))
				})
				.catch(err => {
					return dispatch(actions.fail(err))
				})
		} catch (err) {
			return dispatch(actions.recieve(eventAction))
		}
	}
}
