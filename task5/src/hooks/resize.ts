import { useEffect, useState } from "react";

export const useResize = (skip: boolean = true) => {
   const [width, setWidth] = useState(globalThis.innerWidth);  //
   
   useEffect(() => {

      if (typeof window === 'undefined') {
         setWidth(0);
      }
      else if (!skip){

         // debugger
         const handleResize = (e: UIEvent) => setWidth((e.target as Window).innerWidth);
         window.addEventListener('resize', handleResize);

         return () => {
            window.removeEventListener('resize', handleResize);
         };
      }

   }, [skip]);

   return { width };
};