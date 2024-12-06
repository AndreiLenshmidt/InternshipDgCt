/**
 * @example: 
 * 
 * @param xs - [{task_type: 2}, {task_type: 2}, {task_type: 1}, ...]
 * @param key - task_type
 * @returns [[{task_type: 2}, {task_type: 2}], [{task_type: 1}]]
 */
export function groupBy<T extends PropertyKey>(xs: Array<{ [k in T]?: PropertyKey } & Record<PropertyKey, unknown>>, key: T) {

   type GroupedType = { [k in T]?: PropertyKey } & Record<PropertyKey, unknown>;

   return Object.entries(
      xs.reduce(function (acc, item) {
         const v = item[key] as PropertyKey;

         (acc[v] = acc[v] || [] as GroupedType[]).push(item);

         return acc;
      }, {} as Record<PropertyKey, GroupedType[]>)
   );
};


export function groupByObject<T extends PropertyKey, GroupedType extends { [k in T]?: PropertyKey }>(
   tarArr: Array<{ id: string | number } & Record<PropertyKey, unknown>>,
   arr: Array<GroupedType>,
   key: T) {

   if (!tarArr.length) return [];
   
   // type GroupedType = { [k in T]?: PropertyKey } & Record<PropertyKey, unknown>;

   const entries = Object.entries(
      arr.reduce(function (acc, item) {
         const v = item[key] as PropertyKey;

         (acc[v] = acc[v] || [] as GroupedType[]).push(item);

         return acc;
      }, {} as Record<PropertyKey, GroupedType[]>)
   )

   entries.map(v => {
      const numberId = Number.parseInt(v[0]);
      if (numberId) {
         // debugger
         (v as unknown[]).push(tarArr?.find(s => s.id === numberId))
      }
      else {
         // 
      }
   })

   return entries as unknown as [string, GroupedType[], typeof tarArr[number]][];
};
