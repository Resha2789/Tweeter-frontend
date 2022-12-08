/** @format */

import { createStore } from 'vuex'
import user from '@/store/modules/user'
import tweets from '@/store/modules/tweets'
// import { IUser, IUserData, ILoginForm } from '@/types/user'

export default createStore({
	modules: { user, tweets }
})
