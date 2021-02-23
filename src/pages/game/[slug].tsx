import { useRouter } from 'next/router'
import Game, { GameTemplateProps } from 'templates/Game'

import { QUERY_GAME_BY_SLUG, QUERY_GAMES } from 'graphql/queries/games'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'

import galleryMock from 'components/Gallery/mock'
import gemesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

import { initializeApollo } from 'utils/apollo'
import { GetStaticProps } from 'next'
import {
  QueryGameBySlug,
  QueryGameBySlugVariables,
} from 'graphql/generated/QueryGameBySlug'

const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  // se a rota não tiver sido gerada ainda
  // você pode mostrar um loading
  // uma tela de esqueleto
  if (router.isFallback) return null

  return <Game {...props} />
}

// gerar em build time (/game/bla, /game/foo, ...)
export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 },
  })

  const paths = data.games.map(({ slug }) => ({
    params: { slug },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` },
  })

  if (!data.games.length) {
    return { notFound: true }
  }

  const game = data.games[0]

  return {
    props: {
      revalidate: 60, // gera novamente a página a cada 60's, evita consultar a api a cada requisição
      cover: `http://localhost:1337${game.cover?.src}`,
      gameInfo: {
        title: game.name,
        price: game.price,
        description: game.short_description,
      },
      gallery: game.gallery,
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.platforms.map((category) => category.name),
      },
      upcomingGames: gemesMock,
      upcomingHighlight: highlightMock,
      recommendGames: gemesMock,
    },
  }
}
