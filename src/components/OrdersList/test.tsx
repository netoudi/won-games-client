import { render, screen } from 'utils/test-utils'
import OrdersList from '.'
import itemsMock from './mock'

jest.mock('components/Empty', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Empty" />
    },
  }
})

jest.mock('components/GameItem', () => {
  return {
    __esModule: true,
    default: function Mock({ children }: { children: React.ReactNode }) {
      return <div data-testid="Mock GameItem">{children}</div>
    },
  }
})

describe('<OrdersList />', () => {
  it('should render the game items', () => {
    render(<OrdersList items={itemsMock} />)

    expect(
      screen.getByRole('heading', { name: /my orders/i }),
    ).toBeInTheDocument()

    expect(screen.getAllByTestId('Mock GameItem')).toHaveLength(2)
  })

  it('should render empty state', () => {
    render(<OrdersList items={[]} />)

    expect(screen.getByTestId('Mock Empty')).toBeInTheDocument()
  })
})
