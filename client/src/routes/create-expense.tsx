import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/create-expense')({
	component: createExpense
})

function createExpense() {
	return (
		<div className="p=2">
			<h2>Create Expense</h2>
			<form className="max-w-xl m-auto">
				<Label htmlFor="title">Title</Label>
				<Input type="text" id="title" name="title" />
				<Label htmlFor="amount">Amount</Label>
				<Input type="number" id="amount" name="amount" />
				<Button className="mt-4" type="submit">
					Create Expense
				</Button>
			</form>
		</div>
	)
}
