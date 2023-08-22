import { Button, ButtonGroup } from '@chakra-ui/button'
import { Box, Heading, Text } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Image, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContextProvider } from '../Context/AuthContext'
import Logo from '../Data/logo/health_care.png'
import { FaCartPlus, FaHome, FaHospitalAlt, FaMapMarkedAlt, FaUserCircle } from 'react-icons/fa'
import { RiMenu3Line } from 'react-icons/ri'


const Navbar = () => {
    const { state, logoutHandle, picProfile } = useContext(AuthContextProvider);
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    //console.log(picProfile)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const handleLogout = () => {
        onClose();
        logoutHandle();
    }
    return (
        <>
            <Flex w={"100%"} justifyContent={'space-between'} minWidth='max-content' h={'90px'} alignItems='center' bg='#2c022cf3' position="fixed" top={'-10px'} p={isLargerThan600 ? '' : "0px 15px 0px 0px"}>
                <Link to="/">
                    <Box >
                        <Image w={isLargerThan600 ? "200px" : "150px"} src={Logo} />
                    </Box>
                </Link>
                {isLargerThan600 ?

                    <ButtonGroup gap='2' alignItems='center'>
                        <Link to="/doctorlist">
                            <Button
                                _hover={{
                                    border: '2px solid white',
                                    width: '260px',
                                    height: '45px',
                                    bg: 'none',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                                fontSize={17} fontWeight='bold' bg='none' >Book Doctor's Appointment</Button>
                        </Link>
                        <Link to="/status">
                            <Button
                                _hover={{
                                    border: '2px solid white',
                                    width: '210px',
                                    height: '45px',
                                    bg: 'none',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                                marginRight={1}
                                bg='none'
                                fontWeight={'bold'}
                                fontSize={17} >Check Booking Status</Button>
                        </Link>
                        {state.isAuth ?
                            <Flex >
                                <Button
                                    _hover={{
                                        border: '2px solid white',
                                        width: '80px',
                                        height: '45px',
                                        bg: 'none',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}
                                    marginRight={1}
                                    bg='none'
                                    fontWeight={'bold'}
                                    onClick={logoutHandle}>Logout</Button>
                                <Link to="/profile">
                                    <Text marginRight={5} w={"43px"} fontSize='4xl'>{picProfile == "" ? <FaUserCircle /> : <Image src={picProfile} borderRadius={"50%"} />} </Text>
                                </Link>
                                <Link to="/userlist">
                                    <Text marginRight={5} w={"43px"} fontSize='4xl'><FaCartPlus /> </Text>
                                </Link>
                            </Flex>
                            :
                            <Link to="/login">
                                <Button
                                    _hover={{
                                        border: '2px solid white',
                                        width: '80px',
                                        height: '45px',
                                        bg: 'none',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}
                                    bg='none'
                                    marginRight={1}
                                    fontWeight={'bold'}
                                >Log In</Button>
                            </Link>
                        }

                    </ButtonGroup>
                    :
                    <Box>
                        <Button ref={btnRef} colorScheme='none' onClick={onOpen}>
                            <RiMenu3Line onClick={onOpen} fontSize={'30px'} />
                        </Button>

                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>
                                    <Image w={"120px"} src={Logo} />
                                </DrawerHeader>

                                <DrawerBody
                                    p={'0px 0px 0px 50px'}
                                    display='flex'
                                    flexDirection={'column'}
                                    gap='25px'>
                                    <Link to="/">
                                        <Heading onClick={onClose} size={'md'} display={'flex'} alignItems='center' gap='10px'><FaHome />Home</Heading>
                                    </Link>
                                    <Link to="/doctorlist">
                                        <Heading onClick={onClose} size={'md'} display={'flex'} alignItems='center' gap='10px'><FaHospitalAlt />Doctor's</Heading>
                                    </Link>
                                    <Link to="/status">
                                        <Heading onClick={onClose} size={'md'} display={'flex'} alignItems='center' gap='10px'><FaMapMarkedAlt />Status</Heading>
                                    </Link>
                                    {state.isAuth ?
                                        <Box>
                                            <Link to="/profile">
                                                <Heading size={'md'} onClick={onClose} mb={'25px'} display={'flex'} alignItems='center' gap='10px'><FaUserCircle /> User</Heading>
                                            </Link>
                                            <Heading size={'md'} onClick={onClose} display={'flex'} alignItems='center' gap='10px'><FaCartPlus />Cart</Heading>
                                        </Box>
                                        : null}
                                </DrawerBody>

                                <DrawerFooter justifyContent={'space-between'}>
                                    <Flex alignItems={'center'} gap={1} >
                                        <Image border={"1px solid black"} w={"15%"} borderRadius={'50%'} src={picProfile} />
                                        <Heading size={'md'} >
                                            {state.name}
                                        </Heading>
                                    </Flex>
                                    {state.isAuth ?
                                        <Button colorScheme='blue' w={"100%"} onClick={handleLogout}>Logout</Button>
                                        :
                                        <Link to="/login">
                                            <Button colorScheme='blue' w={"100%"} onClick={onClose}>Login</Button>
                                        </Link>
                                    }
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </Box>
                }
            </Flex>
        </>
    )
}

export default Navbar