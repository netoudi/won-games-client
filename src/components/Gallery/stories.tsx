import { Meta, Story } from '@storybook/react/types-6-0'
import Gallery, { GalleryProps } from '.'
import itemsMock from './mock'

export default {
  title: 'Gallery',
  component: Gallery,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'won-dark',
    },
  },
  args: {
    items: itemsMock,
  },
} as Meta

export const Default: Story<GalleryProps> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <Gallery {...args} />
  </div>
)
