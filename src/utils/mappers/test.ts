import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight,
  QueryHome_sections_newGames_highlight,
} from 'graphql/generated/QueryHome'
import {
  bannersMapper,
  gamesMapper,
  highlightMapper,
} from 'utils/mappers/index'
import { QueryGames_games } from 'graphql/generated/QueryGames'

describe('bannersMapper()', () => {
  it('should return an empty array if there are no banners', () => {
    expect(bannersMapper(null)).toStrictEqual([])
  })

  it('should return the correct format when mapped', () => {
    const banner = {
      image: {
        url: '/image.jpg',
      },
      title: 'Banner title',
      subtitle: 'Banner subtitle',
      button: {
        label: 'button label',
        link: 'button link',
      },
      ribbon: {
        text: 'ribbon text',
        color: 'primary',
        size: 'small',
      },
    } as QueryHome_banners

    expect(bannersMapper([banner])).toStrictEqual([
      {
        img: 'http://localhost:1337/image.jpg',
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        buttonLabel: 'button label',
        buttonLink: 'button link',
        ribbon: 'ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'small',
      },
    ])
  })
})

describe('gamesMapper()', () => {
  it('should return an empty array if there are no games', () => {
    expect(gamesMapper(null)).toStrictEqual([])
  })

  it('should return the correct format when mapped', () => {
    const game = {
      id: '1',
      name: 'game',
      developers: [
        {
          name: 'developer',
        },
      ],
      slug: 'game',
      cover: {
        url: '/image.jpg',
      },
      price: 10,
    } as QueryGames_games

    expect(gamesMapper([game])).toStrictEqual([
      {
        id: '1',
        title: 'game',
        slug: 'game',
        developer: 'developer',
        img: 'http://localhost:1337/image.jpg',
        price: 10,
      },
    ])
  })
})

describe('highlightMapper()', () => {
  it('should return empty object if no highlight', () => {
    expect(highlightMapper(null)).toStrictEqual({})
  })

  it('should return mapped highlight', () => {
    const highlight = {
      title: 'Highlight title',
      subtitle: 'Highlight subtitle',
      background: {
        url: '/background.jpg',
      },
      floatImage: {
        url: '/float-image.png',
      },
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'left',
    } as QueryHome_sections_newGames_highlight

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'Highlight title',
      subtitle: 'Highlight subtitle',
      backgroundImage: 'http://localhost:1337/background.jpg',
      floatImage: 'http://localhost:1337/float-image.png',
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'left',
    })
  })
})
