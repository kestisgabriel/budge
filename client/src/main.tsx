import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import './index.css';

const queryClient = new QueryClient();

const router = createRouter({ routeTree, context: { queryClient } });
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	</QueryClientProvider>,
);
