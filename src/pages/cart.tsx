import Cart, { CartTemplateProps } from 'templates/Cart'

import itemsMock from 'components/CardList/mock'
import gemesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import cardsMock from 'components/PaymentOptions/mock'

export default function CartPage(props: CartTemplateProps) {
  return <Cart {...props} />
}

export async function getStaticProps() {
  return {
    props: {
      items: itemsMock,
      total: '$ 430,00',
      cards: cardsMock,
      recommendedGames: gemesMock,
      recommendedHighlight: highlightMock,
    },
  }
}
