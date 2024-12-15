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
      )   
})