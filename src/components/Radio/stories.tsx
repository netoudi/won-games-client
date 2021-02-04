import { Story, Meta } from '@storybook/react/types-6-0'
import Radio, { RadioProps } from '.'

export default {
  title: 'Form/Radio',
  component: Radio,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'won-dark',
    },
  },
  argTypes: {
    onCheck: { action: 'checked' },
  },
} as Meta

export const Default: Story<RadioProps> = (args) => (
  <>
    <div style={{ padding: 10 }}>
      <Radio
        label="Action"
        labelFor="action"
        name="category"
        value="action"
        defaultChecked
        {...args}
      />
    </div>
    <div style={{ padding: 10 }}>
      <Radio
        label="Adventure"
        labelFor="adventure"
        name="category"
        value="adventure"
        {...args}
      />
    </div>
    <div style={{ padding: 10 }}>
      <Radio
        label="Strategy"
        labelFor="strategy"
        name="category"
        value="strategy"
        {...args}
      />
    </div>
  </>
)
