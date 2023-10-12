import { z } from 'zod';

export const createIssuesSchema = z.object({
  title: z.string().min(1, 'Title Required').max(255),
  description: z.string().min(1, 'Description cannot empty')
});
