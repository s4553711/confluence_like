import { useState } from 'react'
import React from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';

function AllNote() {
	const [post, setPost] = React.useState([])

	React.useEffect(() => {
		axios.get('http://127.0.0.1:3344/api/notes/read').then((rep) => {
			console.log(rep);
			setPost(rep.data.data)
		});
	}, [])

	const img_wh = 50

	return (
		<>
			<div className="h5 p-2 text-start bold">All pages</div>
			{post.map((v, i) => (
			<div key={i} className="card p-2 border-0" style={{maxWidth:"540px"}}>
				<div className="row g-0 d-flex align-items-center">
					<div className="col-md-2">
						<img height={img_wh} width={img_wh} 
							src="https://github.com/mdo.png" 
							className="img-fluid rounded-circle"/>
					</div>
					<div className="col-md-10 text-start">
						<div className="card-body p-2">
							<h5 className="card-title">mdo</h5>
							<p className="card-text"><Link className="link-dark" style={{textDecoration: 'none'}} to={"/note/"+v.id}>{v.title}</Link></p>
						</div>
					</div>
				</div>
			</div>
			))}
		</>
	)
}

export default AllNote
