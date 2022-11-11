<!-- @format -->

<template>
	<form @submit.prevent="onSubmit">
		<textarea required v-model="text" />
		<button type="submit" class="btn btnPrimary">Send tweet</button>
	</form>
</template>

<script>
import { ref } from 'vue'

export default {
	emits: ['onSubmit'],
	setup(_, { emit }) {
		const text = ref('')
		const onSubmit = () => {
			emit('onSubmit', text.value)
			text.value = ''
		}

		return { text, onSubmit }
	}
}
</script>
