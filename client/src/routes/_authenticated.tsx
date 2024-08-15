import { createFileRoute, Outlet } from '@tanstack/react-router'
import { userQueryOptions } from '@/lib/api'

const Login = () => {
	return <div>You have to log in</div>
}

const Component = () => {
	const { user } = Route.useRouteContext()
	if (!user) {
		return <Login />
	}

	return <Outlet />
}

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
	beforeLoad: async () => {
		// userQueryOptions
		// check if user is logged in
		// return { user: null }
		return { user: { name: 'G' } }
	},
	component: Component
})
