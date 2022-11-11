/** @format */

import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '@/pages/home.vue'
import AboutPage from '@/pages/about.vue'
import NotFound from '@/pages/notFound.vue'

const history = createWebHashHistory()

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomePage
	},
	{
		path: '/about',
		name: 'about',
		component: AboutPage
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

export default router
