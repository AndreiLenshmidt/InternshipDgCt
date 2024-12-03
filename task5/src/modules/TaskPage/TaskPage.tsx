import { useGetTaskByTaskIdQuery } from './api/taskApi';

export default function TaskPage(prop: { id: number }) {
   //    const { data: tasks } = useGetAllTasksQuery('project2');
   //    console.log(tasks);

   const { data, isLoading, isSuccess, isError } = useGetTaskByTaskIdQuery(prop.id);
   console.log(data, isLoading, isSuccess, isError);

   return (
      <>
         <h1>task {prop.id}</h1>
      </>
   );
}
