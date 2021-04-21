import 'session.mock'
import { render, screen } from 'utils/test-utils'
import theme from 'styles/theme'

import GameCard from '.'

const props = {
  id: '1',
  title: 'Population Zero',
  slug: 'population-zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 235,
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    const { container } = render(<GameCard {...props} />)

    expect(
      screen.getByRole('heading', { name: props.title }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: props.developer }),
    ).toBeInTheDocument()

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img,
    )
    expect(screen.getByRole('link', { name: props.title })).toHaveAttribute(
      'href',
      `/game/${props.slug}`,
    )

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render price in label', () => {
    render(<GameCard {...props} />)

    const price = screen.getByText('$235.00')

    expect(price).not.toHaveStyle({ 'text-decoration': 'line-through' })
    expect(price).toHaveStyle({ 'background-color': theme.colors.secondary })
  })

  it('should render a line-through in price when promotional', () => {
    render(<GameCard {...props} promotionPrice={15} />)

    expect(screen.getByText('$235.00')).toHaveStyle({
      'text-decoration': 'line-through',
    })

    expect(screen.getByText('$15.00')).not.toHaveStyle({
      'text-decoration': 'line-through',
    })
  })

  it('should render a Ribbon', () => {
    render(
      <GameCard
        {...props}
        ribbon="My Ribbon"
        ribbonColor="secondary"
        ribbonSize="small"
      />,
    )

    const ribbon = screen.getByText(/my ribbon/i)

    expect(ribbon).toBeInTheDocument()
    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' })
    expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' })
  })
})
