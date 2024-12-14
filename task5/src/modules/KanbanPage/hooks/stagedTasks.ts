import { useGetCurrentUserQuery } from "@/api/appApi";
import { Stage, TaskMultiple, User } from "@/api/data.types";
import { useGetAllTasksQuery } from "@/api/tasks/tasks.api";
import { useGetProjectQuery } from "@/modules/ProjectsPage/api/api";
import { groupByObject } from "@/utils/core";
import { useMemo, useState } from "react";

/**
 * 
 * @param route - current route (to get project slug)
 * @param user - current user data
 * @param justMine  
 * @returns - staged tasks
 */
export function useStagedTasks(route: string) {

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
   } = useGetAllTasksQuery(route, { skip: !route || !(project) }); //  || !taskStages?.length

   const stagedTasks = useMemo(() => {
      const grouped = groupByObject(
         project?.flow?.possibleProjectStages as Required<Stage>[],
         tasks as (Record<PropertyKey, unknown> & TaskMultiple)[],
         'stage',
         justMine ? (item) => item.created_by === user?.id : undefined
      );
      return grouped;
   }, [tasks, project?.flow?.possibleProjectStages, justMine]);

   return { tasks, stagedTasks, project, setJustMine, isLoading, isSuccess, isError };
}