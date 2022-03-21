import { Button } from "@chakra-ui/react";

interface PaginationProps {
    number: number;
    isCurrent?: boolean;
}


export function PaginationItem({
    isCurrent = false,
    number
}: PaginationProps) {
    if (isCurrent) {
        return (
            <Button
                size='sm'
                fontSize='xs'
                width='14'
                colorScheme='pink'
                disabled
                _disabled={{
                    bg: 'pink.500',
                    cursor: 'default',
                }}
            >
                {number}
            </Button>
        )
    }
    return (
        <Button
            size='sm'
            fontSize='xs'
            width='4'
            bg='gray.700'
            _hover={{
                bg: 'gray.500',
                cursor: 'default',
            }}
        >
            {number}
        </Button>
    )
} 