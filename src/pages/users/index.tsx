import Link from "next/link";
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useQuery } from "react-query";




export default function UserList() {
    const { data, isLoading, error } = useQuery('users', async () => {
        const response = await fetch('api/users')
        const data = response

        console.log(data)
        return data
    })


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })



    return (
        <Box>
            <Header />
            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />
                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>Users</Heading>

                        <Link href='/users/create' passHref>
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='pink'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                            >
                                Create New User
                            </Button>
                        </Link>
                    </Flex>
                    {isLoading ? (
                        <Flex justify='center' >
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify='center'>
                            <Text>Fail to obtain data from users</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme='whiteAlpha'>
                                <Thead>
                                    <Tr>
                                        <Th px={['4', '4', '6']} color='gray.300' width='8'>
                                            <Checkbox colorScheme='pink' />
                                        </Th>
                                        <Th>User</Th>
                                        {isWideVersion && <Th>Registered At</Th>}
                                        <Th width='8'></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td px={['4', '4', '6']}>
                                            <Checkbox colorScheme='pink' />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Text fontWeight='bold'>Wakenedo</Text>
                                                <Text fontSize='small' color='gray.300'>a_nuner@outlook.com</Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion ? <Td>april 04 2022</Td> : ' '}

                                        {isWideVersion ?
                                            <Td>
                                                <Button
                                                    as='a'
                                                    size='sm'
                                                    fontSize='sm'
                                                    colorScheme='purple'
                                                    leftIcon={<Icon as={RiPencilLine} fontSize='16' />}
                                                >
                                                    Edit
                                                </Button>
                                            </Td>
                                            :
                                            <Td>
                                                <Button
                                                    as='a'
                                                    size='sm'
                                                    fontSize='sm'
                                                    colorScheme='purple'
                                                >
                                                    <Icon as={RiPencilLine} fontSize='16' />
                                                </Button>
                                            </Td>
                                        }
                                    </Tr>
                                </Tbody>
                            </Table>
                            <Pagination />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}