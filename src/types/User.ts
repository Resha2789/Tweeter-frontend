/** @format */

export interface IUserData {
	user_id: string | undefined
	auth: boolean | undefined
	firstName: string | undefined
	lastName: string | undefined
	email: string | undefined
	displayName: string | undefined
	photoUrl: string | undefined
	refreshToken: string | undefined
	access_token: string | undefined
	expires_in: string | undefined
}

export interface ILoginForm {
	visible: boolean
}

export interface IUser {
	user: IUserData
	loginForm: ILoginForm
}

export interface IPayload {
	payload: any
}
