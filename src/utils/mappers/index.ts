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
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'
import { QueryOrders_orders } from 'graphql/generated/QueryOrders'
import formatPrice from 'utils/format-price'
import getImageUrl from 'utils/getImageUrl'

export const bannersMapper = (
  banners: QueryHome_banners[] | undefined | null,
) => {
  return banners
    ? banners.map((banner) => ({
        img: getImageUrl(banner.image?.url),
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
    : []
}

type gamesProps =
  | QueryHome_newGames
  | QueryHome_upcomingGames
  | QueryHome_freeGames
  | QueryWishlist_wishlists_games

export const gamesMapper = (games: gamesProps[] | undefined | null) => {
  return games
    ? games.map((game) => ({
        id: game.id,
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: getImageUrl(game.cover?.url),
        price: game.price,
      }))
    : []
}

type highlightMapperProps =
  | QueryHome_sections_newGames_highlight
  | QueryHome_sections_popularGames_highlight
  | QueryHome_sections_upcomingGames_highlight
  | QueryHome_sections_freeGames_highlight
  | undefined
  | null

export const highlightMapper = (highlight: highlightMapperProps) => {
  return highlight
    ? {
        title: highlight.title,
        subtitle: highlight.subtitle,
        backgroundImage: getImageUrl(highlight.background?.url),
        floatImage: getImageUrl(highlight.floatImage?.url),
        buttonLabel: highlight.buttonLabel,
        buttonLink: highlight.buttonLink,
        alignment: highlight.alignment,
      }
    : {}
}

export const cartMapper = (games: QueryHome_newGames[] | undefined | null) => {
  return games
    ? games.map((game) => ({
        id: game.id,
        img: getImageUrl(game.cover?.url),
        price: formatPrice(game.price),
        title: game.name,
      }))
    : []
}

export const ordersMapper = (
  orders: QueryOrders_orders[] | undefined | null,
) => {
  return orders
    ? orders.map((order) => ({
        id: order.id,
        paymentInfo: {
          flag: order.card_brand,
          img: order.card_brand ? `/img/cards/${order.card_brand}.png` : null,
          number: order.card_last4
            ? `**** **** **** ${order.card_last4}`
            : 'Free Game',
          purchaseDate: `Purchase made on ${new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(new Date(order.created_at))}`,
        },
        games: order.games.map((game) => ({
          id: game.id,
          title: game.name,
          downloadLink: 'https://wongames.com/game/download/xpto',
          img: getImageUrl(game.cover?.url),
          price: formatPrice(game.price),
        })),
      }))
    : []
}
