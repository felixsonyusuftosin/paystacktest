/**
 * @file default exports
 */
export { setUpActions } from '@store/setup.action'
export {
	dispatchActionsSync,
	dispatchActionsAsync,
	dispatchActionsObservable
} from '@store/action.creator'
export { actionDictionary } from '@store/action.dictionary'
export { genericReducer } from '@store/reducer'
export { default as store } from '@store/store'
export { default as rootReducer } from '@store/combine.reducer'
