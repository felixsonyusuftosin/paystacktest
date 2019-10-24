/**
 * @file setup tests for actions
 */

import { setUpActions } from '@store'

describe('setUpActions', () => {
	let testActions2 = ['TESTING_1']

	test('Action object to contain all the three action attributes ', () => {
		const actionObject = setUpActions(testActions2)
		const defaultObject = {
			TESTING_1: {
				request: `REQUEST_${testActions2.TESTING_1}`,
				recieve: `RECIEVE_${testActions2.TESTING_1}`,
				fail: `FAIL_${testActions2.TESTING_1}`
			}
		}
		expect(actionObject).toMatchObject(defaultObject)
	})
})
