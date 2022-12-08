<!-- @format -->

<template>
	<header class="navbar">
		<div class="container">
			<div class="navbar-content">
				<router-link class="navbar-logo" to="/">{{ app.title }}</router-link>
				<ul class="navbar-list">
					<li class="navbar-item" v-for="link in links" :key="link.alias">
						<router-link class="navbar-link" :to="link.url">{{ link.title }}</router-link>
					</li>
					<PopupLogin :show="isPopUpShow" :loginUrl="fullUrl" :title="url.title" @onAfterLeave="handleAfterLeave"></PopupLogin>
				</ul>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { links, app } from '@/_config'
import { ref, reactive, computed, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PopupLogin from '@/components/UI/PopupLogin.vue'

export default {
	components: { PopupLogin },
	setup() {
		const store = useStore()
		const route = useRoute()

		const isShow = ref(true as boolean)

		const url = reactive({ link: '', title: '' })
		const fullUrl = computed((): any => {
			return `${route.path}${url.link}`
		})

		var isLoading = ref(false as boolean)
		const load = onMounted(() => {
			console.log('onMounted isLoading')
			isLoading.value = true
		})

		const isPopUpShow = ref(false as boolean)

		// works for reactivity tracking
		watchEffect(() => {
			const isAuth = store.getters.getUser.isAuth
			if (!isAuth && isLoading.value && isShow.value) {
				isPopUpShow.value = !isPopUpShow.value
				url.link = 'login'
				url.title = 'вход'
			} else if (isAuth && isLoading.value) {
				isPopUpShow.value = !isPopUpShow.value
				url.link = 'logout'
				url.title = 'выход'
			}
		})

		const handleAfterLeave = () => {
			isPopUpShow.value = true
			isPopUpShow.value = false
		}

		return {
			app,
			links,
			url,
			fullUrl,
			isPopUpShow,
			handleAfterLeave
		}
	}
}
</script>
