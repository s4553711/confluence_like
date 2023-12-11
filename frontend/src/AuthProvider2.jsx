import React from 'react'
import axios from 'axios'

const AuthContext = React.createContext(0);

const APIAuth = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			axios.get('http://127.0.0.1:3344/api/login',{withCredentials: true}).then((rep) => {
				const data = rep.data;
				console.log(data); // { status: 200, ret: true, session: 'sessionID123', user: 'doo' }
				// FIX: no action if login failed
				if (data.ret) {
					resolve({ret: data.ret, user: data.user});
				}
			});
		}, 500);
});

const fakeAuth = () => {
	return new Promise((resolve) => {
		resolve({ret: true, user: 'ck'});
	});
}

const APICheck = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			axios.get('http://127.0.0.1:3344/api/auth',{withCredentials: true}).then((rep) => {
				const data = rep.data;
				console.log(data); // { status: 200, ret: true, session: 'sessionID123', user: 'doo' }
				resolve({ret: data.ret, user: data.user});
			});
		}, 500);
});


const fakeCheck = () => {
	return new Promise((resolve) => {
		resolve({ret: true, user: 'ck'});
	});
}

export function AuthProvider2 ({ children }) {
	const [token2, setToken2] = React.useState(0);
	const [user, setUser] = React.useState('');

	const update_auth = async () => {
		return new Promise(async (resolve, reject) => {
			const {ret, user} = await fakeCheck();
			setToken2(ret);
			setUser(user);
			if (ret) {
				resolve(ret);
			} else {
				reject(new Error('login expired'));
			}
		});
	}

	const handleLogin = async () => {
		return new Promise(async (resolve, reject) => {
			const {ret, user} = await fakeAuth();
			setToken2(ret);
			setUser(user);
			if (ret) {
				resolve(ret);
			} else {
				reject(new Error('auth error'));
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

	React.useEffect(() => {
		const interval = setInterval(async () => {
			console.log('This will run every second!');
			//update_auth().catch((err) => {
			//	console.log('auth fail>', err);
			//});
		}, 30000);
		return () => clearInterval(interval);
	}, [])

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
