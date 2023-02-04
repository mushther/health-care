import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContextProvider } from '../Context/AuthContext'

const Login = () => {
    const { state, loginHandle } = useContext(AuthContextProvider);

    const handleClick = () => {
        loginHandle(`MHK${Date.now()}LK`);
    }
    return (
        <Box w={"80%"} m={"auto"} >
            {!state.isAuth ?
                <FormControl pb={"355px"} pt={"95px"}>
                    <Heading>Login</Heading>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' />
                    <FormHelperText textAlign={"start"}>We'll never share your email.</FormHelperText>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' />
                    <Link to="/">
                        <Button
                            onClick={handleClick}
                            display={"block"}
                            margin={"none"}
                            marginTop={"15px"}
                            colorScheme={"blue"}
                        >Login</Button>
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