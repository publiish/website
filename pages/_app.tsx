import { GlobalStyles } from '@/react-handy-box/components/GlobalStyles';
import { HandyProviders } from '@/react-handy-box/components/HandyProviders';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

export type SiteProps = {};

function Application({ Component, pageProps }: AppProps<SiteProps>) {
  return (
    <HandyProviders
      activeThemeName="dark"
      disableVendorPrefixesInDevMode={false}
    >
      <GlobalStyles />

      <Head>
        <title>Publiish</title>
      </Head>

      <Script
        src="https://kit.fontawesome.com/401fb1e734.js"
        data-auto-replace-svg="nest"
      ></Script>

      <Component {...pageProps} />
    </HandyProviders>
  );
}

export default Application;
