import Games, { GamesTemplateProps } from 'templates/Games'
import filterItemsMock from 'components/ExploreSidebar/mock'
import gamesMock from 'components/GameCardSlider/mock'

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />
}

export async function getStaticProps() {
  return {
    props: {
      filterItems: filterItemsMock,
      games: gamesMock,
    },
  }
}
