import { Story, Meta } from '@storybook/react/types-6-0'
import ExploreSidebar, { ExploreSidebarProps } from '.'
import itemsMock from './mock'

export default {
  title: 'ExploreSidebar',
  component: ExploreSidebar,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
  args: {
    items: itemsMock,
    onFilter: () => console.log('filter'),
  },
} as Meta

export const Default: Story<ExploreSidebarProps> = (args) => (
  <div style={{ maxWidth: '32rem' }}>
    <ExploreSidebar {...args} />
  </div>
)

export const WithInitialValues: Story<ExploreSidebarProps> = (args) => (
  <div style={{ maxWidth: '32rem' }}>
    <ExploreSidebar
      {...args}
      initialValues={{
        platforms: ['windows', 'linux'],
        sort_by: 'low-to-high',
      }}
    />
  </div>
)
