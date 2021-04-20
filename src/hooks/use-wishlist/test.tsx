import { MockedProvider } from '@apollo/client/testing'
import { useWishlist, WishlistProvider } from 'hooks/use-wishlist/index'
import { wishlistMock } from 'hooks/use-wishlist/mock'
import { renderHook } from '@testing-library/react-hooks'

describe('useWishlist', () => {
  it('should return wishlist items', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    const { result } = renderHook(() => useWishlist(), { wrapper })
  })
})
