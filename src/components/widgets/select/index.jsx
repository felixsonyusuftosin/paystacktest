/**
 * @file select item
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import '@widgets/select/select.scss'
import { convertStringToTitleCase } from '@utils'

export const SelectWidget = props => {
	const {
		onChange,
		onCancel,
		style = {},
		options = [],
		valuename,
		labelname,
		placeholder = 'Select...',
		loading = false
	} = props
	const { fontSize = '1.2rem' } = style
	const [selected, setSelection] = useState('-1')

	const cancelSelection = () => {
		setSelection('-1')
		onCancel()
	}

	const onChangeSelection = $event => {
		const { target } = $event
		const { value } = target

		setSelection(value)
		if (value !== '-1') {
			onChange($event)
		}
	}

	let disabled = loading == 'true' ? true : false

	return (
		<div
			className={disabled ? 'custom-select disabled' : 'custom-select'}
			style={style}>
			<select
				defaultValue="-1"
				disabled={disabled}
				{...props}
				className="select"
				value={selected}
				onChange={onChangeSelection}>
				<option value="-1" disabled={true}>
					{placeholder}
				</option>
				{options &&
					options.length &&
					options.map((option, index) => {
						if (typeof option === 'object') {
							return (
								<option key={index} value={option[valuename]}>
									{option[labelname]}
								</option>
							)
						}
						return (
							<option key={index} value={option}>
								{convertStringToTitleCase(option)}
							</option>
						)
					})}
			</select>
			{disabled ? (
				<i className="fa fa-spinner fa-spin fa-3x fa-fw loading"></i>
			) : (
				<i
					className="fa fa-close"
					onClick={cancelSelection}
					style={{ fontSize }}
				/>
			)}
		</div>
	)
}

SelectWidget.propTypes = {
	onChange: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	style: PropTypes.any,
	options: PropTypes.array,
	valuename: PropTypes.string,
	labelname: PropTypes.string,
	placeholder: PropTypes.string,
	loading: PropTypes.string
}
