import {
	createKindeServerClient,
	GrantType,
	type SessionManager,
	type UserType
} from '@kinde-oss/kinde-typescript-sdk'
import type { Context } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { createFactory, createMiddleware } from 'hono/factory'

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
	GrantType.AUTHORIZATION_CODE,
	{
		authDomain: process.env.KINDE_DOMAIN!,
		clientId: process.env.KINDE_CLIENT_ID!,
		clientSecret: process.env.KINDE_CLIENT_SECRET!,
		redirectURL: process.env.KINDE_REDIRECT_URI!,
		logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URL!
	}
)

export const sessionManager = (c: Context): SessionManager => ({
	async getSessionItem(key: string) {
		const result = getCookie(c, key)
		return result
	},

	// Token stored in cookies
	async setSessionItem(key: string, value: unknown) {
		const cookieOptions = {
			// can't be accessed by JS
			httpOnly: true,
			// SSL connection
			secure: true,
			// avoid cross-site forgery attacks
			sameSite: 'Lax'
		} as const
		// Making sure token can be set as cookie
		if (typeof value === 'string') {
			setCookie(c, key, value, cookieOptions)
		} else {
			setCookie(c, key, JSON.stringify(value), cookieOptions)
		}
	},
	// Delete item out of cookie if session is removed or destroyed
	async removeSessionItem(key: string) {
		deleteCookie(c, key)
	},
	async destroySession() {
		;['id_token', 'access_token', 'user', 'refresh_token'].forEach(
			(key) => {
				deleteCookie(c, key)
			}
		)
	}
})

type Env = {
	Variables: {
		user: UserType
	}
}
// Middleware function for getting user
export const getUser = createMiddleware<Env>(async (c, next) => {
	try {
		const manager = sessionManager(c)
		const isAuthenticated = await kindeClient.isAuthenticated(manager)
		// 401 error if not authenticated
		if (!isAuthenticated) {
			const user = await kindeClient.getUser(sessionManager(c))
			return c.json({ error: 'Unauthorized' }, 401)
		}
		// return user details if authenticated
		const user = await kindeClient.getUserProfile(manager)
		c.set('user', user)
		await next()
	} catch (e) {
		console.error(e)
		return c.json({ error: 'Unauthorized' }, 401)
	}
})
