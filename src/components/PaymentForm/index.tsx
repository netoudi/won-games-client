import { useState } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined'
import Heading from 'components/Heading'
import Button from 'components/Button'

import * as S from './styles'

const PaymentForm = () => {
  const [error, setError] = useState<string | null>(null)

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setError(event.error ? event.error.message : '')
  }

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Payment
        </Heading>

        <CardElement
          options={{ hidePostalCode: true }}
          onChange={handleChange}
        />

        {error && (
          <S.Error>
            <ErrorOutline size={20} />
            &nbsp;{error}
          </S.Error>
        )}
      </S.Body>

      <S.Footer>
        <Button as="a" fullWidth minimal>
          Continue shopping
        </Button>
        <Button fullWidth icon={<ShoppingCart />}>
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default PaymentForm