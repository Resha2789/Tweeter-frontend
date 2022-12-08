/** @format */

import { ITweets, ITweetData } from '@/types/tweets'
import { compiledMarked, getLocalStorage, setLocalStorage } from '@/Utils/utils'
import { httpData } from '@/http-common'

const state: ITweets = {
	tweets: [
		{
			id: '',
			avatar: '',
			body: '',
			date: undefined,
			likes: 0,
			userId: ''
		}
	],
	sortBy: 'date'
}

const getters = {
	getTweets({ tweets }: { tweets: ITweetData }) {
		console.log('Store getTweets', tweets)
		return tweets
	},
	getSortBy({ sortBy }: { sortBy: string }) {
		console.log('Store getSortBy', sortBy)
		return sortBy
	}
}

const mutations = {
	setTweets(state: ITweets, value: any) {
		const nextData = value.slice().sort((a: any, b: any) => {
			if (a[state.sortBy] < b[state.sortBy]) return 1
			if (a[state.sortBy] > b[state.sortBy]) return -1
		})
		state.tweets = nextData
		console.log('Store mutations setTweets', state.tweets)
	},
	addTweet(state: ITweets, value: ITweetData) {
		if (state.tweets[0].date == undefined) {
			state.tweets[0] = value
		} else {
			state.tweets.push(value)
		}

		console.log('Store mutations addTweet', state.tweets)
	},
	updateTweet(state: ITweets, value: ITweetData) {
		const index = state.tweets.findIndex(e => e.id == value.id)
		state.tweets[index] = value
		console.log('Store mutations updateTweet', state.tweets[index])
	},
	deleteTweet(state: ITweets, value: ITweetData) {
		const index = state.tweets.findIndex(e => e.id == value.id)
		state.tweets.splice(index, 1)
		console.log('Store mutations deleteTweet', value)
	},
	setSortBy(state: ITweets, value: string) {
		state.sortBy = value
		console.log('Store mutations setSortBy', state.sortBy)
	}
}

const actions = {
	async sortBy({ state, getters, commit }: { state: ITweets; getters: any; commit: any }) {
		const nextData = getters.getTweets.slice().sort((a: any, b: any) => {
			if (a[state.sortBy] < b[state.sortBy]) return 1
			if (a[state.sortBy] > b[state.sortBy]) return -1
		})
		console.log('Store sortBy', nextData)
		commit('setTweets', nextData)
	},
	async getTweetsApi({ commit }: { commit: any }) {
		await httpData
			.get('/tweets.json')
			.then(res => {
				console.log('Store getTweetsApi', res.data)
				if (res.data) {
					const nextData: any = []
					Object.keys(res.data).forEach(key => {
						const item = res.data[key]
						nextData.push({ id: key, ...item })
					})
					commit('setTweets', nextData)
				}
			})
			.catch(e => console.log(e))
	},

	async createTweetApi({ dispatch, commit, rootGetters }: { dispatch: any; commit: any; rootGetters: any }, value: string) {
		const avatarUrl = () => {
			var nextAvatar = ''
			if (rootGetters.getUser.isAuth) {
				nextAvatar = rootGetters.getUser.photoUrl
			} else {
				nextAvatar = getLocalStorage('anonymous').payload
				if (!nextAvatar) {
					nextAvatar = `https://avatars.dicebear.com/api/male/${Date.now()}.svg`
					setLocalStorage('anonymous', nextAvatar)
				}
			}
			return nextAvatar
		}
		const userId = rootGetters.getUser.user_id
		await httpData
			.post('/tweets.json', {
				avatar: avatarUrl(),
				body: value,
				likes: 0,
				date: new Date(Date.now()).toLocaleString(),
				userId
			})
			.then(async ({ request: { response }, config: { data } }) => {
				const nextTweet = JSON.parse(data)
				nextTweet.id = JSON.parse(response).name
				commit('addTweet', nextTweet)
				await dispatch('sortBy')
			})
			.catch(e => console.log(e))
	},

	async setLikesApi({ getters, commit }: { getters: any; commit: any }, tweet: ITweetData) {
		tweet.likes++
		await httpData
			.put(`/tweets/${tweet.id}.json`, tweet)
			.then(() => {
				console.log('setLikesApi', tweet)
			})
			.catch(e => console.log(e))
	},

	async deleteTweetApi({ getters, commit }: { getters: any; commit: any }, tweet: ITweetData) {
		await httpData
			.delete(`/tweets/${tweet.id}.json`)
			.then(() => {
				commit('deleteTweet', tweet)
			})
			.catch(e => console.log(e))
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
