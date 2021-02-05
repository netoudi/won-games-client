import { renderWithTheme } from 'utils/tests/helpers'
import Auth from '.'

describe('<Auth />', () => {
  it('should render the heading', () => {
    renderWithTheme(
      <Auth title="Auth title">
        <input type="text" />
      </Auth>,
    )

    // verifiquem se tem 2 logos

    // verifica se tem o heading principal do banner

    // verifica se tem o subtitle

    // verifica se tem o title do content

    // verifica se o children tá sendo renderizado
  })
})
