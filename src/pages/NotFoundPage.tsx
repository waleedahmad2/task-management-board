import { JSX } from 'react';

import NotFound from '#/components/notFound/NotFound';

/**
 * 404 Not Found page component
 * Displays when user navigates to a non-existent route
 */
export default function NotFoundPage(): JSX.Element {
  return <NotFound />;
}
