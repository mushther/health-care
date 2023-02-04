import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack } from '@chakra-ui/react'
import React from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'

const Userstatus = ({ data = [] }) => {
    return (
        <Box w={"60%"} m='auto' mt={"20px"}>
            <Heading mb={10} display='flex' gap={4} alignItems={'center'}><FaMapMarkedAlt />Your Current Booking Status</Heading>
            {data.map((el) => (
                <Box key={el.id}>
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
                            maxW={{ base: '80%', sm: '200px' }}
                            borderRadius={10}
                            src='https://i.pinimg.com/originals/bd/cc/2b/bdcc2b00e20a929d3fab83c87fda9a90.jpg'
                            alt='Caffe Latte'
                        />

                        <Stack>
                            <CardBody textAlign={"start"}>
                                <Heading size='md' color={"blue.400"}>Token No : {el.token}</Heading>
                                <Heading size='sm'>Patient Name : {el.username}</Heading>
                                <Heading size='sm'>
                                    Age: {el.age} year's
                                </Heading>
                                <Heading size='sm'>
                                    Contact Number: +91 {el.mobile}
                                </Heading>
                                <Heading size='sm'>
                                    Doctor's Name: {el.doctorname}
                                </Heading>
                                {el.status ?
                                    <Heading size='sm' color={"green"}>
                                        Doctor's Fee: ₹{el.doctorfee}/-
                                    </Heading> :
                                    <Heading size='sm' color={"red"}>
                                        Doctor's Fee: ₹{el.doctorfee}/-
                                    </Heading>
                                }
                            </CardBody>

                            <CardFooter alignItems="center">
                                <Heading size='md' marginRight={2}>Current Status : </Heading>
                                {el.status ? <Button size={"lg"} position={"none"} variant='solid' colorScheme='green'>Appointment Booked</Button> : <Button size={"lg"} position={"none"} variant='solid' colorScheme='red'>Appointment Not Book</Button>}
                            </CardFooter>
                        </Stack>
                    </Card>

                </Box>
            ))
            }
        </Box >
    )
}
export default Userstatus