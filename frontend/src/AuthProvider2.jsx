import React from 'react'
import axios from 'axios'

const AuthContext = React.createContext(0);

const fakeAuth = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			axios.get('http://127.0.0.1:3344/api/login').then((rep) => {
				const data = rep.data;
				console.log(data); // { status: 200, ret: true, session: 'sessionID123', user: 'doo' }
				if (data.ret) {
					resolve({ret: data.ret, user: data.user});
				}
			});
		}, 500);
});

export function AuthProvider2 ({ children }) {
	const [token2, setToken2] = React.useState(0);
	const [user, setUser] = React.useState('');

	const handleLogin = async () => {
		return new Promise(async (resolve, reject) => {
			const {ret, user} = await fakeAuth();
			setToken2(ret);
			setUser(user);
			if (ret) {
				resolve(ret);
			} else {
				reject(new Error('Login error'));
			}
		});
	};

	const handleLogout = () => {
		setToken2(0);
	};

	const value = {
		token2,
		user,
		onLogin: handleLogin,
		onLogout: handleLogout,
	};

	return (
		<>
			<AuthContext.Provider value={value}>
		    	{children}
			</AuthContext.Provider>
		</>
	);
};

export default function AuthConsumer() {
	return React.useContext(AuthContext);
}
