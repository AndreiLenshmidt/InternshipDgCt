import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
// import { Provider } from 'react-redux';
// import { store } from '@/store/store';

const inter = localFont({
  src: '../fonts/Inter-VariableFont_opsz,wght.ttf',
  weight: '100 900',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <Provider store={store}>
    <div className={`${inter.className} wrapped`}>
      <Component {...pageProps} />;
    </div>
    // </Provider>;)
  );
}
