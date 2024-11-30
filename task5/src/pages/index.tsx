import Head from 'next/head';
import Image from 'next/image';
import localFont from 'next/font/local';
import styles from '@/styles/Home.module.css';
import ModalClose from '@/ui/ModalClose';
import TaskModalCreationEditing from './TaskModalCreationEditing';

const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900',
});
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900',
});

export default function Home() {
   return (
      <>
         <TaskModalCreationEditing
            isOpen={true}
            onClose={() => false}
            taskId="555"
         />
      </>
   );
}
