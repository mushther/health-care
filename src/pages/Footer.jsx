import { Box, Button, Center, Divider, Flex, FormControl, FormLabel, Grid, Heading, Image, Input, Text, Textarea, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import FooterText from './FooterText'
import Logo from '../Data/logo/health_care.png'
import { FaMap, FaPhone, FaWhatsapp } from 'react-icons/fa'
import { CiMail } from 'react-icons/ci'

const Footer = () => {
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

    return (
        <Box bg='#282c34' color={'white'} gap="10px"
            padding={isLargerThan600 ? "20px 80px 20px 80px" : "15px"}>
            <Heading><Image w={isLargerThan600 ? "200px" : "100px"} src={Logo} /></Heading>
            <Grid gridTemplateColumns={isLargerThan600 ? 'repeat(9,1fr)' : 'repeat(3,1fr)'} justifyContent={'space-between'} gap={1} alignItems='start' >
                <Flex flexDirection={'column'} textAlign='start'>
                    <Heading size={'sm'} mb='5px'>HealthCare</Heading>
                    <FooterText text={'About Us'} />
                    <FooterText text={'Contact Us'} />
                    <FooterText text={'Refer & Earn'} />
                    <FooterText text={'Loyalty Program'} />
                    <FooterText text={'Blogs, Videos & More'} />
                    <FooterText text={'Brand Directory'} />
                    <FooterText text={'Authenticity Guaranteed'} />
                    <FooterText text={'Carees'} />
                </Flex>
                <Center height='200px' >
                    <Divider bg={'black'} orientation='vertical' />
                </Center>
                <Flex flexDirection={'column'} textAlign='start'>
                    <Heading size={'sm'} mb='5px'>Brands</Heading>
                    <FooterText text={'MuscleBlaze'} />
                    <FooterText text={'Fit Foods'} />
                    <FooterText text={'HK Vitals'} />
                    <FooterText text={'TrueBasics'} />
                    <FooterText text={'Gritzo'} />
                    <FooterText text={'bGREEN'} />
                </Flex>
                {isLargerThan600 ? <Center height='200px'>
                    <Divider orientation='vertical' color={'black'} />
                </Center> : ''}
                <Flex flexDirection={'column'} textAlign='start'>
                    <Heading size={'sm'} mb='5px'>Health & Fitness</Heading>
                    <FooterText text={'Bodybuilding'} />
                    <FooterText text={'Hair & Skin Care'} />
                    <FooterText text={'Sports Nutrition'} />
                    <FooterText text={'Vitamins & Supplements'} />
                    <FooterText text={'Ayurveda & Herbs'} />
                    <FooterText text={'Health Food & Drinks'} />
                    <FooterText text={'Fitness'} />
                    <FooterText text={'Wellness'} />
                </Flex>
                <Center height='200px'>
                    <Divider orientation='vertical' color={'black'} />
                </Center>
                <Flex flexDirection={'column'} textAlign='start'>
                    <Heading size={'xl'} mb='10px'>Contact us</Heading>
                    <Heading display={'flex'} gap={2} size={'sm'} mb='5px'><FaPhone />  +91 8859 968 856</Heading>
                    <Heading display={'flex'} gap={2} size={'sm'} mb='5px'><FaWhatsapp />  +91 8859 968 856</Heading>
                    <Heading display={'flex'} gap={2} size={'sm'} mb='5px'><CiMail />  heathcare@gmial.com</Heading>
                    <Heading display={'flex'} gap={2} size={'sm'} mb='5px'><FaMap />  Headquater Adress Mumbai</Heading>

                </Flex>
                {isLargerThan600 ? <Center height='200px'>
                    <Divider orientation='vertical' color={'black'} />
                </Center> : ''}
                <Flex flexDirection={'column'} textAlign='start'>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder={"Enter Name"} />
                        <FormLabel>Email</FormLabel>
                        <Input placeholder={"Enter Email"} />
                        <FormLabel>Message</FormLabel>
                        <Textarea placeholder={"Text Message"} />
                        <Button _hover={{
                            bg: 'none',
                            border: '2px solid white'
                        }} mt='10px' colorScheme={'blue'}>Send Message</Button>
                    </FormControl>

                </Flex>
            </Grid >
            <br />
            <br />
            <Divider color={'black'} />
            <Flex justifyContent={'space-between'}>
                <Text>Copyright © 2023, HealthCare.com, or its affiliates</Text>
                <Text>Terms & Conditions Delivery Policy Privacy Policy Disclaimer Returns Policy</Text>
            </Flex >

        </Box>
    )
}

export default Footer