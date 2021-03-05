import { Meta, Story } from '@storybook/react/types-6-0'
import { CartContextData } from 'hooks/use-cart'

import GameInfo, { GameInfoProps } from '.'
import gameMock from './mock'

export default {
  title: 'Game/GameInfo',
  component: GameInfo,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
  args: gameMock,
} as Meta

export const Default: Story<GameInfoProps> = (args) => (
  <div style={{ maxWidth: '144rem', padding: '1.5rem', margin: '0 auto' }}>
    <GameInfo {...args} />
  </div>
)

export const IsInCart: Story<GameInfoProps & CartContextData> = (args) => (
  <div style={{ maxWidth: '144rem', padding: '1.5rem', margin: '0 auto' }}>
    <GameInfo {...args} />
  </div>
)

IsInCart.args = {
  isInCart: () => true,
}
