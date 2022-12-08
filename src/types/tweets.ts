/** @format */

export interface ITweetData {
	id: string
	avatar: string
	body: string
	likes: number
	date: Date | undefined
	userId: string
}

export interface ITweets {
	tweets: [ITweetData]
	sortBy: string
}
