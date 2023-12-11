import { useState } from 'react'
import React from 'react'
import AuthProvider from './AuthProvider.js';
import { useOutletContext, useNavigate } from "react-router-dom";

const { useTokenStore } = AuthProvider();
import AuthConsumer from './AuthProvider2.jsx';

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";

function Login() {
	const token = useTokenStore((state) => state.token);
	const onLogin = useTokenStore((state) => state.reg);

	const {user, setUser} = useState('');
	const {password, setPassword} = useState('');

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
			<Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200"
				justifyContent="center"
				alignItems="center"
			>
				<Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
					<Heading color="teal.400">Confluence Like</Heading>
					<Box minW={{base: "90%", md: "468px"}}>
						<form>
							<Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
								<FormControl>
									<InputGroup>
										<Input type="email" placeholder="email address" onChange={setUser} />
									</InputGroup>
								</FormControl>
								<FormControl>
									<InputGroup>
										<Input type="password" placeholder="Password" onChange={setPassword}/>
									</InputGroup>
									<FormHelperText textAlign="right">Use default to login</FormHelperText>
								</FormControl>
								<Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full" onClick={handler}>
									Login
								</Button>
							</Stack>
						</form>
					</Box>
				</Stack>
			</Flex>
		</>
	)
			//<div className="d-flex align-items-center justify-content-center vh-100" style={style.bg}>
			//	<button className="btn btn-info" onClick={handler}>Login</button>
			//	<span>{token}</span>
			//</div>
}

export default Login
