import React from 'react'
import PropTypes from 'prop-types'
import './notification.scss'

export const Notification = ({ message, errorType = 'error', setMessage }) => {
	const notificationstyle = {}

	if (errorType === 'warning') {
		notificationstyle.backgroundColor = '#FCB500'
	}

	return (
		message && (
			<section className="notification" style={notificationstyle}>
				<span> {message}</span>
				<i onClick={() => setMessage('')} className="fa fa-close"></i>
			</section>
		)
	)
}

Notification.propTypes = {
	message: PropTypes.string,
	errorType: PropTypes.string,
	setMessage: PropTypes.func
}
