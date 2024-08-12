import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

export const Route = createFileRoute('/expenses')({
	component: Expenses
})

async function getAllExpenses() {
	const res = await api.expenses.$get()
	if (!res.ok) {
		throw new Error('server error')
	}
	const data = await res.json()
	return data
}

function Expenses() {
	const { isPending, error, data } = useQuery({
		queryKey: ['get-all-expenses'],
		queryFn: getAllExpenses
	})

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
					</TableRow>
				</TableHeader>
				<TableBody>
					{isPending
						? '...'
						: data?.expenses.map((expense) => (
								<TableRow key={expense.id}>
									<TableCell className="font-medium">
										{expense.title}
									</TableCell>
									<TableCell>{expense.amount}</TableCell>
									<TableCell className="text-right">
										{expense.amount}
									</TableCell>
								</TableRow>
							))}
				</TableBody>
			</Table>
		</div>
	)
}
