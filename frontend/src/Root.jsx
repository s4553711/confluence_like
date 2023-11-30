import { useState } from 'react'
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import React from 'react'

function Root() {
	const navigate = useNavigate()
	const [count, setCount] = useState(0)
	const pages = [{
		text: 'Home', url: '/'
	},{
		text: 'Pages', url: '/pages'
	},{
		text: 'Archives', url: '/archives'
	},{
		text: 'App', url: '/app'
	}]

	const f1 = () => {
		navigate("/note/add")
	}

	React.useEffect(() => {
	}, [])

  return (
    <>
		<div className="border-bottom p-2 d-flex align-items-center" style={{background:"#0049b0"}}>
			<div><span className="h5 text-white pe-2">Confluence</span></div>
			<button type="button" className="btn btn-primary rounded-1 d-flex align-items-center" onClick={f1}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>Create</button>
		</div>
		<main className="d-flex flex-nowrap h-100 vw-100">
			<div className="d-flex flex-column flex-shrink-0 p-3 text-bg-light border-right text-start" style={{width:'240px'}}>
			<hr/>
				<ul className="nav nav-pills flex-column mb-auto">
					{pages.map((v, i) => (<li key={i} className="nav-item"><NavLink to={v.url} className="nav-link">{v.text}</NavLink></li>))
					}
				</ul>
			<hr/>
				<div className="dropdown">
					<a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						<img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
						<strong>mdo</strong>
					</a>
					<ul className="dropdown-menu dropdown-menu-dark text-small shadow">
						<li><a className="dropdown-item" href="#">New project...</a></li>
						<li><a className="dropdown-item" href="#">Settings</a></li>
						<li><a className="dropdown-item" href="#">Profile</a></li>
						<li><hr className="dropdown-divider"/></li>
						<li><a className="dropdown-item" href="#">Sign out</a></li>
					</ul>
				</div>
			</div>
			<div className="w-100 p-3 border-start overflow-auto"><Outlet/></div>
		</main>
    </>
  )
}

export default Root
