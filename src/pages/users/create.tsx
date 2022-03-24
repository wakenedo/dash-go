import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Link from "next/link";
import { Input } from "../../components/Form/input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('E-mail is required').email('Invalid E-mail'),
    password: yup.string().required('Password is required').min(6, 'Password need at least 6 characters'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'Password must match')
})

export default function CreateUser() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const { errors } = formState

    const handleCreateUser: SubmitHandler<CreateUserFormData> = (data) => {

        console.log(data)
    }


    return (
        <Box>
            <Header />
            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />
                <Box
                    as='form'
                    flex='1'
                    borderRadius={8}
                    bg='gray.800'
                    p={['6', '8']}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size='lg' fontWeight='normal'>Create User</Heading>
                    <Divider my='6' borderColor='gray.700' />

                    <VStack spacing='8'>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input
                                name='name'
                                label='Full Name'
                                error={errors.name}
                                {...register('name')}
                            />
                            <Input
                                name='email'
                                ref='email'
                                label='E-mail'
                                error={errors.email}
                                {...register('email')}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input
                                name='password'
                                ref='password'
                                label='Password'
                                error={errors.password}
                                {...register('password')}
                            />
                            <Input
                                name='password_confirmation'
                                ref='password'
                                label='Confirm your Password'
                                error={errors.password_confirmation}
                                {...register('password_confirmation')}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt='8' justify='flex-end'>
                        <HStack spacing='4'>
                            <Link href='/users' passHref>
                                <Button as='a' colorScheme='whiteAlpha'>Cancel</Button>
                            </Link>
                            <Button
                                type='submit'
                                colorScheme='pink'
                                isLoading={formState.isSubmitting}
                            >
                                Save
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}