import { Button } from '@chakra-ui/react'
import React from 'react'

const CButton = ({ text, handleClick }) => {
    const len = '90px'
    return (
        <>
            <Button
                onClick={() => { handleClick() }}
                colorScheme={'blue'}
                _hover={{
                    border: '2px solid blue',
                    width: ` ${len}`,
                    bg: 'none',
                    color: 'black',
                    fontWeight: 'bold'
                }}>
                {text}Bttuon
            </Button>
        </>
    )

}

export default CButton