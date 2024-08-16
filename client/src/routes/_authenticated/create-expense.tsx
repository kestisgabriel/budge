import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { api } from '@/lib/api'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { createExpenseSchema } from '@server/formSchemas'

export const Route = createFileRoute('/_authenticated/create-expense')({
	component: CreateExpense
})

function CreateExpense() {
	const navigate = useNavigate()
	const form = useForm({
		validatorAdapter: zodValidator(),
		defaultValues: {
			title: '',
			amount: '0'
		},
		onSubmit: async ({ value }) => {
			const res = await api.expenses.$post({ json: value })
			if (!res.ok) {
				throw new Error('Server error')
			}
			navigate({ to: '/expenses' })
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
