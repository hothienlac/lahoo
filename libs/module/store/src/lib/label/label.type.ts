import { z } from 'zod';

export const labelSchema = z.object({
    labelId: z.string(),
    labelName: z.string(),
    labelValue: z.string(),
});
export const labelsSchema = z.array(labelSchema);
export type Label = z.infer<typeof labelSchema>;
export type Labels = Label[];

export const createLabelRequestSchema = z.object({
    labelName: z.string(),
    labelValue: z.string(),
});
export type CreateLabelRequest = z.infer<typeof createLabelRequestSchema>;
