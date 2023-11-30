import { useState } from 'react'
import React from 'react'

function Error() {

	React.useEffect(() => {
	}, [])

	const style = {
		text: {
			fontSize: '15rem',
		},
		bg: {
			background: 'linear-gradient(to right,#9ac4f5 ,#baa5ed)',
		}
	}

	return (
		<>
			<div className="d-flex align-items-center justify-content-center vh-100" style={style.bg}>
				<div className=""><span className="h1 text-light fw-bold" style={style.text}>404</span></div>
			</div>
		</>
	)
}

export default Error
