import { Story, Meta } from '@storybook/react/types-6-0'
import itemsMock from './mock'

import CardList, { CardListProps } from '.'

export default {
  title: 'CardList',
  component: CardList,
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

export const Default: Story<CardListProps> = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CardList {...args} />
  </div>
)
