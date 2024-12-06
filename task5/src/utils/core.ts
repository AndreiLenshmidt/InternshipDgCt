/**
 * @example: 
 * 
 * @param xs - [{task_type: 2}, {task_type: 2}, {task_type: 1}, ...]
 * @param key - task_type
 * @returns [[{task_type: 2}, {task_type: 2}], [{task_type: 1}]]
 */
 export function groupBy<T extends PropertyKey>(xs: Array<{ [k in T]?: PropertyKey } & Record<PropertyKey, unknown>>, key: T) {

   type GroupedType = { [k in T]?: PropertyKey } & Record<PropertyKey, unknown>;

   return (
      xs.reduce(function (acc, item) {
         const v = item[key] as PropertyKey;
                     
         (acc[v] = acc[v] || [] as GroupedType[]).push(item);

         return acc;
      }, {} as Record<PropertyKey, GroupedType[]>)
   );
};

