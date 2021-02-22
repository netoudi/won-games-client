import { gql, useQuery } from '@apollo/client'
import Games, { GamesTemplateProps } from 'templates/Games'
import filterItemsMock from 'components/ExploreSidebar/mock'
import gamesMock from 'components/GameCardSlider/mock'

export default function GamesPage(props: GamesTemplateProps) {
  const { data, loading, error } = useQuery(gql`
    query GetGames {
      games {
        name
      }
    }
  `)

  if (loading) return <p style={{ color: '#FAFAFA' }}>Loading...</p>

  if (error) return <p style={{ color: '#FAFAFA' }}>{error}</p>

  if (data)
    return (
      <pre style={{ padding: 20, backgroundColor: '#FAFAFA', fontSize: 16 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    )

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
