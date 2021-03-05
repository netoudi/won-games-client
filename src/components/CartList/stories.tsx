import { Meta, Story } from '@storybook/react/types-6-0'
import itemsMock from './mock'

import CartList from '.'

export default {
  title: 'CartList',
  component: CartList,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
  argTypes: {
    cartContextValue: {
      type: '',
    },
    items: {
      type: '',
    },
  },
} as Meta

export const Default: Story = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} />
  </div>
)

Default.args = {
  total: 'R$ 330,00',
  cartContextValue: {
    items: itemsMock,
  },
}

export const WithButton: Story = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} hasButton />
  </div>
)

WithButton.args = {
  total: 'R$ 330,00',
  cartContextValue: {
    items: itemsMock,
  },
}

export const Empty: Story = () => (
  <div style={{ maxWidth: 800 }}>
    <CartList />
  </div>
)
