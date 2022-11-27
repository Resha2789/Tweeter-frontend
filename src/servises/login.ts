/** @format */

import { httpOAuthIDGoogle, httpGetAccessToken } from '@/http-common'
import { requestUri, webAPIkey, client_id, providerId } from '@/_config'
import { IUserData } from '@/types/User'
import { getLocalStorage, setLocalStorage, getUserData } from '@/Utils/utils'
import { loginAuthGoogle } from '@/servises/apiGoogle'
import jwt_decode from 'jwt-decode'
import store from '@/store/index'

export const login = (): void => {
	loginAuthGoogle()
}
