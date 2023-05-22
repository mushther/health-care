import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from '../Context/AuthContext'
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { FaArrowAltCircleRight } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const { state, loginHandle } = useContext(AuthContextProvider);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    //console.log(data);
    useEffect(() => {

    }, [])

    const handleClick = () => {
        setIsLoading(true)
        axios.get(`https://renderapi-h6ct.onrender.com/loginData`).then((res) => {
            setData(res.data)
            const loginD = res.data.find((el) => el.email == loginData.email && el.password == loginData.password)

            if (loginD) {
                //alert("Login Succesfully")
                navigate("/")
                loginHandle(loginD.userId);
                setIsLoading(false)
                toast({
                    title: 'Login Successfully.',
                    description: "We've login your account for you.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Wrong Input.',
                    description: "Sorry We've not login your account for you.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
                setIsLoading(false)
            }
        }).catch((err) => {
            toast({
                title: 'Login Unsuccessfully.',
                description: "Sorry We've not login your account for you.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            setIsLoading(false)
        })

    }
    const hnadleChnageLogin = (e) => {

        setLoginData({ ...loginData, [e.target.name]: e.target.value });

    }
    return (
        <Box w={"80%"} m={"auto"} >
            {!state.isAuth ?
                <FormControl pb={"355px"} pt={"95px"}>
                    <Heading>Login</Heading>
                    <FormLabel>Email address</FormLabel>
                    <Input placeholder='Enter email' name='email' value={loginData.email} onChange={(e) => { hnadleChnageLogin(e) }} type='email' />
                    <FormHelperText textAlign={"start"}>We'll never share your email.</FormHelperText>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Enter password' name='password' value={loginData.password} onChange={(e) => { hnadleChnageLogin(e) }} type='password' />
                    <Button
                        onClick={handleClick}
                        display={"block"}
                        margin={"none"}
                        marginTop={"15px"}
                        colorScheme={"blue"}
                        isLoading={isLoading}
                    >Login</Button>

                    <Link to='/signup'>
                        <Flex gap={4} justifyContent={'center'} alignItems={'center'} border={"1px solid white"} m={"auto"} p={1} borderRadius={10} w={"15%"} _hover={{ bg: "#4267B2", border: "2px solid white" }}>
                            SignUp Here <FaArrowAltCircleRight />
                        </Flex >
                    </Link>
                </FormControl>
                :
                <Alert
                    status='success'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    bg={'none'}
                    height='200px'
                >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} color='green.500' fontSize='lg'>
                        Login Successfully !
                    </AlertTitle>
                </Alert>}
        </Box>
    )
}

export default Login