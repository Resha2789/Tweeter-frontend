<!-- @format -->

<template>
	<teleport v-if="!userAuth" to="body">
		<transition name="modal">
			<div class="modal__wrapper">
				<div class="modal-content">
					<div class="modal-header"><span>Login</span></div>
					<div class="modal-body">
						<div id="login"></div>
					</div>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script lang="ts">
import { onMounted, onBeforeMount, ref, reactive, computed } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import { IUser, IUserData } from '@/types/User'
import { login } from '@/servises/login'
declare var google: any

export default {
	setup() {
		onMounted(() => {
			login()
		})

		const store = useStore()

		const userAuth = computed((): boolean => {
			console.log('computed userAuth')
			return store.getters.getUser.auth
		})

		return { userAuth }
	}
}
</script>

<style lang="scss">
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

.modal__wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	transition: opacity 0.2s ease;
	right: 0;
	//z-index: 998;
	//background-color: rgba(00, 00, 00, 0.48);
}

.modal-content {
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

.modal-header {
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

.modal-body {
	display: flex;
	align-self: center;
	justify-content: space-around;
}
</style>
