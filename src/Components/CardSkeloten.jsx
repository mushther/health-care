import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const CardSkeloten = ({ line }) => {
    return (
        <Box padding='6' boxShadow='lg' bg='none' borderRadius={7} border={"1px solid whitw"} >
            <SkeletonCircle position={'none'} size='10' />
            <SkeletonText position={'none'} mt='4' noOfLines={line} spacing='4' skeletonHeight='2' />
        </Box>
    )
}

export default CardSkeloten