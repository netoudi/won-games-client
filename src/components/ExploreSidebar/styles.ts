import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import * as HeadingStyles from 'components/Heading/styles'
import * as CheckboxStyles from 'components/Checkbox/styles'
import * as RadioStyles from 'components/Radio/styles'

export const Overlay = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `}
`

export const FilterOpen = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    cursor: pointer;
    width: 3.2rem;
    height: 3.2rem;
  `}
`
export const FilterClose = styled(FilterOpen)`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    margin-left: auto;
    display: none;
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    opacity: 1;
    pointer-events: all;

    > div {
      margin-bottom: ${theme.spacings.small};
      padding-bottom: ${theme.spacings.small};

      &:not(:last-child) {
        border-bottom: 0.1rem solid ${theme.colors.darkGray};
      }
    }
  `}
`

export const Footer = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.medium};
  `}
`

type WrapperProps = {
  isOpen: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, isOpen }) => css`
    overflow: hidden;

    ${Overlay} {
      transition: opacity 0.3s ease-in-out;
      opacity: ${isOpen ? 1 : 0};
      pointer-events: ${isOpen ? 'all' : 'none'};
    }

    ${HeadingStyles.Wrapper} {
      margin-bottom: ${theme.spacings.medium};
    }

    ${CheckboxStyles.Wrapper} {
      &:not(:last-child) {
        margin-bottom: ${theme.spacings.xsmall};
      }
    }

    ${RadioStyles.Wrapper} {
      &:not(:last-child) {
        margin-bottom: ${theme.spacings.xsmall};
      }
    }

    ${Content} {
      ${media.lessThan('medium')`
        opacity: ${isOpen ? 1 : 0};
        pointer-events: ${isOpen ? 'all' : 'none'};
        transform: ${isOpen ? 'translateY(0)' : 'translateY(3rem)'};
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        overflow: auto;

        padding: ${theme.spacings.small};
        padding-bottom: ${theme.spacings.xxlarge};

        ${FilterClose} {
          display: block;
          border: 0;
        }

        ${HeadingStyles.Wrapper} {
          color: ${theme.colors.black};
        }

        ${CheckboxStyles.Label} {
          color: ${theme.colors.black};
        }

        ${RadioStyles.Label} {
          color: ${theme.colors.black};
        }
      `}
    }

    ${Footer} {
      ${media.lessThan('medium')`
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        padding: ${theme.spacings.small};
        background-color: white;

        opacity: ${isOpen ? 1 : 0};
        pointer-events: ${isOpen ? 'all' : 'none'};
        transform: ${isOpen ? 'translateY(0)' : 'translateY(3rem)'};
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
      `}
    }
  `}
`
