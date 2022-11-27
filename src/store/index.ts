/** @format */

import { createStore } from 'vuex'
import { IUser, IUserData, ILoginForm } from '@/types/User'

export default createStore<IUser>({
	state: {
		user: {
			user_id: '',
			auth: false,
			firstName: '',
			lastName: '',
			email: '',
			displayName: '',
			photoUrl: '',
			refreshToken: '',
			access_token: '',
			expires_in: ''
		},
		loginForm: {
			visible: false
		}
	},

	modules: {},

	getters: {
		getUser({ user }) {
			console.log('getUser', user)
			return user
		},
		getLoginForm({ loginForm }) {
			console.log('loginForm', loginForm)
			return loginForm
		}
	},
	mutations: {
		setUser(state, value: IUserData) {
			state.user = value
			console.log('setUser', state.user)
		},
		setLoginForm(state, value: ILoginForm) {
			state.loginForm = value
			console.log('setLoginForm', state.loginForm)
		}
	},
	actions: {
		setUser({ commit }, value: IUserData) {
			commit('setUser', value)
		},
		setLoginForm({ commit }, value: ILoginForm) {
			commit('setLoginForm', value)
		}
	}
})
