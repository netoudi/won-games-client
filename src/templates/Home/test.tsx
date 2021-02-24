import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import bannerMock from 'components/BannerSlider/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

import Home, { HomeTemplateProps } from '.'

const props: HomeTemplateProps = {
  banners: bannerMock,
  newGamesTitle: 'New games',
  newGames: gamesMock,
  mostPopularGamesTitle: 'Most popular games',
  mostPopularHighlight: highlightMock,
  mostPopularGames: gamesMock,
  upcomingGamesTitle: 'Upcoming games',
  upcomingGames: gamesMock,
  upcomingHighlight: highlightMock,
  freeGamesTitle: 'Free games',
  freeGames: gamesMock,
  freeHighlight: highlightMock,
}

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Showcase" />
    },
  }
})

jest.mock('components/BannerSlider', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Banner Slider" />
    },
  }
})

describe('<Home />', () => {
  it('should render banner and showcase', () => {
    renderWithTheme(<Home {...props} />)

    expect(screen.getByTestId('Mock Banner Slider')).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(4)
  })
})
