import { Session } from 'next-auth'
import { render, screen, waitFor } from 'utils/test-utils'
import { CartContextData, CartContextDefaultValues } from 'hooks/use-cart'
import * as stripeMethods from 'utils/stripe/methods'
import items from 'components/CartList/mock'

import PaymentForm from '.'

// mock stripe js
jest.mock('@stripe/react-stripe-js', () => ({
  Elements: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Elements">{children}</div>
  },
  CardElement: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock CardElement">{children}</div>
  },
  useStripe: jest.fn().mockReturnValue({}),
  useElements: jest.fn().mockReturnValue({}),
}))

// create mock to createPaymentIntent methods
const createPaymentIntent = jest.spyOn(stripeMethods, 'createPaymentIntent')

describe('<PaymentForm />', () => {
  let session: Session
  let cartProviderProps: CartContextData

  beforeEach(() => {
    session = {
      jwt: 'token',
      user: {
        email: 'won@games.com',
      },
      expires: '1234',
    }

    cartProviderProps = {
      ...CartContextDefaultValues,
      items,
    }
  })

  it('should render the component correctly', () => {
    render(<PaymentForm session={session} />)

    expect(
      screen.getByRole('heading', { name: /payment/i }),
    ).toBeInTheDocument()

    expect(screen.getByTestId(/Mock CardElement/i)).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /continue shopping/i }),
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /buy now/i })).toBeDisabled()
  })

  it('should call createPayment when it renders and render free if gets freeGames', async () => {
    createPaymentIntent.mockResolvedValueOnce({ freeGames: true })

    render(<PaymentForm session={session} />, { cartProviderProps })

    await waitFor(() =>
      expect(
        screen.getByText(/Only free games, click buy and enjoy!/i),
      ).toBeInTheDocument(),
    )
  })

  it('should call createPayment when it renders and render error if has any issue', async () => {
    createPaymentIntent.mockResolvedValueOnce({ error: 'Error message' })

    render(<PaymentForm session={session} />, { cartProviderProps })

    await waitFor(() =>
      expect(screen.getByText(/Error message/i)).toBeInTheDocument(),
    )
  })
})
