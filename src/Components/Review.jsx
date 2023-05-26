import { Box, Button, Flex, Heading, Image, Input, Text, Textarea } from '@chakra-ui/react'
import { logDOM } from '@testing-library/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import { IoMdSend } from 'react-icons/io'
import { AuthContextProvider } from '../Context/AuthContext'

const Review = () => {
    const [data] = useState(JSON.parse(localStorage.getItem("appointment")));
    const { picProfile, state } = useContext(AuthContextProvider);
    const [star, setStar] = useState({
        star1: "",
        star2: "",
        star3: "",
        star4: "",
        star5: ""
    });
    const [starVlaue, setStarValue] = useState(0);
    const [reviewData, setReviewData] = useState({
        title: "",
        discription: "",
        rating: "",
        username: state.name,
        image: picProfile
    });
    console.log(reviewData);

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
        setReviewData({ ...reviewData, [e.target.name]: e.target.value, rating: starVlaue })
    }
    const postReview = () => {
        axios.post(`https://renderapi-h6ct.onrender.com/doctor`,)
    }




    return (
        <Box m='auto' mt={"80px"} pt={"50px"} pb={"50px"} w='80%' display={'grid'} gap={5}>
            <Box display={'flex'} justifyContent={'space-between'} gap={10} border={'1px solid white'} p={5} borderRadius={5}>
                <Box>
                    <Text fontWeight={'bold'} textAlign={'start'}>{data.doctorname}</Text>
                    <Text fontWeight={'bold'} textAlign={'start'} py='2'>{data.eduction}</Text>
                    <Text fontWeight={'bold'} textAlign={'start'} py='2'> Address: {data.address}</Text>
                </Box>

                <Image src='https://i.pinimg.com/originals/56/d1/c0/56d1c032884032f4216b9bc790c00a1e.jpg' borderRadius={"50%"} width={"100px"} height={"100px"} />
            </Box>
            <Box w={"100%"} display={'flex'} flexDirection={'column'} m='auto' height={"auto"} border={'1px solid white'} p={5} borderRadius={5}>
                <Heading size={'md'} textAlign={'start'} ml={4}>Write your review</Heading>
                <Flex width={"100%"} alignItems={'center'} ml={4} mt={5} mb={3} fontSize={'3xl'}>
                    <Text onClick={(e) => { starRating(1) }}>{star.star1 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                    <Text onClick={(e) => { starRating(2) }}>{star.star2 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                    <Text onClick={(e) => { starRating(3) }}>{star.star3 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                    <Text onClick={(e) => { starRating(4) }}>{star.star4 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                    <Text onClick={(e) => { starRating(5) }}>{star.star5 === "yes" ? <AiTwotoneStar /> : <AiOutlineStar />}</Text>
                    <Text fontWeight={'bold'} fontSize={'md'} ml={5} color={starVlaue <= 2 ? "red" : "green"}>
                        {starVlaue === 1 && "Very Bad" || starVlaue === 2 && "Bad" || starVlaue === 3 && "Good" || starVlaue === 4 && "Very Good" || starVlaue === 5 && "Excellent"}
                    </Text>
                </Flex>
                <Input name='title' value={reviewData.title} onChange={(e) => { postReviewOnChnage(e) }} placeholder='Write Review Title' width={"100%"} border={'none'} />
                <Textarea name='discription' value={reviewData.discription} onChange={(e) => { postReviewOnChnage(e) }} placeholder='Description...' width={"100%"} border={'none'} mt={5} mb={5} />
                <Flex justifyContent={'end'}><Button width={"10%"} colorScheme='facebook' gap={2}>Send<IoMdSend /></Button></Flex>
            </Box>
        </Box>
    )
}

export default Review

