import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import gemesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

export default function SignIn(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

export async function getStaticProps() {
  return {
    props: {
      recommendedGames: gemesMock.slice(0, 5),
      recommendedHighlight: highlightMock,
    },
  }
}
