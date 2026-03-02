import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ProjectId } from '../constants';
import ExampleProjects from './ExampleProjects';

describe(ExampleProjects, () => {
  it('throws when the project IDs are invalid', () => {
    expect.hasAssertions();
    expect(() => {
      render(<ExampleProjects ids={['invalid-id'] as unknown as ProjectId[]} />);
    }).toThrow('Project with the specified ID not found.');
  });

  it('throws when the project IDs are not unique', () => {
    expect.hasAssertions();
    expect(() => {
      render(<ExampleProjects ids={['portfolio', 'portfolio'] as unknown as ProjectId[]} />);
    }).toThrow('Project IDs must be unique.');
  });
});
