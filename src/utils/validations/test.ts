import {
  forgotValidate,
  resetValidate,
  signInValidate,
  signUpValidate,
} from '.'

describe('validations', () => {
  describe('signInValidate()', () => {
    it('should validate empty fields', () => {
      const values = { email: '', password: '' }

      expect(signInValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty',
      })
    })

    it('should return invalid email error', () => {
      const values = { email: 'invalid-email', password: '123456' }

      expect(signInValidate(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`,
      )
    })
  })

  describe('signUpValidate()', () => {
    it('should validate empty fields', () => {
      const values = { username: '', email: '', password: '' }

      expect(signUpValidate(values)).toMatchObject({
        email: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        password_confirm: expect.any(String),
      })
    })

    it('should return short username error', () => {
      const values = { username: 'hi', email: '', password: '' }

      expect(signUpValidate(values).username).toMatchInlineSnapshot(
        `"\\"username\\" length must be at least 5 characters long"`,
      )
    })

    it('should return invalid email error', () => {
      const values = {
        username: 'Jhon Doe',
        email: 'invalid-email',
        password: '',
      }

      expect(signUpValidate(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`,
      )
    })

    it('should return error if password does not match with confirm password', () => {
      const values = {
        username: 'Jhon Doe',
        email: 'invalid-email',
        password: '123456',
        password_confirm: '654321',
      }

      expect(signUpValidate(values).password_confirm).toMatchInlineSnapshot(
        `"confirm password does not match with password"`,
      )
    })
  })

  describe('forgotValidate()', () => {
    it('should validate empty fields', () => {
      const values = { email: '' }

      expect(forgotValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
      })
    })

    it('should return invalid email error', () => {
      const values = { email: 'invalid-email' }

      expect(forgotValidate(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`,
      )
    })
  })

  describe('resetValidate()', () => {
    it('should validate empty fields', () => {
      const values = { password: '', password_confirm: '' }

      expect(resetValidate(values)).toMatchObject({
        password: expect.any(String),
      })
    })

    it('should validate confirm password when empty', () => {
      const values = { password: '123', password_confirm: '' }

      expect(resetValidate(values).password_confirm).toMatchInlineSnapshot(
        `"\\"password_confirm\\" is not allowed to be empty"`,
      )
    })

    it('should validate confirm password when different', () => {
      const values = { password: '123', password_confirm: '321' }

      expect(resetValidate(values).password_confirm).toMatchInlineSnapshot(
        `"confirm password does not match with password"`,
      )
    })
  })
})
