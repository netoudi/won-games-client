import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import gemesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

import Wishlist from '.'

const props = {
  recommendedGames: gemesMock,
  recommendedHighlight: highlightMock,
}

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Showcase" />
    },
  }
})

describe('<Wishlist />', () => {
  it('should render correctly', () => {
    renderWithTheme(<Wishlist {...props} />)

    expect(
      screen.getByRole('heading', { name: /wishlist/i }),
    ).toBeInTheDocument()

    expect(screen.getByTestId(/mock showcase/i)).toBeInTheDocument()
  })
})
