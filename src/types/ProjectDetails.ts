import { z } from 'zod';

export const ProjectDetailsSchema = z
  .object({
    title: z.string(),
    description: z.string(),
  })
  .strict();

export const AllProjectsSchema = z.record(z.string(), ProjectDetailsSchema);

export type ProjectDetails = z.infer<typeof ProjectDetailsSchema>;
export type AllProjects = z.infer<typeof AllProjectsSchema>;
