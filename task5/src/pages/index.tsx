import TaskModalCreationEditing from '../modules/TaskModalCreationEditing/page';

export default function Home() {
   return (
      <>
         <TaskModalCreationEditing isOpen={true} onClose={() => false} taskId="555" />
      </>
   );
}
