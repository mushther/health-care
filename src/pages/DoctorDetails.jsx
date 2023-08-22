
import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text, useMediaQuery, useToast, } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { TbListDetails } from 'react-icons/tb'
import { FaEdit, FaStar } from 'react-icons/fa'
import axios from 'axios'
import { AuthContextProvider } from '../Context/AuthContext'

const DoctorDetails = () => {
    const { state } = useContext(AuthContextProvider);
    const [data] = useState(JSON.parse(localStorage.getItem("appointment")))
    const navigate = useNavigate();
    const [data1, setData1] = useState([])
    const [userEligibleState, setUserEligibleState] = useState("")
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const toast = useToast();

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    useEffect(() => {
        axios.get(`https://renderapi-h6ct.onrender.com/doctor`).then((res) => {
            setData1(res.data[data.id - 1].review);
        })
        axios.get(`https://renderapi-h6ct.onrender.com/user`).then((res) => {
            const filtered = res.data.find((item) => item.userId === state.userId && item.doctorUserId === data.doctorUserId);
            //console.log(filtered);
            setUserEligibleState(filtered);
        })
    }, [])
    const handleuserEligibleState = () => {
        if (userEligibleState) {
            navigate("/review")
        } else {
            toast({
                title: `Haven't booked appointment`,
                description: `Sorry, You are not allowed to review because you haven't booked an appointment.`,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }
    return (
        <Box m='auto' mt={"80px"} pt={"50px"} pb={"50px"} w='80%' display={'grid'} gap={5}>
            <Heading display='flex' gap={4} alignItems={'center'}> <TbListDetails /> Doctor Details</Heading>
            <Box border={"1px solid white"} borderRadius={5} p={1}>

                <Card
                    position={"none"}
                    padding={5}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    color={'white'}
                >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '300px' }}
                        borderRadius={10}
                        height={"300px"}
                        src='https://i.pinimg.com/originals/56/d1/c0/56d1c032884032f4216b9bc790c00a1e.jpg'
                        alt='Caffe Latte'
                    />

                    <Stack position={"none"}>
                        <CardBody>
                            <Heading textAlign={"start"} size={'xl'}>{data.doctorname}</Heading>
                            <Box display={isLargerThan600 ? 'grid' : 'grid'} textAlign='start' gap={isLargerThan600 ? 0 : 0}>
                                <Heading size={'sm'} py='2'>
                                    {data.eduction}
                                </Heading>
                                <Heading size={'sm'} py='2'>
                                    Address: {data.address}
                                </Heading>
                                <Heading size={'sm'} py='2'>
                                    Fee: ₹ {data.doctorfee}/-
                                </Heading>
                                <Heading size={'sm'} py='2'>
                                    Total Book Appointment:  {data.appointment}
                                </Heading>
                                <Button
                                    _hover={{
                                        border: '2px solid white',
                                        width: '190px',
                                        height: '45px',
                                        bg: 'none',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}
                                    mt={14}
                                    marginRight={1}
                                    bg='aqua'
                                    color={'black'}
                                    fontWeight={'bold'}
                                    fontSize={17}
                                    position={"none"}
                                    variant='solid'
                                    onClick={() => { navigate("/bookappointment") }} colorScheme='blue'>
                                    Book Appointment
                                </Button>
                            </Box>
                        </CardBody>
                    </Stack>
                </Card>
                <Box display={isLargerThan600 ? 'flex' : 'grid'} justifyContent={'space-between'} p={5} w={"100%"}>
                    <Heading size={'lg'}>Ratings & Reviews</Heading>
                    <Heading py='2' w={isLargerThan600 ? '30%' : '100%'} display={'flex'} alignItems={'center'} gap={2} size={'sm'} _hover={{ color: "lightblue", textDecoration: 'underline' }} onClick={() => { handleuserEligibleState() }}>Write Your Review <FaEdit /></Heading>
                </Box>
                <Box width={"100%"} p={5} mt={-5}>
                    <Flex borderRadius={10} gap={5} p={"10px 10px 10px 10px"} w={isLargerThan600 ? "13%" : "70%"} background={"yellow.600"}>
                        <Heading size={'sm'}>Rating :</Heading>
                        <Heading size={'sm'} display={'flex'} alignItems={'center'} gap={1}>{data.rating}<FaStar /></Heading>
                    </Flex>
                    {data1.map((el) => (
                        <Box border={"1px solid #511451f3"} borderRadius={5} p={5} mt={2} mb={2}>
                            <Box display={'flex'} gap={5}>
                                <Image src={el.image} w={"30px"} h={"30px"} borderRadius={"50%"} />
                                <Heading size={'md'}>{el.username}</Heading>
                            </Box>
                            <Box>
                                <Box display={'flex'} gap={5} mt={3}>
                                    <Box display={'flex'} fontSize={'xs'} alignItems={'center'} gap={1} borderRadius={5} bg={el.rating >= 3 ? "green" : "red"} padding={"0px 5px 0px 5px"}> {el.rating}<FaStar /></Box>
                                    <Text size={'sm'}>{el.title}</Text>
                                </Box>
                                <Text mt={2} textAlign={'start'} size={'md'}>{el.discription}</Text>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default DoctorDetails
