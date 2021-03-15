import { AppProps } from 'next/app'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { CartProvider } from 'hooks/use-cart'
import { useApollo } from 'utils/apollo'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Head>
            <title>Won Games</title>
            <link rel="shortcut icon" href="/img/icon-512.png" />
            <link rel="apple-touch-icon" href="/img/icon-512.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta
              name="description"
              content="The best Game Stores in the world!"
            />
          </Head>
          <GlobalStyles />
          <NextNprogress
            color="#F231A5"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
          />
          <Component {...pageProps} />
        </CartProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
