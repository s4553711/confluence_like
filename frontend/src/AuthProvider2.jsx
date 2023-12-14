import React from 'react'
import axios from 'axios'

const AuthContext = React.createContext(0);

const APIAuth = () =>
	new Promise((resolve) => {
		//setTimeout(() => {
			axios.get('/api/login',{withCredentials: true}).then((rep) => {
				const data = rep.data;
				console.log(data); // { status: 200, ret: true, session: 'sessionID123', user: 'doo' }
				// FIX: no action if login failed
				if (data.ret) {
					resolve({ret: data.ret, user: data.user});
				}
			});
		//}, 5000);
});

const fakeAuth = () => {
	return new Promise((resolve) => {
		resolve({ret: true, user: 'ck'});
	});
}

const APILogout = () =>
	new Promise((resolve) => {
		//setTimeout(() => {
			axios.get('/api/logout',{withCredentials: true}).then((rep) => {
				const data = rep.data;
				console.log(data); // { status: 200, ret: true }
				// FIX: no action if login failed
				if (data.ret) {
					resolve({ret: data.ret});
				} 
			});
		//}, 5000);
});

const APICheck = () =>
	new Promise((resolve) => {
		//setTimeout(() => {
			axios.get('/api/auth',{withCredentials: true}).then((rep) => {
				const data = rep.data;
				console.log(data); // { status: 200, ret: true, session: 'sessionID123', user: 'doo' }
				resolve({ret: data.ret, user: data.user});
			});
		//}, 5000);
});


const fakeCheck = () => {
	return new Promise((resolve) => {
		resolve({ret: true, user: 'ck'});
	});
}

const getInitToken = () => {
	const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : 0;
	return token;
}
const getInitUser = () => {
	const user = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : '';
	return user;
}
const getInitAvatar = () => {
	const user = sessionStorage.getItem('avatar') ? sessionStorage.getItem('avatar') : '';
	return user;
}

export function AuthProvider2 ({ children }) {
	const [token2, setToken2] = React.useState(getInitToken);
	const [user, setUser] = React.useState(getInitUser);
	const [avatar, setAvatar] = React.useState(getInitAvatar);

	const update_auth = async () => {
		return new Promise(async (resolve, reject) => {
			const {ret, user} = await APICheck();
			setToken2(ret);
			setUser(user);
			setAvatar('/api/avatar/'+user);
			if (ret) {
				resolve(ret);
			} else {
				reject(new Error('login expired'));
			}
		});
	}

	const handleLogin = () => {
		return new Promise(async (resolve, reject) => {
			//const {ret, user} = await fakeAuth();
			const {ret, user} = await APIAuth();
			setToken2(ret);
			setUser(user);
			setAvatar('/api/avatar/'+user);
			sessionStorage.setItem('token', ret);
			sessionStorage.setItem('user', user);
			sessionStorage.setItem('avatar', '/api/avatar/'+user);
			if (ret) {
				resolve(ret);
			} else {
				reject(new Error('auth error'));
			}
		});
	};

	const handleLogout = async () => {
		let ret = await APILogout();
		if (!ret.ret) {
			console.log('server side error with logout')
		}
		sessionStorage.clear();
		setToken2(0);
		setUser('');
	};

	const value = {
		token2,
		user,
		avatar,
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
