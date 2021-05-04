import { useEffect, useState } from 'react'
import { Session } from 'next-auth/client'
import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined'
import { createPaymentIntent } from 'utils/stripe/methods'
import Heading from 'components/Heading'
import Button from 'components/Button'
import { useCart } from 'hooks/use-cart'

import * as S from './styles'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(true)
  const [clienteSecret, setClienteSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  useEffect(() => {
    async function setPaymentMode() {
      setFreeGames(false)

      if (items.length) {
        // bater na API /orders/create-payment-intent
        // enviar os items do carrinho
        const data = await createPaymentIntent({ items, token: session.jwt })

        // se eu receber freeGames: true => setFreeGames
        // faço o fluxo de jogo gratuito
        if (data.freeGames) {
          setFreeGames(true)
          console.log({ freeGames: data.freeGames })
          return
        }

        // se eu receber um erro
        // setError
        if (data.error) {
          setError(data.error)
          return
        }

        // senão o paymentIntent foi válido
        // setClientSecret
        setClienteSecret(data.client_secret)
        console.log({ clientSecret: data.client_secret })
      }
    }

    setPaymentMode()
  }, [items, session])

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Payment
        </Heading>

        {freeGames ? (
          <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
        ) : (
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '16px',
                },
              },
            }}
            onChange={handleChange}
          />
        )}

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
        <Button
          fullWidth
          icon={<ShoppingCart />}
          disabled={!freeGames && (disabled || !!error)}
        >
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default PaymentForm
