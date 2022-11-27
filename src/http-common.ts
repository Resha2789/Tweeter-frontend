/** @format */

import axios from 'axios'

export const httpData = axios.create({
	baseURL:
		'https://tweeter-b25dd-default-rtdb.europe-west1.firebasedatabase.app/',
	headers: {
		'Content-Type': 'application/json'
	}
})

export const httpOAuthIDGoogle = axios.create({
	baseURL: 'https://identitytoolkit.googleapis.com/v1',
	headers: {
		'Content-Type': 'application/json'
	}
})

export const httpGetAccessToken = axios.create({
	baseURL: 'https://securetoken.googleapis.com/v1',
	headers: {
		'Content-Type': 'x-www-form-urlencoded'
	}
})
