<!-- @format -->

<template>
	<button @click="shuffle">shuffle</button>
	<div class="tweet-menu-wrapper">
		<div class="tweet-menu">
			<select name="sortBy" v-model="sortBy">
				<option value="id">Sort by id</option>
				<option value="age">Sort by age</option>
			</select>
		</div>
	</div>
	<div class="container">
		<transition-group tag="ul" name="fade" :css="false" class="container">
			<li class="tweets__wrapper" v-for="item in dataSorted" :key="item.id">
				<tweet :id="item.id" :imgUrl="'test'" :name="'test'" :likes="10" />
				{{ item.id }}
			</li>
		</transition-group>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	ref,
	watchEffect,
	watch,
	onMounted
} from 'vue'
import { shuffle as _shuffle } from 'lodash-es'
import { observeObject } from '@/Utils/utils'
import Tweet from '@/components/UI/Tweet.vue'
export default {
	components: { Tweet },

	setup() {
		const st = ref({ transform: 'none' })
		const getInitialItems = () => [
			{ id: 7, age: '1' },
			{ id: 1, age: '4' },
			{ id: 2, age: '2' },
			{ id: 3, age: '8' },
			{ id: 0, age: '7' }
		]
		const items = ref(getInitialItems())

		const sortBy = ref('id' as string)
		const dataSorted = computed((): any => {
			console.log('dataSorted', sortBy.value)
			// if (sortBy.value == 'age')
			// 	return items.value.sort((a, b): any => {
			// 		if (a['id'] > b['id']) return -1
			// 		if (a['id'] < b['id']) return 1
			// 	})
			// return _shuffle(items.value)

			return items.value.slice().sort((a: any, b: any): any => {
				if (a[sortBy.value] > b[sortBy.value]) return -1
				if (a[sortBy.value] < b[sortBy.value]) return 1
			})
		})

		function shuffle() {
			items.value = _shuffle(items.value)
			// items.value.sort((a, b): any => {
			// 	if (a['id'] > b['id']) return -1
			// 	if (a['id'] < b['id']) return 1
			// })
			console.log(items.value)
		}

		onMounted(() => {
			observeObject().init('.tweets__wrapper', test)
		})

		const test = (target: any, attributeName: any, oldValue: any) => {
			if (oldValue == null || oldValue == '') {
				console.log('Start transition-group')
			}
			if (oldValue == 'tweets__wrapper fade-move') {
				console.log('Stop transition-group')
			}
		}

		return { sortBy, dataSorted, items, shuffle, st }
	}
}
</script>

<style>
/* 1. declare transition */
.fade-move {
	transition: all 5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
