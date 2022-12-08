/** @format */

import { marked } from 'marked'
import { IUserData, IPayload } from '@/types/user'
import jwt_decode from 'jwt-decode'

export const compiledMarked = (text: string) => marked(text)

export const setLocalStorage = (key: string, data: any) => {
	console.log('setLocalStorage', data)
	localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorage = (key: string): any => {
	const data = localStorage.getItem(key)
	if (data) return { payload: JSON.parse(data) }
	return { payload: undefined }
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

export const getUserId = (token: string | undefined) => {
	if (token) {
		const user: any = jwt_decode(token)
		return user?.user_id
	}
	return undefined
}

export const getUserData = ({
	firstName,
	lastName,
	email,
	displayName,
	photoUrl,
	localId,
	refreshToken,
	access_token,
	isAuth,
	expires_in
}: {
	firstName: string | undefined
	lastName: string | undefined
	email: string | undefined
	displayName: string | undefined
	photoUrl: string | undefined
	localId: string | undefined
	refreshToken: string | undefined
	access_token: string | undefined
	isAuth: boolean | undefined
	expires_in: string | undefined
}): IUserData => {
	const user = {} as IUserData
	user.firstName = firstName
	user.lastName = lastName
	user.email = email
	user.displayName = displayName
	user.photoUrl = photoUrl
	user.user_id = localId
	user.refreshToken = refreshToken
	user.access_token = access_token
	user.isAuth = isAuth
	return user
}

export function observeObject() {
	var _class = {
		init: function (selector: any, callback: any) {
			var element = document.querySelector(selector)
			console.log('element', element)

			try {
				var observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						callback(mutation.target, mutation.attributeName, mutation.oldValue)
					})
				})

				observer.observe(element, {
					attributes: true,
					subtree: true,
					attributeOldValue: true
				})
			} catch (z) {
				// element.addEventListener(
				// 	'DOMAttrModified',
				// 	function (e: any) {
				// 		callback(e.target, e.attrName, e.prevValue)
				// 	},
				// 	false
				// )
			}
		}
	}
	return _class
}
