/** @format */
import { httpOAuthIDGoogle, httpGetAccessToken } from '@/http-common'
import { requestUri, webAPIkey, client_id, providerId } from '@/_config'
import { getUserData, setLocalStorage } from '@/Utils/utils'
import { IUserData } from '@/types/user'

import store from '@/store/index'
declare var google: any

export const loginAuthGoogle = async () => {
	await google.accounts.id.initialize({
		client_id,
		callback: handleCredentialResponse
	})

	await google.accounts.id.renderButton(
		document.getElementById('login'),
		{
			theme: 'filled_blue',
			size: 'large',
			logo_alignment: 'center',
			shape: 'pill'
		} // customization attributes
	)
	google.accounts.id.prompt() // also display the One Tap dialog
}

const handleCredentialResponse = async (response: any) => {
	console.log('Encoded JWT ID token: ' + response.credential)
	var user = {} as IUserData
	await httpOAuthIDGoogle
		.post(`accounts:signInWithIdp?key=${webAPIkey}`, {
			postBody: `id_token=${response.credential}&providerId=${providerId}`,
			requestUri,
			returnIdpCredential: true,
			returnSecureToken: true
		})
		.then(async ({ status, data }) => {
			//console.log('handleCredentialResponse', status)
			user = getUserData(data)
			await handleAccessToken(user).then(userData => {
				console.log('handleAccessToken successful')
				user = userData
			})
		})
		.catch(e => console.log(e))

	return new Promise((resolve, reject) => {
		console.log('Promise handleCredentialResponse')
		resolve(user)
	})
}

export const handleAccessToken = async (user: IUserData): Promise<IUserData> => {
	await httpGetAccessToken
		.post('token?key=AIzaSyDtl-sJ1HRn69RR7mkIRWi0MUxgQ8UV3lU', {
			grant_type: 'refresh_token',
			refresh_token: user.refreshToken
		})
		.then(({ status, data }) => {
			console.log('handleAccessToken ', status)
			const payLoad = getUserData(data)
			user.isAuth = true
			user.access_token = payLoad.access_token
			store.dispatch('setUser', user)
			setLocalStorage('user', user)
		})
		.catch(e => console.log(e))

	return new Promise((resolve, reject) => {
		console.log('Promise handleAccessToken')
		resolve(user)
	})
}
