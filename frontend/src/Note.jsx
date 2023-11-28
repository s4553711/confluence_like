import React, { useState } from 'react'
import axios from 'axios'
import { useLoaderData } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './github-markdown.css'

export function getNotes(id) {
	return {'name': 'abc'+id, 'ret': [1,2,34]};
}

export async function loader({params}) {
	//const { name, ret } = await getNotes(params.noteId);
	//return { name, ret };
	let rep = await axios.get('http://127.0.0.1:3344/api/note/'+params.noteId);
	console.log(rep);
	return {...rep.data, noteId: params.noteId};
}

function Note() {
	const {noteId, message, title} = useLoaderData();
	const [count, setCount] = useState(0)

	React.useEffect(() => {
		//axios.get('http://127.0.0.1:3344/note/'+noteId).then((rep) => {
		//	console.log(rep);
		//	setPost(rep.data.message);
		//});
	}, [])

	return (
		<>
			<div className="h2 pb-2 text-start">
				{title}, ({noteId})
			</div>
			<div className="markdown-body text-start">
				<ReactMarkdown children={message} remarkPlugins={[remarkGfm]}></ReactMarkdown>
			</div>
		</>
	)
}

export default Note
