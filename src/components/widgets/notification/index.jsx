import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './notification.scss'
let timer

export const Notification = ({
	message,
	errorType = 'error',
	duration = 4000,
	setMessage
}) => {
	useEffect(() => {
		timer = setTimeout(() => {
			setMessage('')
		}, duration)
		return () => clearTimeout(timer)
	}, [timer])

	const notificationstyle = {}

	if (errorType === 'warning') {
		notificationstyle.backgroundColor = '#FCB500'
	}

	return (
		message && (
			<section className="notification" style={notificationstyle}>
				<span> {message}</span>
				<i onClick={setMessage('')} className="fa fa-close"></i>
			</section>
		)
	)
}

Notification.propTypes = {
	message: PropTypes.string,
	errorType: PropTypes.string,
	duration: PropTypes.number,
	setMessage: PropTypes.func
}
