/** @format */

import { getLocalStorage, expireTime, getUserId } from '@/Utils/utils'
import { handleAccessToken } from '@/servises/apiGoogle'
import store from '@/store/index'

import { IUser, IUserData, IPayload } from '@/types/user'

export const auth = async (): Promise<IUserData> => {
	console.log('Servise auth START')
	var user = {} as IUserData
	user = store.getters.getUser
	console.log('Servise auth store getUser', user.isAuth)

	//check user access token
	if (!user.access_token) {
		console.log('Servise auth getLocalStorage')
		const data: IPayload = getLocalStorage('user')
		user = data.payload
		console.log('Servise auth getLocalStorage payload', data)
		// console.log(data.payload?.access_token)
		// console.log(data.payload?.refreshToken)

		//check payload access token and refresh token
		if (data.payload?.access_token || data.payload?.refreshToken) {
			//check expire time access token
			const exp = expireTime(data.payload.access_token)
			console.log('Servise auth check expire')
			if (exp) {
				console.log('Servise auth token expired')
				user.refreshToken = data.payload?.refreshToken
				await handleAccessToken(user).then(userData => {
					console.log('user', userData)
					user = userData
				})
			} else {
				console.log('Servise auth token not expire', data)
				user.user_id = getUserId(user.access_token)
				user.isAuth = true
			}
		} else {
			console.log('Servise auth not find token', data)
			user = store.getters.getUser
			user.isAuth = false
		}
	} else {
		console.log('Servise isAuth isStore')
		const exp = expireTime(user.access_token)
		console.log('Servise isAuth check expire')
		if (exp) {
			console.log('Servise isAuth token expired')
			await handleAccessToken(user).then(userData => {
				console.log('Servise auth user', userData)
				user.access_token = userData.access_token
				user.user_id = getUserId(user.access_token)
				user.isAuth = true
			})
		} else {
			console.log('Servise auth token not expire')
			user.isAuth = true
		}
	}
	console.log('Servise auth END:', user.isAuth)

	return new Promise((resolve, reject) => {
		store.dispatch('setUser', user)
		resolve(user)
	})
}
