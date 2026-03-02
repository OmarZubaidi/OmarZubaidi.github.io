import { describe, expect, it, vi } from 'vitest';
import type { ProjectId } from '../constants';
import { ProjectDetailsSchema } from '../types/ProjectDetails';
import getProjectDetails from './getProjectDetails';

const MOCK_PROJECT_DETAILS = vi.hoisted(() => ({
  'project 1': {
    title: 'project 1',
    description: 'short description 1',
  },
  'project 2': {
    title: 'project 2',
    description: 'short description 2',
  },
  invalid: {
    title: 'not a valid project',
    description: 1,
  },
}));
vi.mock('../assets/projectDetails.json', () => ({
  default: MOCK_PROJECT_DETAILS,
}));

describe('getProjectDetails function', () => {
  it('throws when the project ID does not exist', () => {
    expect.hasAssertions();

    expect(() => getProjectDetails('non-existent' as ProjectId)).toThrow('Project with the specified ID not found.');
  });

  it('throws when the project data fails schema validation', () => {
    expect.hasAssertions();
    expect(() => getProjectDetails('invalid' as ProjectId)).toThrow('Invalid project data.');
  });

  it('throws when an unexpected error occurs during parsing', () => {
    expect.hasAssertions();

    vi.spyOn(ProjectDetailsSchema, 'parse').mockImplementationOnce(() => {
      throw new Error('Unexpected parsing error');
    });

    expect(() => getProjectDetails('project 1' as ProjectId)).toThrow('Unexpected parsing error');

    vi.restoreAllMocks();
  });

  it('returns parsed project details for a valid ID', () => {
    expect.hasAssertions();

    const result = getProjectDetails('project 1' as ProjectId);

    expect(result).toMatchObject({
      title: 'project 1',
      description: 'short description 1',
    });
  });
});
