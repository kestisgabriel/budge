import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export const Route = createFileRoute('/profile')({
	component: Profile
})

async function getCurrentUser() {
	const res = await api.me.$get()
	if (!res.ok) {
		throw new Error('server error')
	}
	const data = await res.json()
	return data
}

function Profile() {
	const { isPending, error, data } = useQuery({
		queryKey: ['get-current-user'],
		queryFn: getCurrentUser
	})
	if (isPending) return 'loading'
	if (error) return 'not logged in'

	return <div className="p-2">Hello {data.user.family_name}</div>
}
