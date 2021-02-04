import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'

import Radio from '.'

describe('<Radio />', () => {
  it('should render with label', () => {
    const { container } = renderWithTheme(
      <Radio label="radio label" labelFor="check" />,
    )

    // input a partir do papel / role
    expect(screen.getByRole('radio')).toBeInTheDocument()

    // input a partir da label associada
    expect(screen.getByLabelText(/radio label/i)).toBeInTheDocument()

    // label a partir do texto dela
    expect(screen.getByText(/radio label/i)).toHaveAttribute('for', 'check')

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render without label', () => {
    const { container } = renderWithTheme(<Radio />)

    expect(container.querySelector('label')).not.toBeInTheDocument()
  })

  it('should render with black label', function () {
    renderWithTheme(
      <Radio label="radio label" labelFor="check" labelColor="black" />,
    )

    expect(screen.getByText(/radio label/i)).toHaveStyle({
      color: '#030517',
    })
  })

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn()

    renderWithTheme(<Radio label="Radio" value="category" onCheck={onCheck} />)

    expect(onCheck).not.toBeCalled()

    userEvent.click(screen.getByRole('radio'))

    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })

    expect(onCheck).toHaveBeenCalledWith('category')
  })

  it('should be accessible with tab', () => {
    renderWithTheme(<Radio label="Radio" labelFor="Radio" />)

    expect(document.body).toHaveFocus()

    userEvent.tab()

    expect(screen.getByLabelText(/radio/i)).toHaveFocus()
  })
})
