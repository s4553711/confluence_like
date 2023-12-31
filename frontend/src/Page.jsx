import React, { useState } from 'react'
import axios from 'axios'
import { useLoaderData, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import userLogo from './assets/user.png'
import remarkGfm from 'remark-gfm'
import './github-markdown.css'
import AuthConsumer from './AuthProvider2.jsx';

export function getNotes(id) {
	return {'name': 'abc'+id, 'ret': [1,2,34]};
}

export async function loader({params}) {
	//const { name, ret } = await getNotes(params.noteId);
	//return { name, ret };
	let rep = await axios.get('/api/note/'+params.pageId);
	console.log(rep);
	return {...rep.data.data, pageId: params.pageId};
}

function Page() {
	const navigate = useNavigate()
	const {pageId, content, title} = useLoaderData();
	const [count, setCount] = useState(0);
	const { avatar } = AuthConsumer();

	React.useEffect(() => {
		//axios.get('/note/'+noteId).then((rep) => {
		//	console.log(rep);
		//	setPost(rep.data.message);
		//});
	}, [])

	const editHandler = () => {
		navigate(`/note/edit/${pageId}`)
	}

	const img_wh = 30
	const style = {
		header: {
			color: '#44546f',
			fontSize: '.8rem',
		}
	}

	return (
		<>
			<div className="d-flex ms-3 mt-3">
				<div className="text-start flex-fill d-flex flex-column">
					<div className="h1">{title}</div>
					<div className="d-flex flex-row mt-2">
						<div className="align-items-center align-self-center me-3">
						<img height={img_wh} width={img_wh} 
							src={avatar} 
							className="img-fluid rounded-circle"/>
						</div>
						<div className="align-items-stretch d-flex flex-column" style={style.header}>
							<div>Owned by ck</div>
							<div>2020/1/1 edited</div>
						</div>
					</div>
				</div>
				<div className="text-end align-items-center align-self-center me-3">
					<button className="btn btn-primary" onClick={editHandler}>Edit</button>
				</div>
			</div>
			<div className="text-start ms-3 mt-5 lh-sm" dangerouslySetInnerHTML={{__html: content}}>
			</div>
		</>
	)
}

export default Page
