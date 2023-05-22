import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Image, Input, Stack, Text, useMediaQuery, useToast } from '@chakra-ui/react'

import React, { useContext, useEffect, useState } from 'react'
import { AuthContextProvider } from '../Context/AuthContext'
import axios from 'axios'
import { FaEdit, FaSave, FaUser } from 'react-icons/fa'

const Profile = () => {
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const { state } = useContext(AuthContextProvider);
    const [data1, setData1] = useState([]);
    const [edit, setEdit] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        axios.get(`https://renderapi-h6ct.onrender.com/loginData`).then((res) => {
            const loginD = res.data.find((el) => el.userId == state.userId)
            setData1(loginD);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const hnadleChangeEdit = (e) => {
        setData1({ ...data1, [e.target.name]: e.target.value })
    }
    const handleSaveChangeEdit = () => {
        setIsLoading(true);
        axios.patch(`https://renderapi-h6ct.onrender.com/loginData/${data1.id}`, data1).then((res) => {
            toast({
                title: 'Update Successfully.',
                description: "We've update your account for you.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            setEdit("")
            setIsLoading(true);

        }).catch((err) => {
            toast({
                title: 'Not update Successfully.',
                description: "Sorry We've not update your account.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            console.log(err);
        })

    }
    const handleImage = async (event) => {
        try {
            const file = event.target.files[0];
            const form = new FormData();
            form.append('image', file);

            const res = await axios.post(
                'https://api.imgbb.com/1/upload?key=292bb16f0eac608f96dca44606b64c4c',
                form
            );
            toast({
                title: 'Photo uploaded.',
                description: "We've uploaded your photo.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            const data = res.data;
            //console.log('data:', data);
            const imageUrl = data.data.image.url;
            setData1({ ...data1, "image": imageUrl })
            //console.log(imageUrl);
        } catch (err) {
            console.log('err:', err);
        }
    }
    return (
        <Box w='80%' color={'white'} m='auto' mt={"80px"} p={"120px"} gap={5}>
            <Heading display='flex' pb={5} gap={4} alignItems={'center'}><FaUser /> Your Profile Details</Heading>
            <Card
                position={"none"}
                color={'white'}
                padding={10}
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'

            >
                <Box>

                    {data1.image === "" ? <Image
                        objectFit='cover'
                        //maxW={{ base: '94%', sm: '200px' }}
                        w={"86%"}
                        border={'2px solid white'}
                        borderRadius={100}
                        ml='10px'
                        mt='10px'
                        src='https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg'
                        alt='profile icon'
                    /> :
                        <Image
                            objectFit='cover'
                            maxW={{ base: '94%', sm: '200px' }}
                            border={'2px solid white'}
                            borderRadius={100}
                            ml='10px'
                            mt='10px'
                            src={data1.image}
                            alt='profile icon'
                        />}
                    {
                        edit === "" ? <Text display={'flex'} alignItems={'end'} ><FaEdit /></Text> :
                            <Input display={'flex'} alignItems={'end'} type='file' id="image" onChange={handleImage} />

                    }
                </Box>
                <Stack w={"100%"}>
                    <Text display={'flex'} w={"100%"} justifyContent={'end'} alignItems={'end'} >
                        {edit === "" ?
                            <Button size={'xs'} colorScheme='blue' gap={2} onClick={(e) => { setEdit("Edit") }}>Edit Profile<FaEdit /></Button>
                            : <Button isLoading={isLoading} size={'xs'} colorScheme='blue' gap={2} onClick={(e) => { handleSaveChangeEdit() }}>Save Profile<FaSave /></Button>}
                    </Text>
                    <CardBody w={"100%"} p={1} pl={10}>
                        {edit === "" ?
                            <Box>
                                <Heading pb={4} textAlign={"start"} size='lg'>{data1.name}</Heading>
                                <Heading display={'flex'} pb={5} justifyContent={'space-between'} textAlign={"start"} size='md'> User ID: {data1.userId}</Heading>
                                <Heading display={'flex'} pb={2} justifyContent={'space-between'} textAlign={"start"} size='sm'> Email Id: {data1.email}</Heading>
                                <Heading display={'flex'} pb={2} justifyContent={'space-between'} textAlign={"start"} size='sm'> Contact Number: {data1.mobile} </Heading>
                            </Box>
                            :
                            <Box>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input name='name' value={data1.name} onChange={(e) => { hnadleChangeEdit(e) }} size='lg' />
                                    <FormLabel>User ID</FormLabel>
                                    <Input name='userId' value={data1.userId} onChange={(e) => { hnadleChangeEdit(e) }} size='md' />
                                    <FormLabel>Mobile No</FormLabel>
                                    <Input name='mobile' value={data1.mobile} onChange={(e) => { hnadleChangeEdit(e) }} size='sm' />
                                </FormControl>
                            </Box>
                        }
                    </CardBody>
                </Stack>
            </Card>
        </Box>
    )
}
export default Profile
