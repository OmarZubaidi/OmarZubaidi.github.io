import { ZodError } from 'zod';
import projectDetails from '../assets/projectDetails.json' assert { type: 'json' };
import { Errors, type ProjectId } from '../constants';
import { ProjectDetailsSchema, type ProjectDetails } from '../types/ProjectDetails';

export default function getProjectDetails(id: ProjectId): ProjectDetails {
  const maybeProjectDetails = projectDetails[id] as unknown;
  if (!maybeProjectDetails) {
    throw new Error(Errors.ProjectNotFound);
  }
  try {
    const parsedProjectDetails = ProjectDetailsSchema.parse(maybeProjectDetails);
    return parsedProjectDetails;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Project data validation failed:', error.issues);
      throw new Error(Errors.InvalidProjectData);
    }
    throw error;
  }
}
