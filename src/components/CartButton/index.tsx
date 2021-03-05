import {
  AddShoppingCart,
  RemoveShoppingCart,
} from '@styled-icons/material-outlined'
import { useCart } from 'hooks/use-cart'
import Button from 'components/Button'

type CartButtonProps = {
  id: string
}

const CartButton = ({ id }: CartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart()

  return (
    <Button
      size="small"
      icon={
        isInCart(id) ? (
          <RemoveShoppingCart aria-label="Remove from cart" />
        ) : (
          <AddShoppingCart aria-label="Add to cart" />
        )
      }
      onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}
    />
  )
}

export default CartButton
