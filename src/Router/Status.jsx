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

    console.log(value);
    const checkStatus = async (e) => {
        // e.preventDefault()
        return await axios.get(`https://doctor-appointment-seven.vercel.app/user?q=${value}`).then((res) => {
            setData(res);
            setValue("");
            setIsLoading(false)
            // console.log(data);
        }).catch((err) =>
            console.log(err)
        )
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
                        value={value}
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
                                data={data && data?.data}
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