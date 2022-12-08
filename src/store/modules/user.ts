/** @format */

import { IUser, IUserData } from '@/types/user'

const state: IUser = {
	user: {
		user_id: undefined,
		isAuth: false,
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		displayName: undefined,
		photoUrl: undefined,
		refreshToken: undefined,
		access_token: undefined,
		expires_in: undefined
	}
}

const getters = {
	getUser({ user }: { user: IUser }) {
		console.log('Store getUser', user)
		return user
	}
}

const mutations = {
	setUser(state: IUser, value: IUserData) {
		state.user = value
		console.log('Store mutations setUser 99', state.user)
	}
}

const actions = {
	setUser({ commit }: { commit: any }, value: IUserData) {
		commit('setUser', value)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
