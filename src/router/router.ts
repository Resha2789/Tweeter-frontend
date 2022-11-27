/** @format */

import { createRouter, createWebHashHistory } from 'vue-router'

import login from '@/router/middleware/login'

import HomePage from '@/pages/home.vue'
import AboutPage from '@/pages/about.vue'
import NotFound from '@/pages/notFound.vue'
import loginPage from '@/pages/login/login.vue'
import { auth } from '@/servises/auth'
import { IUserData } from '@/types/User'

const history = createWebHashHistory()

const childrenHome = [
	{
		path: '/login',
		component: loginPage
	}
]

const childrenAbout = [
	{
		path: '/about/login',
		component: loginPage
	}
]

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomePage,
		children: childrenHome
		// meta: {
		// 	middleware: [login]
		// }
	},
	{
		path: '/about',
		name: 'about',
		component: AboutPage,
		children: childrenAbout
		// meta: {
		// 	middleware: [login]
		// }
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: NotFound
	}
]

const router = createRouter({
	routes,
	history
})

router.beforeEach(async (to, from, next) => {
	console.log('beforeEach')
	var user = {} as IUserData
	await auth()
		.then((userData: IUserData) => {
			user = userData
		})
		.catch(e => console.log('auth error'))

	console.log('auth', user)
	if (!user.auth) {
		// if (!to.meta.middleware) {
		// 	console.log('not middleware')
		// 	return next()
		// }
		// const middleware: any = to.meta.middleware
		// console.log(middleware)
		// const context = {
		// 	to,
		// 	from,
		// 	next
		// }
		// return middleware[0]({ ...context })
	}

	if (user.auth && to.path == '/login') {
		console.log(to.path)
		return next({ path: '/' })
	}

	console.log('to.path', to.path)
	if (!user.auth && to.path !== '/login' && to.path !== '/about/login') {
		if (to.path !== '/login') next({ path: '/login' })
		if (to.path !== '/about/login') next({ path: '/about/login' })
	} else {
		return next()
	}
})

export default router
