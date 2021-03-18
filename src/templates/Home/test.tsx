import 'match-media-mock'
import { render, screen } from 'utils/test-utils'

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

jest.mock('templates/Base', () => {
  return {
    __esModule: true,
    default: function Mock({ children }: { children: React.ReactNode }) {
      return <div data-testid="Mock Base">{children}</div>
    },
  }
})

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
    render(<Home {...props} />)

    expect(screen.getByTestId('Mock Banner Slider')).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(4)
  })
})
