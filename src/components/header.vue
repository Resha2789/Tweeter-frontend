<!-- @format -->

<template>
	<header class="navbar">
		<div class="container">
			<div class="navbar-content">
				<router-link class="navbar-logo" to="/">{{ app.title }}</router-link>
				<ul class="navbar-list">
					<li class="navbar-item" v-for="link in links" :key="link.alias">
						<router-link class="navbar-link" :to="link.url">{{
							link.title
						}}</router-link>
					</li>
					<li class="navbar-item">
						<router-link class="navbar-link" :to="loginUrl">{{
							loginTitle
						}}</router-link>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { links, app } from '@/_config'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
	setup() {
		const route = useRoute()

		const loginTitle = ref('login' as string)

		const loginUrl = computed((): any => {
			return route.name == 'home' ? `${route.path}login` : `${route.path}/login`
		})

		return { app, links, loginUrl, loginTitle, route }
	}
}
</script>
