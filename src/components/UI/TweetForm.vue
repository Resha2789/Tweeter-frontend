<!-- @format -->

<template>
	<form @submit.prevent="onSubmit">
		<textarea required v-model="text" />
		<button type="submit" class="btn btnPrimary">Отправить</button>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	emits: ['onSubmit'],
	setup(_, { emit }) {
		const text = ref('')
		const onSubmit = () => {
			emit('onSubmit', text.value)
			text.value = ''
		}

		return { text, onSubmit }
	}
})
</script>
