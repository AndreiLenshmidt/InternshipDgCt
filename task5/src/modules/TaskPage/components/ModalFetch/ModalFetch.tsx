export default function ModalFetch(fetchEsc: CallableFunction) {
   return (
      <>
         <h1>fetcher</h1>
         <button onClick={() => fetchEsc(true)}>esc</button>
      </>
   );
}
