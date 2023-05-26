
import React, { useState } from 'react'
import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Stack, useMediaQuery, } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { TbListDetails } from 'react-icons/tb'
import { FaStar } from 'react-icons/fa'

import React from 'react'

const DoctorDetails = () => {
    const [data] = useState(JSON.parse(localStorage.getItem("appointment")))
    const navigate = useNavigate();
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    return (
        <Box m='auto' mt={"80px"} pt={"50px"} pb={"50px"} w='80%' display={'grid'} gap={5}>
            <Heading display='flex' gap={4} alignItems={'center'}> <TbListDetails /> Doctor Details</Heading>
            <Box>

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
                        maxW={{ base: '100%', sm: '300px' }}
                        borderRadius={10}
                        height={"300px"}
                        src='https://i.pinimg.com/originals/56/d1/c0/56d1c032884032f4216b9bc790c00a1e.jpg'
                        alt='Caffe Latte'
                    />

                    <Stack position={"none"}>
                        <CardBody>
                            <Heading textAlign={"start"} size='xl'>{data.doctorname}</Heading>
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
                                <Flex py='2' borderRadius={10} gap={5} p={"4px 5px 5px 10px"} w={"60%"} background={"yellow.600"}>
                                    <Heading size={'sm'}>Rating :</Heading>
                                    <Heading size={'sm'} display={'flex'} alignItems={'center'} gap={1}>{data.rating}<FaStar /></Heading>
                                </Flex>
                                <Heading py='2' size={'sm'} _hover={{ color: "lightblue", textDecoration: 'underline' }} onClick={() => { navigate('/review') }}>Write Your Review</Heading>
                            </Box>
                        </CardBody>

                        <CardFooter>
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
                                onClick={() => { navigate("/bookappointment") }} colorScheme='blue'>
                                Book Appointment
                            </Button>
                        </CardFooter>
                    </Stack>
                </Card>
            </Box>
        </Box>
    )
}

export default DoctorDetails
