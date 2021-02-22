import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import Games, { GamesTemplateProps } from 'templates/Games'
import filterItemsMock from 'components/ExploreSidebar/mock'
import gamesMock from 'components/GameCardSlider/mock'

export default function GamesPage(props: GamesTemplateProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache(),
  })

  client.query({
    query: gql`
      query GetGames {
        games {
          name
        }
      }
    `,
  })

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
