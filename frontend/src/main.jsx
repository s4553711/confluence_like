import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Root from './Root.jsx'
import Error from './Error.jsx'
import Page, { loader as pageLoader } from './Page.jsx'
import NewNote from './NewNote.jsx'
import AllNote from './AllNote.jsx'
import Edit, { loader as editLoader } from './Edit.jsx'
import MarkdownNote, { loader as noteLoader } from './MarkdownNote.jsx'
import Archives from './Archives.jsx'
import Login from './Login.jsx'
import TApp from './mainApp.jsx'
import { createBrowserRouter, RouterProvider, useRouteError, Navigate} from "react-router-dom";
import { StaticRouter, StaticRouterProvider} from "react-router-dom/server";
//import './index.css'

import { ChakraProvider } from '@chakra-ui/react'


function ErrorBoundary() {
	let error = useRouteError();
	console.error(error);
	// Uncaught ReferenceError: path is not defined
	return <div>Dang!</div>;
}

const ProtectedRoute = ({ children }) => {
	//const { token } = useAuth();
	const token = React.useContext(AuthContext);
	console.log("Protected router get value", token)

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

const router = createBrowserRouter([
	{
		path: "/abc",
		element: <div>Hello world!</div>,
	},{
		path: "/",
		element: <Root/>,
		//errorElement: <div>resources not found</div>,
		errorElement: <ErrorBoundary/>,
		children: [{
			path: 'archives',
			element: <Archives/>,
		},{
			path: 'pages',
			element: <ProtectedRoute><AllNote/></ProtectedRoute>,
		},{
			path: "page/:pageId",
			element: <Page/>,
			loader: pageLoader,
		},{
			path: 'app',
			element: <App/>,
		},{
			path: "archive/:noteId",
			element: <MarkdownNote/>,
			loader: noteLoader,
		},{
			path: "note/add",
			element:<NewNote/>,
		},{
			path: "note/edit/:pageId",
			element: <Edit/>,
			loader: editLoader,
		}]
	},{
		path: "login",
		element: <Login/>,
	},{
		path: '*',
		element: <Error/>,
	}
]);

/*ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider>
			<RouterProvider router={router}/>
		</ChakraProvider>
	</React.StrictMode>,
)*/
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider>
			<TApp/>
		</ChakraProvider>
	</React.StrictMode>,
)
