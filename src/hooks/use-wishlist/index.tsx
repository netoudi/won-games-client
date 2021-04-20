import { createContext, useContext } from 'react'

export type WishlistContextData = {
  items: string[]
  isInWishlist: (id: string) => boolean
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  loading: boolean
}

export const WishlistContextDefaultValues = {
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null,
  loading: false,
}

export const WishlistContext = createContext<WishlistContextData>(
  WishlistContextDefaultValues,
)

export type WishlistProviderProps = {
  children: React.ReactNode
}

const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const isInWishlist = () => false
  const addToWishlist = () => null
  const removeFromWishlist = () => null

  return (
    <WishlistContext.Provider
      value={{
        items: [],
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        loading: false,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const useWishlist = () => useContext(WishlistContext)

export { WishlistProvider, useWishlist }
