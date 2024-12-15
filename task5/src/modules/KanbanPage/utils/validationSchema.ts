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
   ),
   dateStart: z
      .object({
         startDate: z
            .string()
            .optional()
            .nullable()
            .transform((value) => (value ? new Date(value).toISOString() : null)),
         endDate: z
            .string()
            .optional()
            .nullable()
            .transform((value) => (value ? new Date(value).toISOString() : null)),
      })
      .refine(
         (value) => {
            // Проверка: либо обе даты заданы, либо обе отсутствуют
            const bothDatesEmpty = !value.startDate && !value.endDate;
            const bothDatesPresent = value.startDate && value.endDate;
            return bothDatesEmpty || bothDatesPresent;
         },
         {
            message: 'Заполните обе даты или оставьте их пустыми',
         }
      ),   
})