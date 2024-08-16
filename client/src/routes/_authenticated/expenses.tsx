import {
	deleteExpense,
	getAllExpensesQueryOptions,
	loadingCreateExpenseQueryOptions
} from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated/expenses')({
	component: Expenses
})

function Expenses() {
	const { isPending, error, data } = useQuery(getAllExpensesQueryOptions)
	const { data: loadingCreateExpense } = useQuery(
		loadingCreateExpenseQueryOptions
	)
	if (error) return 'An error has occurred: ' + error.message

	return (
		<div className="p-2 max-w-3xl m-auto">
			<Table>
				<TableCaption>A list of your expenses.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Title</TableHead>
						<TableHead className="text-right">Amount</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Delete</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loadingCreateExpense?.expense && (
						<TableRow>
							<TableCell>
								<Skeleton className="h-4" />
							</TableCell>
							<TableCell>
								{loadingCreateExpense?.expense.title}
							</TableCell>
							<TableCell className="text-right">
								{loadingCreateExpense?.expense.amount}
							</TableCell>
							<TableCell>
								{loadingCreateExpense?.expense.date}
							</TableCell>
							<TableCell>
								<Skeleton className="h-4" />
							</TableCell>
						</TableRow>
					)}
					{isPending
						? Array(3)
								.fill(0)
								.map((_, i) => (
									<TableRow key={i}>
										<TableCell className="font-medium">
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
									</TableRow>
								))
						: data?.expenses.map((expense) => (
								<TableRow key={expense.id}>
									<TableCell className="font-medium">
										{expense.id}
									</TableCell>
									<TableCell>{expense.title}</TableCell>
									<TableCell className="text-right">
										{expense.amount}
									</TableCell>
									<TableCell>{expense.date}</TableCell>
									<TableCell>
										<ExpenseDeleteButton id={expense.id} />
									</TableCell>
								</TableRow>
							))}
				</TableBody>
			</Table>
		</div>
	)
}

function ExpenseDeleteButton({ id }: { id: number }) {
	const mutation = useMutation({
		mutationFn: deleteExpense,
		onError: () => {
			toast('Error', { description: `Failed to delete expense: ${id}` })
		},
		onSuccess: () => {
			toast('Expense Deleted', {
				description: `Successfully deleted expense: ${id}`
			})
		}
	})

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={() => mutation.mutate({ id })}
		>
			<Trash className="h-4 w-4" />
		</Button>
	)
}
