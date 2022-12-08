<!-- @format -->

<template>
	<div class="wrapper">
		<router-view name="HeaderPage"></router-view>
		<div class="wrapper-content">
			<div class="container">
				<router-view></router-view>
			</div>
		</div>
		<!-- <router-view name="FooterPage"></router-view> -->
	</div>
</template>

<script lang="ts">
// import Header from '@/components/header.vue'
// import Footer from '@/components/footer.vue'

export default {
	// components: { Footer, Header }
}
</script>

<style lang="scss"></style>
