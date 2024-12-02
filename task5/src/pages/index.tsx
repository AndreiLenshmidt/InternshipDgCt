import Head from 'next/head';
import Image from 'next/image';
import localFont from 'next/font/local';
import styles from '@/styles/Home.module.css';
import ModalClose from '@/components/ModalClose';
import TaskModalCreationEditing from '../modules/TaskModalCreationEditing/page';

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
