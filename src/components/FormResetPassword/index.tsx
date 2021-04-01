import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import { ErrorOutline, Lock } from '@styled-icons/material-outlined'
import { FieldError, resetValidate } from 'utils/validations'
import { FormError, FormLoading, FormWrapper } from 'components/Form'
import TextField from 'components/TextField'
import Button from 'components/Button'

const FormResetPassword = () => {
  const { query } = useRouter()
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldError>({})
  const [values, setValues] = useState({ password: '', password_confirm: '' })
  const [loading, setLoading] = useState(false)

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setFormError('')

    const errors = resetValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: values.password,
          passwordConfirmation: values.password_confirm,
          code: query.code,
        }),
      },
    )

    const data = await response.json()
    setLoading(false)

    if (data.error) {
      setFormError(data.message[0].messages[0].message)
    } else {
      await signIn('credentials', {
        email: data.user.email,
        password: values.password,
        callbackUrl: '/',
      })
    }
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError?.password}
          onInputChange={(v) => handleInput('password', v)}
          icon={<Lock />}
        />

        <TextField
          name="password_confirm"
          placeholder="Confirm Password"
          type="password"
          error={fieldError?.password_confirm}
          onInputChange={(v) => handleInput('password_confirm', v)}
          icon={<Lock />}
        />

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Reset password</span>}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormResetPassword
