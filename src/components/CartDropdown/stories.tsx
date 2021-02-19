import { Meta, Story } from '@storybook/react/types-6-0'
import CartDropdown, { CartDropdownProps } from '.'
import itemsMock from 'components/CartList/mock'

export default {
  title: 'CartDropdown',
  component: CartDropdown,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
  args: {
    items: itemsMock,
    total: 'R$ 300,00',
  },
} as Meta

export const Default: Story<CartDropdownProps> = (args) => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown {...args} />
  </div>
)

export const Empty: Story<CartDropdownProps> = () => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown />
  </div>
)
