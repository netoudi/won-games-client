import Home, { HomeTemplateProps } from 'templates/Home'
import { initializeApollo } from 'utils/apollo'
import { QueryHome } from 'graphql/generated/QueryHome'
import { QUERY_HOME } from 'graphql/queries/home'
import { bannersMapper, gamesMapper, highlightMapper } from 'utils/mappers'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<QueryHome>({ query: QUERY_HOME })

  return {
    props: {
      revalidate: 60,

      banners: bannersMapper(data.banners),

      newGamesTitle: data.sections?.newGames?.title,
      newGames: gamesMapper(data.newGames),

      mostPopularGamesTitle: data.sections?.popularGames?.title,
      mostPopularHighlight: highlightMapper(
        data.sections?.popularGames?.highlight,
      ),
      mostPopularGames: gamesMapper(data.sections?.popularGames?.games),

      upcomingGamesTitle: data.sections?.upcomingGames?.title,
      upcomingHighlight: highlightMapper(
        data.sections?.upcomingGames?.highlight,
      ),
      upcomingGames: gamesMapper(data.upcomingGames),

      freeGamesTitle: data.sections?.freeGames?.title,
      freeHighlight: highlightMapper(data.sections?.freeGames?.highlight),
      freeGames: gamesMapper(data.freeGames),
    },
  }
}
