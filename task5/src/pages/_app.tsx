import '@/styles/globals.scss';
import '@/styles/reset.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import TaskModalCreationEditing from '@/modules/TaskModalCreationEditing/page';

const inter = localFont({
   src: '../fonts/Inter-VariableFont_opsz,wght.ttf',
   weight: '100 900',
   display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
   //
   const getLayout = (Component as unknown as { getLayout: Function }).getLayout ?? ((page: React.ReactNode) => page);

   return getLayout(
      // <Provider store={store}>
      <div className={inter.className}>
         <TaskModalCreationEditing isOpen={true} onClose={() => true} taskId="4546" />

         {/* <Component {...pageProps} /> */}
      </div>
      // </Provider>
   );
}
