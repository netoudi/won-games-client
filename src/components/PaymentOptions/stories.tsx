import { Story, Meta } from '@storybook/react/types-6-0'
import cardsMock from './mock'

import PaymentOptions, { PaymentOptionsProps } from '.'

export default {
  title: 'PaymentOptions',
  component: PaymentOptions,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
  args: {
    cards: cardsMock,
  },
  argTypes: {
    cards: {
      type: '',
    },
    handlePayment: {
      action: 'clicked',
    },
  },
} as Meta

export const Default: Story<PaymentOptionsProps> = (args) => (
  <div style={{ padding: 16, maxWidth: 400 }}>
    <PaymentOptions {...args} />
  </div>
)
