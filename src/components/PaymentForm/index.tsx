import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Session } from 'next-auth/client'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined'
import { createPaymentIntent } from 'utils/stripe/methods'
import Heading from 'components/Heading'
import Button from 'components/Button'
import { FormLoading } from 'components/Form'
import { useCart } from 'hooks/use-cart'

import * as S from './styles'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    // se for freeGames
    if (freeGames) {
      // salva no banco
      // redirecionar para página de sucesso
      router.push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clienteSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!,
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setLoading(false)
    } else {
      setError(null)
      setLoading(false)

      // salvar a comprar no banco do Strapi
      // redirecionar para página de sucesso
      router.push('/success')
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
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
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && (disabled || !!error)}
          >
            {!loading && 'Buy now'}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
