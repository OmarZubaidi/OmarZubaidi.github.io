import type { CSSProperties } from 'react';
import { Errors, projectIds, type ProjectId } from '../constants';
import getProjectDetails from '../helpers/getProjectDetails';

interface ExampleProjectsProps {
  /** The IDs of the projects to display details for. */
  ids: ProjectId[];
  /** The width of the component. Defaults to '400px'. */
  width?: CSSProperties['width'];
}

const SCATTER_STYLES: { rotate: number; topOffset: string; leftOffset: string }[] = [
  { rotate: 5, topOffset: '3%', leftOffset: '20%' },
  { rotate: 15, topOffset: '25%', leftOffset: '2%' },
  { rotate: -22, topOffset: '31%', leftOffset: '44%' },
];

/**
 * Example projects component
 *
 * Displays multiple example projects in a scattered, overlapping card layout.
 */
export default function ExampleProjects({ ids, width = '400px' }: ExampleProjectsProps) {
  if (!ids.every((id) => projectIds.includes(id))) {
    throw new Error(Errors.ProjectNotFound);
  }
  if (new Set(ids).size !== ids.length) {
    throw new Error(Errors.ProjectIdNotUnique);
  }

  const projectDetailsMap = new Map(ids.map((id) => [id, getProjectDetails(id)]));

  return (
    <div aria-label="Screenshots of example projects overlapping each other" role="group" style={{ maxWidth: width }}>
      {/* div in a div to use percentages */}
      <div
        style={{
          position: 'relative',
          paddingBlockStart: '65%',
        }}
      >
        {ids.map((id, index) => {
          const { rotate, topOffset, leftOffset } = SCATTER_STYLES[index % SCATTER_STYLES.length];
          return (
            <img
              key={id}
              src={new URL(`../assets/project-photos/${id}.png`, import.meta.url).href}
              // ids are validated then mapped
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              alt={`${projectDetailsMap.get(id)!.title} screenshot`}
              style={{
                border: '1px solid var(--color-gray-2)',
                position: 'absolute',
                top: topOffset,
                left: leftOffset,
                width: '50%',
                zIndex: index,
                transform: `rotate(${rotate.toString()}deg)`,
                transformOrigin: 'center center',
                borderRadius: 'var(--border-radius-sm)',
                boxShadow: '0 1rem 4rem var(--color-text)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
