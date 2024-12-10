import { useState } from 'react';
import { string } from 'zod';

export const useModalInfo = () => {
   const [modalType, setModalType] = useState<'info' | 'error'>('info');
   const [modalTitle, setModalTitle] = useState<string>('Успешно');
   const [modalInfo, setModalInfo] = useState<string>('');
   const [modal, setCloseModal] = useState<boolean>(false);

   return {
      modalType,
      modalTitle,
      modalInfo,
      modal,
      setModalType,
      setModalTitle,
      setModalInfo,
      setCloseModal,
   };
};
