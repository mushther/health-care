import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text, useMediaQuery } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { FaListAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import CardSkeloten from '../Components/CardSkeloten';

const DoctorList = () => {
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const [page, setPage] = useState(1)
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    //https://doctor-appointment-seven.vercel.app/
    //console.log(data);
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    const getData = () => {

        setIsLoading(true)
        axios.get(`https://renderapi-h6ct.onrender.com/doctor?_page=${page}&_limit=4`).then((res) => {
            setData(res.data)
            setIsLoading(false);
        })
    }
    useEffect(() => {
        getData()

    }, [page])
    //console.log(data);
    const handleApntNumber = (el) => {
        let drid = {
            "id": el.id,
            "doctorname": el.doctorname,
            "eduction": el.eduction,
            "doctorfee": el.doctorfee,
            "address": el.address,
            "appointment": el.appointment,
            "rating": el.rating,
            "doctorUserId": el.doctorUserId
        }
        localStorage.setItem("appointment", JSON.stringify(drid))
    }
    const cardHandle = (el) => {
        handleApntNumber(el)
        navigate('/doctorDetails')
    }
    return (
        <Box m='auto' mt={"80px"} pt={"50px"} pb={"50px"} w='80%' display={'grid'} gap={5}>
            <Heading display='flex' gap={4} alignItems={'center'}><FaListAlt /> Doctor's List</Heading>
            {isLoading ? <Box>
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
            </Box>
                :
                data.map((el) => (
                    <Box key={el.id} onClick={() => { cardHandle(el) }}>
                        <Card
                            position={"none"}
                            padding={5}
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                            color={'white'}

                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                                borderRadius={10}
                                src='https://i.pinimg.com/originals/56/d1/c0/56d1c032884032f4216b9bc790c00a1e.jpg'
                                alt='Caffe Latte'
                            />

                            <Stack position={"none"}>
                                <CardBody>
                                    <Heading textAlign={"start"} size='md'>{el.doctorname}</Heading>
                                    <Box display={isLargerThan600 ? 'flex' : 'grid'} textAlign='start' gap={isLargerThan600 ? 24 : 0}>
                                        <Text py='2'>
                                            {el.eduction}
                                        </Text>
                                        <Text py='2'>
                                            Address: {el.address}
                                        </Text>
                                        <Text py='2'>
                                            Fee: ₹ {el.doctorfee}/-
                                        </Text>
                                        <Text py='2'>
                                            Total Book Appointment:  {el.appointment}
                                        </Text>
                                    </Box>
                                </CardBody>

                                <CardFooter>
                                    <Link to='/bookappointment'>
                                        <Button
                                            _hover={{
                                                border: '2px solid white',
                                                width: '190px',
                                                height: '45px',
                                                bg: 'none',
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}
                                            marginRight={1}
                                            bg='aqua'
                                            color={'black'}
                                            fontWeight={'bold'}
                                            fontSize={17}
                                            position={"none"}
                                            variant='solid'
                                            onClick={() => { handleApntNumber(el) }} colorScheme='blue'>
                                            Book Appointment
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Stack>
                        </Card>
                    </Box>
                ))}
            <Flex gap={2} justifyContent={'center'}>
                <Button disabled={page == 1} onClick={() => { setPage(page - 1) }} colorScheme='facebook'>Prev</Button>
                <Button colorScheme='facebook'>{page}</Button>
                <Button onClick={() => { setPage(page + 1) }} disabled={page == 3} colorScheme='facebook'>Next</Button>
            </Flex>
        </Box>
    )
}

export default DoctorList
/*
address: "Colony No.4 New Patna"
appointment: 0
doctorfee: "400"
doctorname: "Dr Lalu Baba"
eduction: "MBBS BHMD SDDL from Ukrain"
id:1
**/