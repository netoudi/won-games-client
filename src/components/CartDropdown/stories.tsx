import { Meta, Story } from '@storybook/react/types-6-0'
import itemsMock from 'components/CartList/mock'

import CartDropdown from '.'

export default {
  title: 'CartDropdown',
  component: CartDropdown,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
} as Meta

export const Default: Story = () => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown />
  </div>
)

Default.args = {
  cartContextValue: {
    items: itemsMock,
    quantity: itemsMock.length,
    total: 'R$ 300,00',
  },
}

export const Empty: Story = () => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown />
  </div>
)
