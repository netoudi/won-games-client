import { useQuery } from '@apollo/client'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'
import Base from 'templates/Base'
import { Grid } from 'components/Grid'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard from 'components/GameCard'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import { QUERY_GAMES } from 'graphql/queries/games'

import * as S from './styles'

export type GamesTemplateProps = {
  filterItems: ItemProps[]
}

const Games = ({ filterItems }: GamesTemplateProps) => {
  const { data, loading } = useQuery<QueryGames, QueryGamesVariables>(
    QUERY_GAMES,
    { variables: { limit: 15 } },
  )

  const handleFilter = () => {
    return
  }

  const handleShowMore = () => {
    return
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar items={filterItems} onFilter={handleFilter} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <section>
            <Grid>
              {data?.games.map((game) => (
                <GameCard
                  key={game.slug}
                  title={game.name}
                  slug={game.slug}
                  developer={game.developers[0].name}
                  img={`http://localhost:1337${game.cover?.url}`}
                  price={game.price}
                />
              ))}
            </Grid>

            <S.ShowMore role="button" onClick={handleShowMore}>
              <p>Show More</p>
              <ArrowDown size={35} />
            </S.ShowMore>
          </section>
        )}
      </S.Main>
    </Base>
  )
}

export default Games
