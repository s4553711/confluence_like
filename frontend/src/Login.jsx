import { useState } from 'react'
import React from 'react'
import AuthProvider from './AuthProvider.js';
import { useOutletContext, useNavigate } from "react-router-dom";

const { useTokenStore } = AuthProvider();
import AuthConsumer from './AuthProvider2.jsx';

function Login() {
	const token = useTokenStore((state) => state.token);
	const onLogin = useTokenStore((state) => state.reg);

	const navigate = useNavigate();

	//const { token, onLogin } = useOutletContext();
	//const onLogin = () => {};
	//console.log(token);

	const token2 = AuthConsumer().token2;
	const onLogin2 = AuthConsumer().onLogin;

	const handler = async () => {
		console.log('Login called');
		onLogin2().then((ret)=>{
			console.log('Login status>' ,ret);
			navigate('/');
		}).catch((err) => {
			console.log(err);
		});
		/*try {
			let ret = await onLogin2();
			console.log('Login status>' ,ret);
			navigate('/');
		} catch(err) {
			console.log(err);
		}*/
	}

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
				<button className="btn btn-info" onClick={handler}>Login</button>
				<span>{token}</span>
			</div>
		</>
	)
}

export default Login
