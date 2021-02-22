import Games, { GamesTemplateProps } from 'templates/Games'
import filterItemsMock from 'components/ExploreSidebar/mock'
import { initializeApollo } from 'utils/apollo'
import { QUERY_GAMES } from 'graphql/queries/games'

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: QUERY_GAMES,
    variables: { limit: 9 },
  })

  console.log(data)

  return {
    props: {
      revalidate: 60,
      filterItems: filterItemsMock,
      games: data.games.map((game: any) => ({
        title: game.name,
        developer: game.developers[0].name,
        img: game.cover ? `http://localhost:1337${game.cover.url}` : null,
        price: new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'USD',
        }).format(game.price),
      })),
    },
  }
}
