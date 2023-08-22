import { Box, Button, Flex, Heading, Image, Input, Text, Textarea, useMediaQuery } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import { IoMdSend } from 'react-icons/io'
import { AuthContextProvider } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Review = () => {
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const [data] = useState(JSON.parse(localStorage.getItem("appointment")));
    const { picProfile, state } = useContext(AuthContextProvider);
    const [data1, setData1] = useState([]);
    const [id9, setId9] = useState(0);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [star, setStar] = useState({
        star1: "",
        star2: "",
        star3: "",
        star4: "",
        star5: ""
    });
    const [starVlaue, setStarValue] = useState(0);
    const [reviewData, setReviewData] = useState({
        id: "",
        title: "",
        discription: "",
        rating: "",
        username: state.name,
        image: picProfile,
    });
    /*window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });*/
    //console.log(id9)
    //console.log(data1)
    const getData = () => {
        axios.get(`https://renderapi-h6ct.onrender.com/doctor`).then((res) => {
            //setData1(res.data);
            setData1(res.data[data.id].review);
            setId9(res.data[data.id].review.length + 1)
        })
    }
    useEffect(() => {
        getData();
    }, [])

    const starRating = (value) => {
        setStarValue(value);
        if (value === 1) {
            setStar({ ...star, star1: "yes", star2: "", star3: "", star4: "", star5: "" })
        } else if (value === 2) {
            setStar({ ...star, star1: "yes", star2: "yes", star3: "", star4: "", star5: "" })
        } else if (value === 3) {
            setStar({ ...star, star1: "yes", star2: "yes", star3: "yes", star4: "", star5: "" })
        } else if (value === 4) {
            setStar({ ...star, star1: "yes", star2: "yes", star3: "yes", star4: "yes", star5: "" })
        } else if (value === 5) {
            setStar({ ...star, star1: "yes", star2: "yes", star3: "yes", star4: "yes", star5: "yes" })
        }
    }

    const postReviewOnChnage = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value, rating: starVlaue, id: id9 })
    }
    const postReview = (id) => {
        setIsLoading(true)
        data1.push(reviewData)
        //console.log(data1);
        // console.log(id);
        axios.patch(`https://renderapi-h6ct.onrender.com/doctor/${id}`, { review: data1 },).then((res) => {
            setIsLoading(false)
            navigate("/doctorDetails")
            getData();
        })
    }

    return (
        <Box m='auto' mt={"80px"} pt={"50px"} pb={"50px"} w='80%' display={'grid'} gap={5}>
            <Box display={'flex'} flexDirection={isLargerThan600 ? 'row' : 'column'} justifyContent={'space-between'} gap={10} border={'1px solid white'} p={5} borderRadius={5}>
                <Box>
                    <Heading fontWeight={'bold'} fontSize={'2xl'} textAlign={'start'}>{data.doctorname}</Heading>
                    <Text fontWeight={'bold'} textAlign={'start'} py={isLargerThan600 ? '2' : '0'}>{data.eduction}</Text>
                    <Text fontWeight={'bold'} textAlign={'start'} py={isLargerThan600 ? '2' : '0'}> Address: {data.address}</Text>
                </Box>

                <Image src='https://i.pinimg.com/originals/56/d1/c0/56d1c032884032f4216b9bc790c00a1e.jpg' borderRadius={"50%"} width={"100px"} height={"100px"} />
            </Box>
            <Box w={"100%"} display={'flex'} flexDirection={'column'} m='auto' height={"auto"} border={'1px solid white'} p={5} borderRadius={5}>
                <Heading size={'md'} textAlign={'start'} ml={4}>Write your review</Heading>
                <Box display={'flex'} gap={5} mt={4} ml={4}>
                    <Image src={picProfile} w={"50px"} h={"50px"} borderRadius={"50%"} />
                    <Box>
                        <Heading size={'md'}>{state.name}</Heading>
                        <Text color={'blue.300'} textAlign={'start'} size={'xs'}>{state.userId}</Text>
                    </Box>
                </Box>
                <Box display={isLargerThan600 ? 'flex' : 'grid'} width={"100%"} justifyContent={isLargerThan600 ? null : 'start'} alignItems={'center'} ml={4} mt={5} mb={3} fontSize={'3xl'}>
                    <Flex>
                        <Text onClick={(e) => { starRating(1) }}>{star.star1 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                        <Text onClick={(e) => { starRating(2) }}>{star.star2 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                        <Text onClick={(e) => { starRating(3) }}>{star.star3 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                        <Text onClick={(e) => { starRating(4) }}>{star.star4 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                        <Text onClick={(e) => { starRating(5) }}>{star.star5 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                    </Flex>
                    <Text fontWeight={'bold'} fontSize={'md'} ml={isLargerThan600 ? 5 : "-5"} color={starVlaue <= 2 ? "red" : "green"}>
                        {starVlaue === 1 && "Very Bad" || starVlaue === 2 && "Bad" || starVlaue === 3 && "Good" || starVlaue === 4 && "Very Good" || starVlaue === 5 && "Excellent"}
                    </Text>
                </Box>
                <Input name='title' value={reviewData.title} onChange={(e) => { postReviewOnChnage(e) }} placeholder='Write Review Title' width={"100%"} border={'none'} />
                <Textarea name='discription' value={reviewData.discription} onChange={(e) => { postReviewOnChnage(e) }} placeholder='Description...' width={"100%"} border={'none'} mt={5} mb={5} />
                <Flex justifyContent={'end'}><Button isLoading={isLoading} width={isLargerThan600 ? "10%" : "50%"} colorScheme='facebook' gap={2} onClick={() => { postReview(data.id) }}>Send<IoMdSend /></Button></Flex>
            </Box>
        </Box>
    )
}

export default Review

