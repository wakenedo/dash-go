import { Text } from "@chakra-ui/react";

export function Logo() {
    return (
        <Text fontSize='3xl' fontWeight='bold' letterSpacing='tight' w='64'>
            Dash-Go
            <Text as='span' ml='1' color='pink.500'>.</Text>
        </Text>
    )
}