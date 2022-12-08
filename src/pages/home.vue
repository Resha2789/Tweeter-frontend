<!-- @format -->

<template>
	<router-view></router-view>
	<tweets />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import tweets from '@/components/tweets.vue'

export default defineComponent({
	components: { tweets },
	setup() {
		return {}
	}
})
</script>
