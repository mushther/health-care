import { Box, Button, FormControl, FormLabel, Heading, Input, useMediaQuery } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CardSkeloten from '../Components/CardSkeloten';
import Userstatus from './Userstatus';
// FormHelperText,
const Status = () => {
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [flag, setFlag] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    //console.log(value);
    const checkStatus = async (e) => {
        setIsLoading(true)
        // e.preventDefault()
        return await axios.get(`https://renderapi-h6ct.onrender.com/user`).then((res) => {
            setValue("");
            setIsLoading(false);
            const statusData = res.data.find((el) => el.mobile == value || el.token == value)
            setData(statusData);
            console.log(statusData);
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }
    const handleSubmit = () => {
        checkStatus()
        setFlag(false);
    }
    return (
        <Box w={"80%"} pb={"495px"} pt={"65px"} m={"auto"} mt={"80px"} textAlign='center'>
            {flag ?
                <FormControl position={"none"}>
                    <Heading mb={10} display='flex' gap={4} alignItems={'center'}><FaMapMarkedAlt /> Check Your Booking Status</Heading>

                    <FormLabel>Token/Mobile Number</FormLabel>
                    <Input
                        position={"none"}
                        placeholder=' Enter Your Token/Mobile Number'
                        type='text'
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {value <= +(9) ? <Button
                        disabled={true}
                        position={"none"}
                        onClick={handleSubmit}
                        display={"block"}
                        margin={"none"}
                        marginTop={"15px"}
                        colorScheme={"blue"}
                    >Check Status</Button> :
                        <Button
                            position={"none"}
                            disabled={false}
                            onClick={handleSubmit}
                            display={"block"}
                            margin={"none"}
                            marginTop={"15px"}
                            colorScheme={"blue"}
                        >Check Status</Button>}
                </FormControl> :
                <Box>
                    {isLoading ?
                        <CardSkeloten w='50%' line={4} />

                        :
                        <Box>
                            <Userstatus
                                data={data}
                            />
                            <Link to="/status">
                                <Button w={100} colorScheme={'blue'} mt='20px' onClick={() => { setFlag(true) }}> Back </Button>
                            </Link>
                        </Box>}
                </Box>
            }
        </Box>
    )
}

export default Status