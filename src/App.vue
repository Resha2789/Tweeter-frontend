<!-- @format -->

<template>
	<div class="wrapper">
		<Header />
		<div class="wrapper-content">
			<div class="container">
				<router-view />
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'

export default {
	components: { Footer, Header }
}
</script>

<style lang="scss"></style>
