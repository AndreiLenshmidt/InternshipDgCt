import Head from 'next/head';
import Image from 'next/image';
import localFont from 'next/font/local';
import styles from '@/styles/Home.module.css';
<<<<<<< HEAD
import ModalClose from '@/components/ModalClose';
import TaskModalCreationEditing from '../modules/TaskModalCreationEditing/page';
=======
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
>>>>>>> origin/ds-kanban-task-dev__projects-page

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
