import { useState } from 'react'
import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import userLogo from './assets/user.png'
import AuthConsumer from './AuthProvider2.jsx';

function AllNote() {
	const [post, setPost] = React.useState([])
	const { onLogout } = AuthConsumer();
	const navigate = useNavigate()

	React.useEffect(() => {
		axios.get('http://127.0.0.1:3344/api/notes/read').then((rep) => {
			console.log(rep);
			setPost(rep.data.data)
		}).catch((e) => {
			console.log(e);
			//onLogout();
			//navigate('/login');
		});
	}, [])

	const img_wh = 50

	return (
		<>
			<div className="h5 p-2 text-start bold">All pages</div>
			{post.map((v, i) => (
			<div key={i} className="card p-2 border-0" style={{maxWidth:"800px"}}>
				<div className="row g-0 d-flex align-items-center">
					<div className="col-md-1 pe-1">
						<img height={img_wh} width={img_wh} 
							src={v.avatar} 
							className="img-fluid rounded-circle"/>
					</div>
					<div className="col-md-11 text-start">
						<div className="card-body py-1">
							<h5 className="card-title mt-0 mb-1">{v.owner}</h5>
							<div className="card-text mb-0 d-flex lh-lg">
								<div className="w-20 me-2 text-primary">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="d-inline bi bi-file-text-fill" viewBox="0 0 16 16">
  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1"/></svg>
								</div>
								<Link className="link-dark" style={{textDecoration: 'none'}} to={"/page/"+v.id}>{v.title}</Link></div>
							<p className="text-start" style={{color:'#b5b5b5'}}>{v.updated}</p>
						</div>
					</div>
				</div>
			</div>
			))}
		</>
	)
}

export default AllNote
