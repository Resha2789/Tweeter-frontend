/** @format */

export const process = {
	dev: true
}

export const site = {
	home: process.dev ? 'http://localhost:8080/' : 'http://192.168.92.133:8080/'
}

export const app = {
	title: 'Tweeter'
}

export const links = [
	{
		title: 'Home',
		alias: 'home',
		url: '/'
	},
	{
		title: 'About',
		alias: 'about',
		url: '/about/'
	}
]

export const requestUri = 'http://localhost'
export const webAPIkey = 'AIzaSyDtl-sJ1HRn69RR7mkIRWi0MUxgQ8UV3lU'
export const client_id =
	'637559037896-8hpfm4n8e77aq916jlmpd128a0skggl2.apps.googleusercontent.com'
export const providerId = 'google.com'
