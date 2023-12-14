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
import { createBrowserRouter, RouterProvider, useRouteError, Navigate} from "react-router-dom";
import { StaticRouter, StaticRouterProvider} from "react-router-dom/server";
//import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from './AuthProvider.js';

import { AuthProvider2 } from './AuthProvider2.jsx';
import AuthConsumer from './AuthProvider2.jsx';

function ErrorBoundary() {
	let error = useRouteError();
	console.error(error);
	// Uncaught ReferenceError: path is not defined
	return <div>Dang!</div>;
}

const ProtectedRoute = ({ children }) => {
	const { useTokenStore } = AuthProvider();
	const token = useTokenStore((state) => state.token);
	const token2 = AuthConsumer().token2;

	console.log('ProtectedRouter> 1', token, typeof(token));
	console.log('ProtectedRouter> 2', token2, typeof(token2));
	console.log(token2 == 0);
	//if (!token) {
	if (token2 == 0) {
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
		//element: <Root/>,
		element: <ProtectedRoute><Root/></ProtectedRoute>,
		//errorElement: <div>resources not found</div>,
		errorElement: <ErrorBoundary/>,
		children: [{
			path: '/',
			element: "<h3>WOWOWOWO</h3>",
		},{
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


function TApp() {
	return (
		<>
			<AuthProvider2>
				<RouterProvider router={router}/>
			</AuthProvider2>
		</>
	)
}

export default TApp;
