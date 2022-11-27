<!-- @format -->

<template>
	<router-view></router-view>
	<div v-if="isLoading">
		<Spinner :width="50" :height="50" />
	</div>
	<div v-else>
		<div class="tweet-menu-wrapper">
			<div class="tweet-menu">
				<select name="sortBy" v-model="sortBy">
					<option value="date">Sort by date</option>
					<option value="likes">Sort by likes</option>
				</select>
			</div>
		</div>
		<div class="tweets__wrapper" v-for="item in dateSorted" :key="item.id">
			<Tweet
				:id="item.id"
				:imgUrl="item.avatar"
				:name="item.date"
				:likes="item.likes"
				@onSubmit="handleLikeSubmit(item)"
				><div class="md-body" v-html="compiledMarked(item.body)"></div>
			</Tweet>
		</div>
		<button class="btn btnTweet btnTweetHome" @click="handleShowModal">
			New tweet
		</button>
		<Modal
			title="New Tweet"
			v-if="isShowModal"
			:title="'Modal window'"
			@onClose="handleShowModal"
		>
			<TweetForm @onSubmit="handleFormSubmit" />
		</Modal>
	</div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { compiledMarked } from '@/Utils/utils'
import Spinner from '@/components/UI/Spinner.vue'
import Modal from '@/components/UI/Modal.vue'
import Tweet from '@/components/UI/Tweet.vue'
import TweetForm from '@/components/UI/TweetForm.vue'
import { httpData } from '@/http-common'

export default {
	components: { Spinner, Modal, Tweet, TweetForm },
	setup() {
		const isLoading = ref(true)
		const data = ref([])

		onMounted(() => handleStore())

		//get data from firebase
		const handleStore = () => {
			httpData
				.get('/tweets.json')
				.then(res => {
					console.log(res.data)
					const nextData = []
					Object.keys(res.data).forEach(key => {
						const item = res.data[key]
						nextData.push({ id: key, ...item })
					})
					data.value = nextData
					isLoading.value = false
				})
				.catch(e => console.log(e))
		}

		const sortBy = ref('date')
		const dateSorted = computed(() => {
			return data.value.sort((a, b) => {
				if (a[sortBy.value] < b[sortBy.value]) return 1
				if (a[sortBy.value] > b[sortBy.value]) return -1
			})
		})

		const isShowModal = ref(false)

		//Show modal window
		const handleShowModal = () => {
			const nextShowModal = (isShowModal.value = !isShowModal.value)
			isShowModal.value = nextShowModal
			console.log(isShowModal.value)
		}
		//Emit likes
		const handleLikeSubmit = tweet => {
			//console.log(`tweet ${data.value[0]} has been liked`)
			const nextTweet = { ...tweet }
			nextTweet.likes++
			http
				.put(`/tweets/${tweet.id}.json`, nextTweet)
				.then(() => {
					tweet.likes++
				})
				.catch(e => console.log(e))
			console.log(nextTweet)
		}

		//Emit tweet form
		const handleFormSubmit = text => {
			http
				.post('/tweets.json', {
					body: text,
					avatar: `https://avatars.dicebear.com/api/male/${Date.now()}.svg`,
					likes: 0,
					date: new Date(Date.now()).toLocaleString()
				})
				.then(() => {
					handleStore()
					handleShowModal()
				})
				.catch(e => console.log(e))
		}

		return {
			isLoading,
			isShowModal,
			handleShowModal,
			handleLikeSubmit,
			handleFormSubmit,
			handleStore,
			compiledMarked,
			dateSorted,
			sortBy
		}
	}
}
</script>
