import { useState } from 'react'
import Link from 'next/link'
import { AccountCircle, Email, Lock } from '@styled-icons/material-outlined'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { FormLink, FormWrapper } from 'components/Form'
import TextField from 'components/TextField'
import Button from 'components/Button'
import { useMutation } from '@apollo/client'
import { MUTATION_REGISTER } from 'graphql/mutations/register'

const FormSignUp = () => {
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: '',
  })

  const [createUser] = useMutation(MUTATION_REGISTER)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    await createUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      },
    })
  }

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          placeholder="Name"
          type="text"
          onInputChange={(v) => handleInput('username', v)}
          icon={<AccountCircle />}
        />

        <TextField
          name="email"
          placeholder="Email"
          type="email"
          onInputChange={(v) => handleInput('email', v)}
          icon={<Email />}
        />

        <TextField
          name="password"
          placeholder="Password"
          type="password"
          onInputChange={(v) => handleInput('password', v)}
          icon={<Lock />}
        />

        <TextField
          name="password_confirm"
          placeholder="Confirm Password"
          type="password"
          onInputChange={(v) => handleInput('password_confirm', v)}
          icon={<Lock />}
        />

        <Button type="submit" size="large" fullWidth>
          Sign up now
        </Button>

        <FormLink>
          Already have an account?{' '}
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignUp
