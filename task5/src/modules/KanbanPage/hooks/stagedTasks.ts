import { useGetCurrentUserQuery } from "@/api/appApi";
import { Stage, TaskMultiple, User } from "@/api/data.types";
import { useGetAllTasksQuery } from "@/api/tasks/tasks.api";
import { useGetProjectQuery } from "@/modules/ProjectsPage/api/api";
import { groupByObject } from "@/utils/core";
import { useMemo, useState } from "react";
import { z } from "zod";
import { tasksFilterFormSchema } from "../utils/validationSchema";


type FormSchema = z.infer<typeof tasksFilterFormSchema>;


/**
 * 
 * @param route - current route (to get project slug)
 * @param user - current user data
 * @param justMine  
 * @returns - staged tasks
 */
export function useStagedTasks(route: string, filter: FormSchema) {

   const [justMine, setJustMine] = useState(false);
   const { data: { data: user } = { data: null } } = useGetCurrentUserQuery();

   const loaded = useMemo(() => ({ skip: !route }), [route]);

   // const { data: { data: priorities } = { data: null } } = useGetTaskPrioritiesQuery(undefined, loaded);
   const { data: { data: project } = { data: null }, error } = useGetProjectQuery(route, loaded);

   const {
      data: { data: tasks } = { data: [] },
      isLoading,
      isSuccess,
      isError,
      refetch
   } = useGetAllTasksQuery({ slug: route }, { skip: !route || !(project) }); //  || !taskStages?.length

   const stagedTasks = useMemo(() => {
      const grouped = groupByObject(
         project?.flow?.possibleProjectStages as Required<Stage>[],
         tasks as (Record<PropertyKey, unknown> & TaskMultiple)[],
         'stage',
         (item) => {
            if (justMine && item.created_by !== user?.id) {
               return false;
            }
            if (filter.dateStart && item.begin) {

               const filterstart = new Date(filter.dateStart.startDate || 0).getTime();
               const filterend = new Date(filter.dateStart.endDate || '01.01.3000').getTime();

               const dateStart = new Date(item.begin).getTime();

               if (dateStart > filterend || dateStart < filterstart) {
                  return false;
               }
            }
            if (filter.dateEnd && item.deadline) {
               // 
               const filterstart = new Date(filter.dateEnd.startDate || 0).getTime();
               const filterend = new Date(filter.dateEnd.endDate || '01.01.3000').getTime();

               const deadline = new Date(item.deadline).getTime();

               if (deadline < filterstart || deadline > filterend) {
                  return false;
               }
            }
            if (filter.selectedTags) {
               if (!filter.selectedTags.some(v => v.id === item.component)) {
                  return false;
               }
            }
            return true;
         }
      );
      return grouped;
   }, [tasks, project?.flow?.possibleProjectStages, justMine]);

   return { tasks, stagedTasks, project, user, tasksRefetch: refetch, showJustMine: setJustMine, isLoading, isSuccess, isError };
}