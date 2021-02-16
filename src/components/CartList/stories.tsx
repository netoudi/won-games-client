import { Story, Meta } from '@storybook/react/types-6-0'
import itemsMock from './mock'

import CartList, { CartListProps } from '.'

export default {
  title: 'CartList',
  component: CartList,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
  args: {
    items: itemsMock,
    total: 'R$ 330,00',
  },
  argTypes: {
    items: {
      type: '',
    },
  },
} as Meta

export const Default: Story<CartListProps> = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} />
  </div>
)