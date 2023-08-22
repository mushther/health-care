import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { FaCcApplePay, FaCheckSquare, FaMapMarkedAlt } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

const Userstatus = ({ data = [] }) => {
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

    return (
        <Box w={isLargerThan600 ? "60%" : '100%'} m='auto' mt={"20px"}>
            <Heading mb={10} display={'flex'} gap={4} alignItems={'center'} size={isLargerThan600 ? "lg" : "md"}><FaMapMarkedAlt /><span>Your Booking Status</span></Heading>
            <Box >
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
                        src='https://i.pinimg.com/originals/bd/cc/2b/bdcc2b00e20a929d3fab83c87fda9a90.jpg'
                        alt='Caffe Latte'
                    />

                    <Stack>
                        <CardBody textAlign={"start"}>
                            <Heading size='md' color={"blue.400"}>Token No : {data.token}</Heading>
                            <Heading size='sm'>Patient Name : {data.username}</Heading>
                            <Heading size='sm'>
                                Age: {data.age} year's
                            </Heading>
                            <Heading size='sm'>
                                Contact Number: +91 {data.mobile}
                            </Heading>
                            <Heading size='sm'>
                                Doctor's Name: {data.doctorname}
                            </Heading>
                            {data.status ?
                                <Heading size='sm' color={"green"}>
                                    Doctor's Fee: ₹{data.doctorfee}/-
                                </Heading> :
                                <Heading size='sm' color={"red"}>
                                    Doctor's Fee: ₹{data.doctorfee}/-
                                </Heading>
                            }
                        </CardBody>

                        <CardFooter alignItems="center" display={isLargerThan600 ? 'flex' : 'grid'} gap={2}>
                            <Heading size='md' marginRight={2}>Current Status : </Heading>
                            {data.status ? <Button size={"lg"} position={"none"} variant='solid' colorScheme='green' gap={2}>Appointment Booked <FaCheckSquare /></Button> :
                                <Box display={isLargerThan600 ? 'flex' : 'grid'} gap={2}>
                                    <Button size={"lg"} position={"none"} variant='solid' colorScheme='red' gap={2}>Appointment Not Book <ImCross /></Button>
                                    <Button position={"none"} variant='solid' colorScheme='blue' gap={2}>Continue to Payment <FaCcApplePay /></Button>
                                </Box>
                            }
                        </CardFooter>
                    </Stack>
                </Card>

            </Box>

        </Box >
    )
}
export default Userstatus