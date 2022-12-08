/** @format */
import store from '@/store/index'
import { auth } from '@/servises/auth'
import { IUserData } from '@/types/user'

export const authUser = async ({ to, from, next }: { to: any; from: any; next: Function }) => {
	console.log('middleware', from.path, to.path)
	var user = {} as IUserData
	await auth()
		.then((userData: IUserData) => {
			console.log('isAuth checked', userData)
			user = userData
		})
		.catch(e => console.log('isAuth error'))
	return next
}

export const logout = ({ to, from, next }: { to: any; from: any; next: Function }): Function => {
	if (to.name == 'logout') {
		var user = {} as IUserData
		user.isAuth = false
		store.dispatch('setUser', user)
		localStorage.removeItem('user')
		console.log('from.name', from.name)
		return next({ name: from.name })
	}
	return next
}
