import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/test-utils'
import itemsMock from './mock'
import ExploreSidebar from '.'

describe('<ExploreSidebar />', () => {
  it('should render headings', () => {
    render(<ExploreSidebar items={itemsMock} onFilter={jest.fn} />)

    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /sort by/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /platforms/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument()
  })

  it('should render inputs', () => {
    render(<ExploreSidebar items={itemsMock} onFilter={jest.fn} />)

    expect(
      screen.getByRole('checkbox', { name: /under \$50/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('radio', { name: /high to low/i }),
    ).toBeInTheDocument()
  })

  it('should render the filter button', () => {
    render(<ExploreSidebar items={itemsMock} onFilter={jest.fn} />)

    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument()
  })

  it('should check initial values that are passed', () => {
    render(
      <ExploreSidebar
        items={itemsMock}
        initialValues={{ platforms: ['windows'], sort_by: 'low-to-high' }}
        onFilter={jest.fn}
      />,
    )

    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked()

    expect(screen.getByRole('radio', { name: /low to high/i })).toBeChecked()
  })

  it('should return selected items in onFilter', () => {
    const onFilter = jest.fn()

    render(
      <ExploreSidebar
        items={itemsMock}
        initialValues={{ platforms: ['windows'], sort_by: 'low-to-high' }}
        onFilter={onFilter}
      />,
    )
  })

  it('should filter with checked values', () => {
    const onFilter = jest.fn()

    render(<ExploreSidebar items={itemsMock} onFilter={onFilter} />)

    userEvent.click(screen.getByRole('checkbox', { name: /windows/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /linux/i }))
    userEvent.click(screen.getByRole('radio', { name: /low to high/i }))

    // 1st render (initialValues) + 3 clicks
    expect(onFilter).toHaveBeenCalledTimes(4)

    expect(onFilter).toBeCalledWith({
      platforms: ['windows', 'linux'],
      sort_by: 'low-to-high',
    })
  })

  it('should alter between radio options', function () {
    const onFilter = jest.fn()

    render(<ExploreSidebar items={itemsMock} onFilter={onFilter} />)

    userEvent.click(screen.getByRole('radio', { name: /high to low/i }))
    userEvent.click(screen.getByRole('radio', { name: /low to high/i }))

    expect(onFilter).toBeCalledWith({ sort_by: 'low-to-high' })
  })
})
