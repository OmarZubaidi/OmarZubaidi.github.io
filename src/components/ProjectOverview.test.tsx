import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ProjectId } from '../constants';
import ProjectOverview from './ProjectOverview';

describe(ProjectOverview, () => {
  it('throws error when both project ID is invalid', () => {
    expect.hasAssertions();
    expect(() => {
      render(<ProjectOverview id={'invalid-id' as ProjectId} />);
    }).toThrow('Project with the specified ID not found.');
  });
});
