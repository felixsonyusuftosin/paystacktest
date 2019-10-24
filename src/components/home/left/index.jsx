/**
 * @file left component
 */

// third party imports
import React from 'react'

// Local Imports
import '@home/left/styles/left.scss'

export const Left = () => (
	<section className="left">
		<ul>
			<li className="header"> Movie Artifacts</li>
			<li className="highlight"><i className="fa fa-comments"></i> <span>Reviews</span></li>
			<li><i className="fa fa-th"></i> <span>Box Office</span></li>
			<li><i className="fa fa-film"></i> <span>Sneak Preview</span></li>
			<li><i className="fa fa-credit-card"></i> <span>Subscribe</span></li>
		</ul>
	</section>
)
