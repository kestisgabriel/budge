import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/delete-expense')({
	component: () => <div>Hello /delete-expense!</div>,
});
