import { z } from 'zod'

export const projectsFilterFormSchema = z.object({
   projectName: z.string(), // .optional(),
   taskId: z.number()  // .min(1, { message: 'Номер задачи не может быть отрицательным числом' })  // .optional()
})



// .refine((data) => data.name || data.taskId, {
//    // https://github.com/colinhacks/zod#customize-error-path
//    path: ['name'],
//    message: '',
// })