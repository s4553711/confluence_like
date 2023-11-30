import { useState } from 'react'
import React from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'

function Archives() {
	const [count, setCount] = useState(0)
	const [post, setPost] = React.useState([])

	React.useEffect(() => {
		axios.get('http://127.0.0.1:3344/api/list').then((rep) => {
			console.log(rep);
			setPost(rep.data.articles);
		});
	}, [])

	return (
		<>
			<div className="text-start">
				<ol>
					{post.map((v, i) => (
						<li key={i}>{v.title} (<Link to={"/archive/"+v.id}>link</Link>)</li>
					))}
				</ol>
			</div>
		</>
	)
}

export default Archives
