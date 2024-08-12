import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'

export const Route = createFileRoute('/create-expense')({
	component: CreateExpense
})

function CreateExpense() {
	const form = useForm({
		defaultValues: {
			title: '',
			amount: 0
		},
		onSubmit: async ({ value }) => {
			await new Promise((r) => setTimeout(r, 1000))
			console.log(value)
		}
	})

	return (
		<div className="p-2">
			<h2>Create Expense</h2>
			<form
				className="max-w-xl m-auto"
				onSubmit={async (e) => {
					e.preventDefault()
					e.stopPropagation()
					await form.handleSubmit()
				}}
			>
				<form.Field
					name="title"
					children={(field) => (
						<>
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
						</>
					)}
				/>
				<form.Field
					name="amount"
					children={(field) => (
						<>
							<Label htmlFor={field.name}>Amount</Label>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								type="number"
								onChange={(e) =>
									field.handleChange(Number(e.target.value))
								}
							/>
							{field.state.meta.isTouched &&
							field.state.meta.errors.length ? (
								<em>{field.state.meta.errors.join(', ')}</em>
							) : null}
							{field.state.meta.isValidating
								? 'Validating...'
								: null}
						</>
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
