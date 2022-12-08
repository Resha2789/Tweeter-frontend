<!-- @format -->

<template>
	<teleport to="body">
		<transition name="modal">
			<div class="modal-login__wrapper" @click="handleModalClose">
				<div class="modal-login-content" @click.stop>
					<div class="modal-login-header"><span>Login</span></div>
					<div class="modal-login-body">
						<div id="login"></div>
					</div>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { login } from '@/servises/login'
declare var google: any

export default {
	setup() {
		const router = useRouter()
		onMounted(() => {
			login()
		})

		const handleModalClose = () => {
			const path = router.currentRoute.value.path.replace(/(login)$/i, '')

			router.push(path)
			console.log('onClose', router.currentRoute.value)
		}

		const store = useStore()

		const userAuth = ref(false as boolean)

		watchEffect(() => {
			userAuth.value = store.getters.getUser.isAuth
			if (userAuth.value) {
				handleModalClose()
			}
			console.log('watchEffect LOGIN')
		})

		return { userAuth, handleModalClose }
	}
}
</script>

<style lang="scss" scoped>
// Animation
.modal-enter {
	opacity: 0;
}
.modal-leave-active {
	opacity: 0;
}
.modal-enter .modal-content,
.modal-leave-active .modal-content {
	transform: scale(1.2);
}

.modal-login__wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	transition: opacity 0.2s ease;
	right: 0;
	z-index: 998;
	//background-color: rgba(00, 00, 00, 0.48);
}

.modal-login-content {
	position: relative;
	max-width: 600px;
	padding: 20px 18px;
	background-color: #fff;
	border: 1px solid #dcdfe6;
	transition: all 0.2s ease;
	border-radius: 16px;
	z-index: 999;
	overflow: hidden;
	@media screen and (min-width: 900px) {
		min-width: 400px;
		min-height: 400px;
	}
}

.modal-login-header {
	display: flex;
	align-self: center;
	justify-content: space-around;
	padding-bottom: 20px;
	span {
		font-size: 24px;
	}
	.button-close {
		cursor: pointer;
	}
}

// iframe {
// 	display: none;
// }

.modal-login-body {
	display: flex;
	align-self: center;
	justify-content: space-around;
}
</style>
