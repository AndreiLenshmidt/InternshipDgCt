import '@/styles/globals.scss';
import type { AppProps } from 'next/app';



export default function App({ Component, pageProps }: AppProps) {
   // 
   const getLayout = (Component as unknown as { getLayout: Function }).getLayout ?? ((page: React.ReactNode) => page);

   return getLayout(<Component {...pageProps} />);
}