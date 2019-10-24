/**
 * @file this was loader and styles were referenced from https://loading.io/css/
 */
import React from 'react'
import '@widgets/loader/loader.scss'

export const Loader = () => (
	<div className="lds-roller">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
)
