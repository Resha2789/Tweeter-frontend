/** @format */

import { marked } from 'marked'
import { IUserData, IPayload } from '@/types/User'
import jwt_decode from 'jwt-decode'

export const compiledMarked = (text: string) => marked(text)

export const setLocalStorage = (key: string, data: IUserData) => {
	console.log('setLocalStorage', data)
	localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorage = (key: string): IPayload => {
	const data = localStorage.getItem('user')
	if (data) return { payload: JSON.parse(data) }
	return { payload: {} }
}

export const expireTime = (token: string) => {
	const currentTime = Math.floor(Date.now() / 1000)
	const expireTokenTime: any = jwt_decode(token)
	if (currentTime >= expireTokenTime.exp) {
		return true
	} else {
		return false
	}
}

export const getUserData = ({
	firstName,
	lastName,
	email,
	displayName,
	photoUrl,
	user_id,
	refreshToken,
	access_token,
	auth,
	expires_in
}: {
	firstName: string | undefined
	lastName: string | undefined
	email: string | undefined
	displayName: string | undefined
	photoUrl: string | undefined
	user_id: string | undefined
	refreshToken: string | undefined
	access_token: string | undefined
	auth: boolean | undefined
	expires_in: string | undefined
}): IUserData => {
	const user = {} as IUserData
	user.firstName = firstName
	user.lastName = lastName
	user.email = email
	user.displayName = displayName
	user.photoUrl = photoUrl
	user.user_id = user_id
	user.refreshToken = refreshToken
	user.access_token = access_token
	user.auth = auth
	return user
}
