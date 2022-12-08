<!-- @format -->

<template>
	<div v-if="isLoading">
		<Spinner :width="50" :height="50" />
	</div>
	<div v-else>
		<div class="tweet-menu-wrapper">
			<div class="tweet-menu">
				<select name="sortBy" v-model="sortBy">
					<option value="date">По дате</option>
					<option value="likes">По лайкам</option>
				</select>
			</div>
		</div>
		<TransitionGroup tag="div" name="list" class="container">
			<div class="tweets__wrapper" v-for="item in tweets" :key="item.id">
				<Tweet
					:isAuth="userId == item.userId ? isAuth : false"
					:id="item.id"
					:imgUrl="item.avatar"
					:name="item.date"
					:likes="item.likes"
					@onSubmit="handleLikeSubmit(item)"
					@onDelete="handleOnDelete(item)"
				>
					<div class="md-body" v-html="compiledMarked(item.body)"></div>
				</Tweet>
			</div>
		</TransitionGroup>
		<button class="btn btnTweet btnTweetHome" @click="handleShowModal">Написать</button>
		<Modal title="New Tweet" v-if="isShowModal" :title="'Modal window'" @onClose="handleShowModal">
			<TweetForm @onSubmit="handleFormSubmit" />
		</Modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue'
import { compiledMarked } from '@/Utils/utils'
import Spinner from '@/components/UI/Spinner.vue'
import Tweet from '@/components/UI/Tweet.vue'
import TweetForm from '@/components/UI/TweetForm.vue'
import Modal from '@/components/UI/Modal.vue'
import { useStore } from 'vuex'

export default defineComponent({
	components: { Spinner, Modal, Tweet, TweetForm },
	setup() {
		const store = useStore()
		const isLoading = ref(true)

		//get data from firebase
		onMounted(() => handleStore())
		const handleStore = () => {
			store.commit('setSortBy', sortBy.value)
			store.dispatch('getTweetsApi').then(() => {
				isLoading.value = false
			})
		}

		const isAuth = computed(() => {
			return store.getters.getUser.isAuth
		})
		const userId = computed(() => {
			return store.getters.getUser.user_id
		})
		const tweets = computed(() => {
			return store.getters.getTweets
		})

		const sortBy = ref('likes')

		const sorted = watch(sortBy, () => {
			console.log('watch sortBy', sortBy.value)
			store.commit('setSortBy', sortBy.value)
			store.dispatch('sortBy')
		})

		//modal window
		const isShowModal = ref(false)
		const handleShowModal = () => {
			const nextShowModal = (isShowModal.value = !isShowModal.value)
			isShowModal.value = nextShowModal
		}

		//likes
		const handleLikeSubmit = (tweet: any) => {
			store.dispatch('setLikesApi', tweet)
		}

		//tweet form
		const handleFormSubmit = (text: any) => {
			store.dispatch('createTweetApi', text).then(() => {
				isShowModal.value = false
			})
		}

		const handleOnDelete = (tweet: any) => {
			store.dispatch('deleteTweetApi', tweet)
		}

		return {
			isLoading,
			isShowModal,
			isAuth,
			tweets,
			userId,
			sortBy,
			handleShowModal,
			handleLikeSubmit,
			handleFormSubmit,
			handleStore,
			compiledMarked,

			handleOnDelete
		}
	}
})
</script>

<style scoped>
/* 1. declare transition */
/* .list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
} */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 1.2s ease;
	width: 100%;
	display: flex;
	margin: auto;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(1200px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
}
</style>
