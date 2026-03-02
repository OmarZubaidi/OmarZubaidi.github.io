import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { Errors, projectIds, type ProjectId } from '../constants';
import getProjectDetails from '../helpers/getProjectDetails';

interface ProjectOverviewProps {
  /** The ID of the project to display details for. */
  id: ProjectId;
  /** The height of the project image. */
  imageHeight?: CSSProperties['height'];
  /** The width of the project image. */
  width?: CSSProperties['width'];
}

/**
 * Project overview component
 *
 * Displays an overview of a project based on its ID.
 */
export default function ProjectOverview({ id, imageHeight = 'auto', width = 'auto' }: ProjectOverviewProps) {
  const projectId = id;

  if (!projectIds.includes(projectId)) {
    throw new Error(Errors.ProjectNotFound);
  }
  const projectDetails = getProjectDetails(projectId);

  return (
    <div
      style={{
        maxWidth: width,
        border: '1px solid var(--color-gray)',
        borderRadius: 'var(--border-radius-lg)',
        paddingBlockEnd: 'var(--padding)',
      }}
    >
      <img
        src={new URL(`../assets/project-photos/${projectId}.png`, import.meta.url).href}
        alt={`${projectDetails.title} screenshot`}
        style={{
          width: '100%',
          height: imageHeight,
          borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0',
        }}
      />
      <div
        style={{
          display: 'flex',
          marginInline: 'var(--margin)',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <p style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{projectDetails.title}</p>
          <p>{projectDetails.description}</p>
        </div>
        <Link
          to={`/projects/${projectId}`}
          aria-label={`View ${projectDetails.title} details`}
          className="glowing-border"
          style={{
            cursor: 'pointer',
            textDecoration: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            flexShrink: 0,
            display: 'grid',
            placeContent: 'center',
            marginInlineStart: 'var(--margin)',
            fontWeight: 'bolder',
            fontSize: '1.25rem',
            color: 'var(--color-text)',
          }}
        >
          {'>'}
        </Link>
      </div>
    </div>
  );
}
