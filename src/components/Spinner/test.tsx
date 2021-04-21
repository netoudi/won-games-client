import { render, screen } from 'utils/test-utils'

import Spinner from '.'

describe('<Spinner />', () => {
  it('should render correctly', () => {
    render(<Spinner />)

    expect(screen.getByTitle(/loading/i)).toBeInTheDocument()
  })
})
