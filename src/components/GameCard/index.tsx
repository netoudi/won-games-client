import {
  AddShoppingCart,
  FavoriteBorder,
} from '@styled-icons/material-outlined'

import Button from 'components/Button'
import * as S from './styles'

export type GameCardProps = {
  title: string
  developer: string
  img: string
  price: string
  promotionPrice?: string
}

const GameCard = ({
  title,
  developer,
  img,
  price,
  promotionPrice,
}: GameCardProps) => (
  <S.Wrapper>
    <S.ImageBox>
      <img src={img} alt={title} />
    </S.ImageBox>
    <S.Content>
      <S.Info>
        <S.Title>{title}</S.Title>
        <S.Developer>{developer}</S.Developer>
      </S.Info>
      <S.FavButton role="button">
        <FavoriteBorder aria-label="Add to Wishlist" />
      </S.FavButton>
      <S.BuyBox>
        {!!promotionPrice && <S.Price isPromotional>{price}</S.Price>}
        <S.Price>{promotionPrice || price}</S.Price>
        <Button icon={<AddShoppingCart />} size="small" />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
