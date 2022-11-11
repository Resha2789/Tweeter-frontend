<!-- @format -->

<template>
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
				@onSubmit="handleLikeSubmit"
				>{{ item.body }}</Tweet
			>
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
import { ref, computed } from 'vue'
import Spinner from '@/components/UI/Spinner.vue'
import Modal from '@/components/UI/Modal.vue'
import Tweet from '@/components/UI/Tweet.vue'
import TweetForm from '@/components/UI/TweetForm.vue'

export default {
	components: { Spinner, Modal, Tweet, TweetForm },
	setup() {
		const data = ref([
			{
				id: 1,
				body: 'hello world 1',
				avatar:
					'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
				likes: 4,
				date: '11-11-2022'
			},
			{
				id: 2,
				body: 'hello world 2',
				avatar:
					'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
				likes: 1,
				date: '12-11-2022'
			},
			{
				id: 3,
				body: 'hello world 2',
				avatar:
					'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
				likes: 8,
				date: '19-11-2022'
			}
		])

		const sortBy = ref('likes')
		const dateSorted = computed(() => {
			return data.value.sort((a, b) => {
				if (a[sortBy.value] < b[sortBy.value]) return 1
				if (a[sortBy.value] > b[sortBy.value]) return -1
			})
		})

		const isLoading = ref(true)
		const isShowModal = ref(false)

		setTimeout(() => {
			isLoading.value = false
		}, 1000)

		//Show modal window
		const handleShowModal = () => {
			const nextShowModal = (isShowModal.value = !isShowModal.value)
			isShowModal.value = nextShowModal
			console.log(isShowModal.value)
		}
		//Emit likes
		const handleLikeSubmit = id => {
			console.log(`tweet id ${id} has been liked`)
		}

		//Emit tweet form
		const handleFormSubmit = text => {
			data.value.push({
				id: data.value.length + 1,
				body: text,
				avatar:
					'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
				likes: 0,
				date: new Date(Date.now()).toLocaleString()
			})
			handleShowModal()
		}

		return {
			isLoading,
			isShowModal,
			handleShowModal,
			handleLikeSubmit,
			handleFormSubmit,
			dateSorted,
			sortBy
		}
	}
}
</script>
