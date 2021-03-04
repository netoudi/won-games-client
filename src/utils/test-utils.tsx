import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import {
  CartContext,
  CartContextData,
  CartContextDefaultValues,
} from 'hooks/use-cart'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

type CustomRenderProps = {
  cartProviderProps?: CartContextData
} & Omit<RenderOptions, 'queries'>

const renderCustom = (
  ui: ReactElement,
  {
    cartProviderProps = CartContextDefaultValues,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...renderOptions
  }: CustomRenderProps = {},
) => {
  return render(
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={cartProviderProps}>
        {ui}
      </CartContext.Provider>
    </ThemeProvider>,
  )
}

export * from '@testing-library/react'
export { renderCustom as render }
