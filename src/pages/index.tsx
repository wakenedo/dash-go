import { Flex, Button, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/Form/input'

//flex = div in ChakraUI context

type SignInFormData = {
  email: string,
  password: string,
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail is required').email('Invalid E-mail'),
  password: yup.string().required('Password is required')
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })


  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(data)
  }


  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>
          <Input
            type='email'
            name='email'
            label='E-mail'
            {...register('email')}
            error={errors.email}
          />
          <Input
            type='password'
            name='password'
            label='Password'
            error={errors.password}
            {...register('password')}

          />

        </Stack>

        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
