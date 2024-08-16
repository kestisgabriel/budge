import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import {
	createExpense,
	getAllExpensesQueryOptions,
	loadingCreateExpenseQueryOptions
} from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { createExpenseSchema } from '@server/formSchemas'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated/create-expense')({
	component: CreateExpense
})

function CreateExpense() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const form = useForm({
		validatorAdapter: zodValidator(),
		defaultValues: {
			title: '',
			amount: '0',
			date: new Date().toISOString().split('T')[0] // YYYY-MM-DD by splitting around T: YYYY-MM-DDTHH:mm:ss
		},
		onSubmit: async ({ value }) => {
			// grab all existing expenses locally if available || or fetch from server
			const existingExpenses = await queryClient.ensureQueryData(
				getAllExpensesQueryOptions
			)
			// navigate to expenses and show loading state
			navigate({ to: '/expenses' })
			queryClient.setQueryData(
				loadingCreateExpenseQueryOptions.queryKey,
				{
					expense: value
				}
			)
			try {
				// get newExpense object by calling createExpense from server
				const newExpense = await createExpense({ value })
				// update local cache to include the new expense
				queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
					// add newExpense to beginning of expenses array (reverse chronological)
					...existingExpenses,
					expenses: [newExpense, ...existingExpenses.expenses]
				})
				toast('Expense Created', {
					description: `Success! ${newExpense.id}: ${newExpense.title} created`
				})
			} catch (error) {
				console.error(error)

				toast('Error', {
					description: 'Failed to create new expense'
				})
			} finally {
				queryClient.setQueryData(
					loadingCreateExpenseQueryOptions.queryKey,
					{}
				)
			}
		}
	})

	return (
		<div className="p-2">
			<h2>Create Expense</h2>
			<form
				className="flex flex-col gap-y-4 max-w-xl m-auto"
				onSubmit={async (e) => {
					e.preventDefault()
					e.stopPropagation()
					await form.handleSubmit()
				}}
			>
				<form.Field
					name="title"
					validators={{
						onChange: createExpenseSchema.shape.title
					}}
					children={(field) => (
						<div>
							<Label htmlFor={field.name}>Title</Label>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
							/>
							{field.state.meta.isTouched &&
							field.state.meta.errors.length ? (
								<em>{field.state.meta.errors.join(', ')}</em>
							) : null}
							{field.state.meta.isValidating
								? 'Validating...'
								: null}
						</div>
					)}
				/>
				<form.Field
					name="amount"
					validators={{
						onChange: createExpenseSchema.shape.amount
					}}
					children={(field) => (
						<div>
							<Label htmlFor={field.name}>Amount</Label>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								type="number"
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
							/>
							{field.state.meta.isTouched &&
							field.state.meta.errors.length ? (
								<em>{field.state.meta.errors.join(', ')}</em>
							) : null}
							{field.state.meta.isValidating
								? 'Validating...'
								: null}
						</div>
					)}
				/>
				<form.Field
					name="date"
					validators={{
						onChange: createExpenseSchema.shape.date
					}}
					children={(field) => (
						<div className="self-center">
							<Calendar
								mode="single"
								selected={new Date(field.state.value)}
								onSelect={(date) =>
									field.handleChange(
										date
											? date.toLocaleDateString('en-CA') // hacky solution, stealing canadian time format YYYY-MM-DD
											: ''
									)
								}
								className="rounded-md border"
							/>
							{field.state.meta.isTouched &&
							field.state.meta.errors.length ? (
								<em>{field.state.meta.errors.join(', ')}</em>
							) : null}
							{field.state.meta.isValidating
								? 'Validating...'
								: null}
						</div>
					)}
				/>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							className="mt-4"
							disabled={!canSubmit}
						>
							{isSubmitting ? '...' : 'Create Expense'}
						</Button>
					)}
				/>
			</form>
		</div>
	)
}
