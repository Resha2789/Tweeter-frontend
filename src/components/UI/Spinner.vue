<!-- @format -->

<template>
	<div class="spinner-wrapper">
		<div class="spinner" :style="{ width: `${width}px`, height: `${height}px` }"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		width: {
			type: Number,
			default: 80
		},
		height: {
			type: Number,
			default: 80
		}
	}
})
</script>

<style lang="scss">
.spinner-wrapper {
	display: flex;
	justify-content: center;
	// margin: 20px 0;
}

.spinner {
	display: inline-block;
	&:after {
		content: ' ';
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid #444ce0;
		border-color: #444ce0 transparent #444ce0 transparent;
		animation: spin 1.2s linear infinite;
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
