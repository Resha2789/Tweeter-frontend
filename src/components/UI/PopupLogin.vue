<!-- @format -->

<template>
	<div class="login-wrapper">
		<router-link :to="loginUrl" class="">
			<Transition @afterLeave="handleAfterLeave" name="slide-fade">
				<button class="btn btnDanger login" v-if="show">{{ title }}</button>
			</Transition>
		</router-link>
	</div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		loginUrl: {
			type: String
		},
		title: {
			type: String
		}
	},
	emits: ['onAfterLeave'],
	setup(_: any, { emit }: { emit: any }) {
		const handleAfterLeave = () => {
			emit('onAfterLeave')
		}

		return { handleAfterLeave }
	}
}
</script>

<style>
.slide-fade-enter-active {
	transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(60px);
	opacity: 0;
}
</style>
