/** @format */

import jwt_decode from 'jwt-decode'
import { getLocalStorage, expireTime, getUserData } from '@/Utils/utils'
import { handleAccessToken } from '@/servises/apiGoogle'
import store from '@/store/index'

import { IUser, IUserData, IPayload } from '@/types/User'

export const auth = async (): Promise<IUserData> => {
	console.log('auth')
	var user = {} as IUserData
	user = store.getters.getUser
	//check user access token
	if (!user.access_token) {
		console.log('auth getLocalStorage')
		const data: IPayload = getLocalStorage('User')
		user = data.payload
		console.log('auth', data)
		// console.log(data.payload?.access_token)
		// console.log(data.payload?.refreshToken)

		//check payload access token and refresh token
		if (data.payload?.access_token || data.payload?.refreshToken) {
			//check expire time access token
			const exp = expireTime(data.payload.access_token)
			console.log('check expire')
			if (exp) {
				user.refreshToken = data.payload?.refreshToken
				await handleAccessToken(user).then(userData => {
					console.log('user', userData)
					user = userData
				})
			} else {
				user.auth = true
			}
		}
	} else {
		const exp = expireTime(user.access_token)
		console.log('check expire')
		if (exp) {
			await handleAccessToken(user).then(userData => {
				console.log('user', userData)
				user.access_token = userData.access_token
				user.auth = true
			})
		} else {
			user.auth = true
		}
	}
	console.log('exit', user.auth)

	return new Promise((resolve, reject) => {
		console.log('Promise')
		resolve(user)
	})
}
