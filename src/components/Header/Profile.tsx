import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align='center'>
            <Box mr='4' textAlign='right'>
                <Text>Wakenedo</Text>
                <Text color='gray.300' fontSize='small'>
                    a_nuner@outlook.com
                </Text>
            </Box>

            <Avatar size='md' name='wakenedo' src='https://avatars.githubusercontent.com/u/82479273?v=4' />
        </Flex>
    );
}