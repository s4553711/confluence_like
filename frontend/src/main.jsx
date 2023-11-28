import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Root from './Root.jsx'
import NewNote from './NewNote.jsx'
import AllNote from './AllNote.jsx'
import Note, { loader as noteLoader } from './Note.jsx'
import ListArticles from './ListArticles.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { StaticRouter, StaticRouterProvider} from "react-router-dom/server";
//import './index.css'

import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter([
	{
		path: "/abc",
		element: <div>Hello world!</div>,
	},{
		path: "/",
		element: <Root/>,
		errorElement: <div>resources not found</div>,
		children: [{
			path: 'list',
			element: <ListArticles/>,
		},{
			path: 'pages',
			element: <AllNote/>,
		},{
			path: 'app',
			element: <App/>,
		},{
			path: "note/:noteId",
			element: <Note/>,
			loader: noteLoader,
		},{
			path: "note/add",
			element:<NewNote/>,
		}]
	},{
		path: '*',
		element: <div>404</div>,
	}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider>
			<RouterProvider router={router}/>
		</ChakraProvider>
	</React.StrictMode>,
)
