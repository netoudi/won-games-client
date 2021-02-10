import 'match-media-mock'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import itemsMock from './mock'
import Gallery from '.'

describe('<Gallery />', () => {
  it('should render thumbnails as buttons', () => {
    renderWithTheme(<Gallery items={itemsMock.slice(0, 2)} />)

    expect(
      screen.getByRole('button', { name: /Thumb - Gallery Image 1/i }),
    ).toHaveAttribute('src', itemsMock[0].src)

    expect(
      screen.getByRole('button', { name: /Thumb - Gallery Image 2/i }),
    ).toHaveAttribute('src', itemsMock[1].src)
  })

  it('should handle the open modal', () => {
    renderWithTheme(<Gallery items={itemsMock.slice(0, 2)} />)

    // selecionar o nosso modal
    const modalElement = screen.getByLabelText('modal')

    // verificar se o modal tá escondido
    expect(modalElement.getAttribute('aria-hidden')).toBe('true')
    expect(modalElement).toHaveStyle({ opacity: 0 })

    // clicar no botão de abrir o modal e verificar se ele abriu
    fireEvent.click(
      screen.getByRole('button', { name: /Thumb - Gallery Image 1/i }),
    )
    expect(modalElement.getAttribute('aria-hidden')).toBe('false')
    expect(modalElement).toHaveStyle({ opacity: 1 })
  })

  it('should open modal with selected image', async () => {
    renderWithTheme(<Gallery items={itemsMock.slice(0, 2)} />)

    // clicar no thumbnail
    fireEvent.click(
      screen.getByRole('button', { name: /Thumb - Gallery Image 2/i }),
    )

    // espero que a imagem da thumbnail seja aberta
    const img = await screen.findByRole('img', { name: /Gallery Image 2/i })
    expect(img.parentElement?.parentElement).toHaveClass('slick-active')
  })

  it('should handle the close modal when overlay or button clicked', () => {
    renderWithTheme(<Gallery items={itemsMock.slice(0, 2)} />)

    // selecionar o nosso modal
    const modalElement = screen.getByLabelText('modal')

    // clicar no botão de abrir o modal
    fireEvent.click(
      screen.getByRole('button', { name: /Thumb - Gallery Image 1/i }),
    )

    // clicar no botão de fechar o modal
    fireEvent.click(screen.getByRole('button', { name: /close modal/i }))

    // verificar se o modal tá escondido
    expect(modalElement.getAttribute('aria-hidden')).toBe('true')
    expect(modalElement).toHaveStyle({ opacity: 0 })
  })

  it('should handle close modal when ESC button is press', () => {
    const { container } = renderWithTheme(
      <Gallery items={itemsMock.slice(0, 2)} />,
    )

    // selecionar o nosso modal
    const modalElement = screen.getByLabelText('modal')

    // clicar no botão de abrir o modal
    fireEvent.click(
      screen.getByRole('button', { name: /Thumb - Gallery Image 1/i }),
    )

    // clicar no botão de fechar o modal
    fireEvent.keyUp(container, { key: 'Escape' })

    // verificar se o modal tá escondido
    expect(modalElement.getAttribute('aria-hidden')).toBe('true')
    expect(modalElement).toHaveStyle({ opacity: 0 })
  })
})
