import { Box, Heading, Image, Button, Text, Grid, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import Medicines from '../pages/Medicines';
import CardSkeloten from '../Components/CardSkeloten';
import { BsArrowRightShort } from 'react-icons/bs';
const Home = () => {
    const [data, setData] = useState([]);
    const [medicineData, setMedicineData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const navigate = useNavigate();
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    const getData = () => {
        setIsLoading(true)
        axios.get(`https://renderapi-h6ct.onrender.com/doctor`).then((res) => {
            setData(res.data)
            setIsLoading(false)
        })
        axios.get(`https://renderapi-h6ct.onrender.com/medicine`).then((res) => {
            setMedicineData(res.data)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        getData()
    }, [])

    const handleApntNumber = (el) => {
        let drid = {
            "id": el.id,
            "doctorname": el.doctorname,
            "eduction": el.eduction,
            "doctorfee": el.doctorfee,
            "address": el.address,
            "appointment": el.appointment
        }
        localStorage.setItem("appointment", JSON.stringify(drid))
    }
    //console.log(data);
    return (
        <Box mt={"80px"} >
            <Box height={"auto"} display={isLargerThan600 ? "" : "grid"} justifyContent={isLargerThan600 ? "space-between" : ""} padding={isLargerThan600 ? "4rem" : "1rem"} >
                {isLargerThan600 ?
                    <Box display={'flex'} justifyContent='space-between'>
                        <Box textAlign={"start"} >
                            <Heading fontFamily={"serif"} fontSize={"60px"} mt={10} w={"100%"} >Best doctors</Heading>
                            <Heading fontFamily={"serif"} fontSize={"60px"} w={"100%"} >at the best hospitals</Heading>
                            <Heading fontFamily={"serif"} fontSize={"60px"} w={"100%"} color={'aqua'}>Search and Book now.</Heading>
                            <Link to="/doctorlist">
                                <Button
                                    _hover={{

                                        fontWeight: 'bold',
                                        bg: 'aqua',
                                        width: '250px',
                                        border: '0px solid white'
                                    }}
                                    h='45px'
                                    bg='none'
                                    color='white'
                                    border='2px solid white'
                                    fontWeight={'bold'}
                                    position={"none"} mt={5}>Book Doctor's Appointment</Button>
                            </Link>
                        </Box>
                        <Box >
                            <Image src='https://www.credihealth.com/assets/book-appointment/Book-Lab-Tests-da61c68b766479529b8b6c2fc35b3db00a0eace26b1869e727820a34c1a95119.png' />
                        </Box>
                    </Box> :
                    <Box>
                        <Box >
                            <Image src='https://www.credihealth.com/assets/book-appointment/Book-Lab-Tests-da61c68b766479529b8b6c2fc35b3db00a0eace26b1869e727820a34c1a95119.png' />
                        </Box>
                        <Box textAlign={"start"} >
                            <Heading fontFamily={"serif"} fontSize={"30px"} mt={10} w={"100%"} >Best doctors</Heading>
                            <Heading fontFamily={"serif"} fontSize={"30px"} w={"100%"} >at the best hospitals</Heading>
                            <Heading fontFamily={"serif"} fontSize={"30px"} w={"100%"} color={'aqua'}>Search and Book now.</Heading>
                            <Link to="/doctorlist">
                                <Button
                                    _hover={{

                                        fontWeight: 'bold',
                                        bg: 'aqua',
                                        width: '205px',
                                        border: '0px solid white'
                                    }}
                                    h='35px'
                                    bg='none'
                                    width='200px'
                                    color='white'
                                    border='2px solid white'
                                    fontWeight={'bold'}
                                    fontSize={'sm'}
                                    position={"none"} mt={5}>Book Doctor's Appointment</Button>
                            </Link>
                        </Box>

                    </Box>

                }
            </Box>
            <Heading mt={5} ml={isLargerThan600 ? "80px" : '20px'} size={isLargerThan600 ? 'xl' : 'md'} textAlign={"start"}>Top Doctor's of City</Heading>
            {
                isLoading ?
                    <Grid w='100%' gridTemplateColumns={isLargerThan600 ? 'repeat(4,1fr)' : 'repeat(1,1fr)'} padding={isLargerThan600 ? "20px 80px 80px 80px" : "5px"} gap={isLargerThan600 ? 5 : 1} >
                        <CardSkeloten line={6} />
                        <CardSkeloten line={6} />
                        <CardSkeloten line={6} />
                        <CardSkeloten line={6} />
                        <CardSkeloten line={6} />
                        <CardSkeloten line={6} />
                        <CardSkeloten line={6} />
                        <CardSkeloten line={6} />
                    </Grid>
                    :
                    <Box
                        display="grid"
                        gridTemplateColumns={isLargerThan600 ? 'repeat(4,1fr)' : 'repeat(1,1fr)'} padding={isLargerThan600 ? "20px 80px 80px 80px" : "15px"} gap={isLargerThan600 ? 5 : 1}
                    >
                        {data.map((el) => (
                            <Box padding={2} key={el.id}>
                                <Image
                                    _hover={{
                                        border: '2px solid white'
                                    }}
                                    borderRadius={"20px 20px 0px 0px"}
                                    src='https://i.pinimg.com/originals/56/d1/c0/56d1c032884032f4216b9bc790c00a1e.jpg'
                                    alt='Caffe Latte'
                                />
                                <Box _hover={{
                                    border: '2px solid white'
                                }} bg={'#490649f3'} color='white' border={"1px solid aqua"} borderRadius={"0px 0px 20px 20px"} padding={4}>
                                    <Heading>{el.doctorname}</Heading>
                                    <Text borderRadius={"5px"} w={"auto"}>{el.eduction}</Text>
                                    <Text>Address: {el.address}</Text>
                                    <Text display={"flex"} justifyContent={"center"}>
                                        <Text>Appointment:</Text>
                                        {el.appointment >= 10 ? <Text color={"red"}>"Not Available"</Text> : <Text color={"green.300"}>"Available"</Text>}
                                    </Text>
                                    <Text fontSize={"xl"} color={"white"} bg={"red.400"} w={"40%"} m={"auto"} borderRadius={"5px"}>Fee: ₹{el.doctorfee}/-</Text>
                                    <Link to="/bookappointment">
                                        <Button
                                            _hover={{
                                                border: '2px solid white',
                                                width: '180px',
                                                bg: 'none',
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}
                                            position={"none"}
                                            colorScheme='blue'
                                            onClick={() => { handleApntNumber(el) }}
                                            mt={5}>Book Appointment</Button>
                                    </Link>
                                </Box>
                            </Box>
                        ))}
                    </Box>}
            <Box w={"100%"} display={'flex'} justifyContent={'end'} mt={-10} >
                <Heading onClick={() => { navigate('/doctorlist') }} w={"10%"} size={'md'} display={'flex'} mr={"6%"} justifyContent={'end'} alignItems={'end'} gap={2} _hover={{ color: 'lightblue', textDecoration: 'underline' }} >Show more <BsArrowRightShort /></Heading>
            </Box>
            <Heading color={'white'} padding={isLargerThan600 ? "20px 80px 80px 80px" : "20px"} size={isLargerThan600 ? 'xl' : "md"} textAlign={"start"}>Medicine</Heading>
            {isLoading ?
                <Grid w='100%' gridTemplateColumns={isLargerThan600 ? 'repeat(4,1fr)' : 'repeat(1,1fr)'} padding={isLargerThan600 ? "20px 80px 80px 80px" : "15px"} gap={isLargerThan600 ? 5 : 1}>
                    <CardSkeloten line={6} />
                    <CardSkeloten line={6} />
                    <CardSkeloten line={6} />
                    <CardSkeloten line={6} />
                    <CardSkeloten line={6} />
                    <CardSkeloten line={6} />
                    <CardSkeloten line={6} />
                    <CardSkeloten line={6} />
                    <CardSkeloten line={6} />
                    <CardSkeloten line={6} />
                </Grid>
                :
                <Grid padding={isLargerThan600 ? "20px 80px 80px 80px" : '10px'} gap={5} gridTemplateColumns={isLargerThan600 ? 'repeat(4,1fr)' : 'repeat(1,1fr)'}>
                    {medicineData.map((el) => (
                        <Medicines
                            key={el.id}
                            medicineName={el.medicineName}
                            description={el.description}
                            id={el.id}
                            img1={el.img1}
                            img2={el.img2}
                            img3={el.img3}
                            price={el.price}
                            reviews={el.reviews}
                            stock={el.stock}
                        />
                    ))}
                </Grid>}
        </Box>
    )
}

export default Home