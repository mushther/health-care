import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { FaCcApplePay, FaUser } from 'react-icons/fa'
import CardSkeloten from '../Components/CardSkeloten'

const Userlist = () => {
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const getData = () => {
        setisLoading(true)
        axios.get(`https://doctor-appointment-seven.vercel.app/user`).then((res) => {
            setData(res.data);
            setisLoading(false)
        })
    }
    useEffect(() => {
        getData();
    }, [])
    // console.log(data);
    return (
        <Box color={'white'} m='auto' mt={"80px"} pt={"50px"} pb={"50px"} w='80%' display={'grid'} gap={5}>
            <Heading display='flex' gap={4} alignItems={'center'}><FaUser /> User's List</Heading>
            {isLoading ? <Box>
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
                <CardSkeloten line={4} />
            </Box>
                :
                data.map((el) => (
                    <Box key={el.id}>
                        <Card
                            position={"none"}
                            color={'white'}
                            padding={5}
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '80%', sm: '200px' }}
                                borderRadius={10}
                                src='https://i.pinimg.com/originals/bd/cc/2b/bdcc2b00e20a929d3fab83c87fda9a90.jpg'
                                alt='Caffe Latte'
                            />

                            <Stack>
                                <CardBody>
                                    <Heading textAlign={"start"} size='md'>{el.username}</Heading>
                                    <Heading textAlign={"start"} size='md'>Token No: {el.token}</Heading>
                                    <Box display={"flex"} gap={24}>
                                        <Text py='2'>
                                            Age: {el.age}
                                        </Text>
                                        <Text py='2'>
                                            Contact Number: {el.mobile}
                                        </Text>

                                        <Text py='2'>
                                            Description:  {el.description}
                                        </Text>
                                    </Box>
                                </CardBody>

                                <CardFooter>
                                    {el.status ? <Button position={"none"} variant='solid' colorScheme='green'>Appointment Booked</Button>
                                        :
                                        <Flex w={'100%'} justifyContent={'space-between'} >
                                            <Button position={"none"} variant='solid' colorScheme='red'>Appointment Not Book</Button>
                                            <Button position={"none"} variant='solid' colorScheme='blue' gap={2}>Continue to Payment <FaCcApplePay /></Button>
                                        </Flex>
                                    }
                                </CardFooter>
                            </Stack>
                        </Card>
                    </Box>
                ))}
        </Box>
    )
}

export default Userlist