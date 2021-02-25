import {
  QueryHome_banners,
  QueryHome_freeGames,
  QueryHome_newGames,
  QueryHome_sections_freeGames_highlight,
  QueryHome_sections_newGames_highlight,
  QueryHome_sections_popularGames_highlight,
  QueryHome_sections_upcomingGames_highlight,
  QueryHome_upcomingGames,
} from 'graphql/generated/QueryHome'

export const bannersMapper = (
  banners: QueryHome_banners[] | undefined | null,
) => {
  return (
    banners &&
    banners.map((banner) => ({
      img: `http://localhost:1337${banner.image?.url}`,
      title: banner.title,
      subtitle: banner.subtitle,
      buttonLabel: banner.button?.label,
      buttonLink: banner.button?.link,
      ...(banner.ribbon && {
        ribbon: banner.ribbon.text,
        ribbonColor: banner.ribbon.color,
        ribbonSize: banner.ribbon.size,
      }),
    }))
  )
}

type gamesProps =
  | QueryHome_newGames
  | QueryHome_upcomingGames
  | QueryHome_freeGames

export const gamesMapper = (games: gamesProps[] | undefined | null) => {
  return (
    games &&
    games.map((game) => ({
      title: game.name,
      slug: game.slug,
      developer: game.developers[0].name,
      img: `http://localhost:1337${game.cover?.url}`,
      price: game.price,
    }))
  )
}

type highlightMapperProps =
  | QueryHome_sections_newGames_highlight
  | QueryHome_sections_popularGames_highlight
  | QueryHome_sections_upcomingGames_highlight
  | QueryHome_sections_freeGames_highlight
  | undefined
  | null

export const highlightMapper = (highlight: highlightMapperProps) => {
  return (
    highlight && {
      title: highlight.title,
      subtitle: highlight.subtitle,
      backgroundImage: `http://localhost:1337${highlight.background?.url}`,
      floatImage: `http://localhost:1337${highlight.floatImage?.url}`,
      buttonLabel: highlight.buttonLabel,
      buttonLink: highlight.buttonLink,
      alignment: highlight.alignment,
    }
  )
}