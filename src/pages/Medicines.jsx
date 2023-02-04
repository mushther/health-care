import React from 'react'
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { FaShoppingCart, FaStar } from "react-icons/fa"
import { useState } from 'react';

const Medicines = ({
    medicineName,
    description,
    img1,
    img2,
    img3,
    price,
    reviews,
    stock
}) => {
    const [data] = useState((Math.floor(reviews)))

    //console.log(data);

    return (
        <>

            <Card position={'none'} maxW='sm' color={'white'} bg={'#490649f3'}
                _hover={{
                    border: '2px solid white'
                }}>
                <CardBody>
                    <Image
                        src={img1}
                        alt='medicine img'
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{medicineName}</Heading>
                        <Text h={'60px'}>
                            {description}
                        </Text>
                        <Flex gap={2}>
                            <Text h='40px' color='white' fontWeight={'bold'} fontSize='2xl'>
                                Price:
                            </Text>
                            <Text textDecoration={'line-through'} h='40px' color='white' fontWeight={'bold'} fontSize='2xl'>
                                ₹{price + 100}
                            </Text>
                            <Text h='40px' color='white' fontWeight={'bold'} fontSize='2xl'>
                                ₹{price}/-
                            </Text>
                            <Text h='40px' color='green' fontWeight={'bold'} fontSize='md'>
                                Off {-(Math.floor((price) / ((price + 100) / 100))) + 100}%
                            </Text>
                        </Flex>

                    </Stack>
                    <Flex h={'25px'} justifyContent={'space-around'}>
                        {stock >= 4 ?
                            <Text fontWeight={'black'} bg='green' w='45%' borderRadius={5} p={"0px 10px 2px 10px"} >
                                Only Left - {stock}
                            </Text> :
                            <Text fontWeight={'black'} bg='red' w='45%' borderRadius={5} p={"0px 10px 2px 10px"} >
                                Only Left - {stock}
                            </Text>
                        }
                        <Flex w='50%' fontWeight={'black'} borderRadius={5} p={"0px 10px 2px 10px"} bg={'yellow.700'} gap={2} alignItems={'center'}>
                            Rating: {reviews}<FaStar />

                        </Flex>
                    </Flex>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='14' justifyContent={'space-around'}>
                        <Button position={'none'} _hover={{ bg: 'none', border: '2px solid white' }} variant='solid' colorScheme='blue'>
                            Buy now
                        </Button>
                        <Button gap={1} position={'none'} _hover={{ bg: 'none', border: '2px solid white', color: 'white' }} variant='outline' colorScheme='blue'>
                            <FaShoppingCart />
                            Add to cart
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    )
}

export default Medicines