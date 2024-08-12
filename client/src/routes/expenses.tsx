import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses')({
	component: () => <div>Show All Expenses</div>
})
