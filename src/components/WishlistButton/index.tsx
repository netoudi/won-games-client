import { Favorite, FavoriteBorder } from '@styled-icons/material-outlined'
import { useWishlist } from 'hooks/use-wishlist'
import Button, { ButtonProps } from 'components/Button'
import { useSession } from 'next-auth/client'

export type WishlistButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const WishlistButton = ({
  id,
  hasText,
  size = 'small',
}: WishlistButtonProps) => {
  const [session] = useSession()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const handleClick = () => {
    isInWishlist(id) ? removeFromWishlist(id) : addToWishlist(id)
  }

  const ButtonText = isInWishlist(id)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist'

  if (!session) return null

  return (
    <Button
      icon={
        isInWishlist(id) ? (
          <Favorite aria-label={ButtonText} />
        ) : (
          <FavoriteBorder aria-label={ButtonText} />
        )
      }
      minimal
      size={size}
      onClick={handleClick}
    >
      {hasText && ButtonText}
    </Button>
  )
}

export default WishlistButton
