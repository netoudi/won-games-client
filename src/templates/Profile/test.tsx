import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Profile from '.'

describe('<Profile />', () => {
  it('should render the heading and children', () => {
    renderWithTheme(<Profile>Children</Profile>)

    expect(
      screen.getByRole('heading', { name: /my profile/i }),
    ).toBeInTheDocument()

    expect(screen.getByText(/children/i)).toBeInTheDocument()
  })
})
