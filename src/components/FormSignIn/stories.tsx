import { Meta, Story } from '@storybook/react/types-6-0'
import FormSignIn from '.'

export default {
  title: 'Form/FormSignIn',
  component: FormSignIn,
} as Meta

export const Default: Story = () => (
  <div style={{ width: '30rem', margin: 'auto' }}>
    <FormSignIn />
  </div>
)
