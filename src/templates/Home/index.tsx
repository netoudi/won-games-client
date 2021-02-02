import { Container } from 'components/Container'
import Menu from 'components/Menu'
import Footer from 'components/Footer'
import Heading from 'components/Heading'

import * as S from './styles'

const Home = () => (
  <S.Wrapper>
    <Container>
      <Menu />
    </Container>

    <Container>
      <Heading lineLeft lineColor="secondary" color="black">
        News
      </Heading>
    </Container>

    <Container>
      <Heading lineLeft lineColor="secondary">
        Most Popular
      </Heading>
    </Container>

    <Container>
      <Heading lineLeft lineColor="secondary">
        Upcoming
      </Heading>
    </Container>

    <Container>
      <Heading lineLeft lineColor="secondary">
        Free games
      </Heading>
    </Container>

    <Container>
      <Footer />
    </Container>
  </S.Wrapper>
)

export default Home
