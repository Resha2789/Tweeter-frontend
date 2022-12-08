/** @format */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import HeaderPage from '@/components/header.vue'
import FooterPage from '@/components/footer.vue'
import HomePage from '@/pages/home.vue'
import AboutPage from '@/pages/about.vue'
import NotFound from '@/pages/notFound.vue'
import TestPage from '@/pages/test.vue'
import loginPage from '@/components/auth/login.vue'
import { authUser, logout } from '@/router/middleware/auth'

const history = createWebHashHistory()

const routes: Array<any | RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		components: {
			default: HomePage,
			HeaderPage,
			FooterPage
		},
		children: [
			{
				path: 'login',
				component: loginPage
			}
		]
	},
	{
		path: '/about/',
		name: 'about',
		components: {
			default: AboutPage,
			HeaderPage,
			FooterPage
		},
		children: [
			{
				path: '/about/login',
				component: loginPage
			}
		]
	},
	{
		path: '/test',
		name: 'test',
		component: TestPage
	},
	{
		path: '/:pathMatch(.*)*/logout',
		name: 'logout',
		component: ''
	},

	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: NotFound
	}
]

const router = createRouter({
	history,
	routes
})

router.beforeEach(async (to: any, from: any, next: any) => {
	next = await authUser({ to, from, next })
	next = logout({ to, from, next })

	return next()
})

export default router
