import { Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

const FooterText = ({ text }) => {

    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

    return (
        <Text size={isLargerThan600 ? "" : 'xs'} _hover={{ color: '#2c022cf3' }}>{text}</Text>
    )
}

export default FooterText