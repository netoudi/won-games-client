import Heading from 'components/Heading'
import TextField from 'components/TextField'
import Button from 'components/Button'

import * as S from './styles'

const FormProfile = () => {
  return (
    <>
      <Heading lineBottom color="black" size="small">
        My profile
      </Heading>

      <S.Form>
        <TextField
          name="name"
          placeholder="Name"
          label="Name"
          initialValue="John Doe"
        />

        <TextField
          name="email"
          type="email"
          placeholder="E-mail"
          label="E-mail"
          initialValue="johndoe@gmail.com"
          disabled
        />

        <TextField
          name="password"
          type="password"
          placeholder="Type your password"
          label="Password"
        />

        <TextField
          name="new_password"
          type="password"
          placeholder="New password"
          label="New Password"
        />

        <Button size="large" type="submit">
          Save
        </Button>
      </S.Form>
    </>
  )
}

export default FormProfile