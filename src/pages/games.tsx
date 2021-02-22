import { gql } from '@apollo/client'
import Games, { GamesTemplateProps } from 'templates/Games'
import filterItemsMock from 'components/ExploreSidebar/mock'
import gamesMock from 'components/GameCardSlider/mock'
import { initializeApollo } from 'utils/apollo'

const GET_GAMES = gql`
  query GetGames {
    games {
      name
    }
  }
`

export default function GamesPage(props: GamesTemplateProps) {
  if (props.data)
    return (
      <pre style={{ padding: 20, backgroundColor: '#FAFAFA', fontSize: 16 }}>
        {JSON.stringify(props.data, null, 2)}
      </pre>
    )

  return <Games {...props} />
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({ query: GET_GAMES })

  return {
    props: {
      data: data,
      initialApolloState: apolloClient.cache.extract(),
      filterItems: filterItemsMock,
      games: gamesMock,
    },
  }
}
