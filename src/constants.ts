// erasableSyntaxOnly disallows enums
export const Errors = {
  // General
  RootElementNotFound: 'Root element not found.',
  // Hooks
  StateProviderMissing: 'State must be used within StateProvider',
  // Components
  ImageButtonMissingProps: 'ImageButton must have at least one of onClick or link defined',
  LogoCarouselNoLogos: 'LogoCarousel must have at least one logo.',
  LogoCarouselInvalidRows: 'LogoCarousel "rows" must be a positive integer (>= 1).',
  // Helpers
  ProjectNotFound: 'Project with the specified ID not found.',
  InvalidProjectData: 'Invalid project data.',
};
