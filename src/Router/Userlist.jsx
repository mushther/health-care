import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, useMediaQuery } from '@chakra-ui/react'
import React, { useContext } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { FaCcApplePay, FaCheckSquare, FaUser } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import CardSkeloten from '../Components/CardSkeloten'
import { AuthContextProvider } from '../Context/AuthContext'

const Userlist = () => {
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const { state } = useContext(AuthContextProvider);
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const getData = () => {
        setisLoading(true)
        axios.get(`https://renderapi-h6ct.onrender.com/user`).then((res) => {
            const filtered = res.data.filter((item) => item.userId === state.userId);
            setData(filtered);
            setisLoading(false)
        })
    }
    useEffect(() => {
        getData();
    }, [])
    // console.log(data);
    return (
        <Box w='80%' display={'grid'} color={'white'} m='auto' mt={"80px"} pt={"50px"} pb={"50px"} gap={5}>
            <Heading display='flex' gap={4} alignItems={'center'}><FaUser />Appointment Booked User's List</Heading>
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
                            padding={1}
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'

                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '94%', sm: '200px' }}
                                borderRadius={10}
                                ml='10px'
                                mt='10px'
                                src='https://i.pinimg.com/originals/bd/cc/2b/bdcc2b00e20a929d3fab83c87fda9a90.jpg'
                                alt='Caffe Latte'
                            />

                            <Stack>
                                <CardBody>
                                    <Heading textAlign={"start"} size='md'>{el.username}</Heading>
                                    <Heading textAlign={"start"} size='md'>Token No: {el.token}</Heading>
                                    <Box display={isLargerThan600 ? "flex" : 'grid'} textAlign={isLargerThan600 ? '' : 'start'} gap={isLargerThan600 ? 24 : 0}>
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
                                    {el.status ? <Button position={"none"} variant='solid' colorScheme='green' gap={2}>Appointment Booked <FaCheckSquare /></Button>
                                        :
                                        <Box display={isLargerThan600 ? 'flex' : 'grid'} gap={2} w={'100%'} justifyContent={'space-between'} >
                                            <Button position={"none"} variant='solid' colorScheme='red' gap={2}> Appointment Not Book<ImCross /></Button>
                                            <Button position={"none"} variant='solid' colorScheme='blue' gap={2}>Continue to Payment <FaCcApplePay /></Button>
                                        </Box>
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