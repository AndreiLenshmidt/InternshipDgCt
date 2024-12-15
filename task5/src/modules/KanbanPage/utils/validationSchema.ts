import { z } from 'zod'

export const tasksFilterFormSchema = z.object({
   taskName: z.string().optional(),
   selectedUsers: z
      .array(
         z.object({
            id: z.number(),
            name: z.string(),
            surname: z.string(),
            email: z.string(),
         })
   ),
   selectedTypes: z.array(
      z.object({
         id: z.number().optional(),
         name: z.string().optional(),
      })
   ),
   selectedTags: z.array(
      z.object({
         id: z.number().optional(),
         name: z.string().optional(),
      })
   )   
})