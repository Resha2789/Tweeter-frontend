<!-- @format -->

<template>
	<div class="tweet">
		<div class="tweet-img__wrapper">
			<img class="tweet-img" :src="imgUrl" />
		</div>
		<div class="tweet-body">
			<div class="tweet-body_header">
				<span class="tweet-name">{{ name }}</span>
				<TransitionGroup tag="ul" name="list">
					<button v-if="isAuth" class="tweet-body-header-close" @click="handleOnDelete">&times;</button>
				</TransitionGroup>
			</div>

			<slot></slot>
			<div class="tweet-like-counter" @click="handleOnSubmit">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="50"
					height="20"
					viewBox="0 0 24 24"
					:fill="likes > 0 ? 'red' : 'none'"
					:stroke="likes > 0 ? 'red' : 'currentColor'"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
					cursor="pointer"
				>
					<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
				</svg>
				{{ likes }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		id: {
			required: true
		},
		name: {
			required: true,
			type: String
		},
		likes: {
			required: true,
			type: Number
		},
		imgUrl: {
			required: true,
			type: String
		},
		isAuth: {
			required: true,
			type: Boolean
		}
	},
	emits: ['onSubmit', 'onDelete'],
	setup({ id }, { emit }) {
		const handleOnDelete = () => emit('onDelete')
		const handleOnSubmit = () => emit('onSubmit')
		return { handleOnSubmit, handleOnDelete }
	}
})

// export default props
</script>

<style lang="scss" scoped>
$border-radius-size: 14px;

@function rem($pixels, $context: 18px) {
	@if (unitless($pixels)) {
		$pixels: $pixels * 1px;
	}
	@if (unitless($context)) {
		$context: $context * 1px;
	}

	@return $pixels / $context * 1rem;
}

svg {
	transition: 0.3s;
	opacity: 0.6;
	&:hover {
		opacity: 1;
		width: 50px;
		height: 30px;
	}
}
.tweet {
	width: 100%;
	padding: 20px;
	display: flex;
	margin: auto;
	border-radius: $border-radius-size + 5;
	position: relative;
	box-shadow: -1px 15px 30px -12px rgba(50, 50, 50, 0.2);
	@media screen and (max-width: 1280px) {
		padding: 20px;
	}
	@media screen and (max-width: 768px) {
		padding: 10px;
	}
	@media screen and (max-width: 480px) {
		padding: 5px;
		padding-top: 10px;
	}
}

.tweet-like-counter {
	height: 50px !important;
	display: flex;
	align-items: center;
	justify-items: baseline;
	font-size: 16px;

	:hover {
		font-size: 30px;
	}
}

.tweet-img__wrapper {
	display: block;
	position: relative;
	align-items: center;
	height: auto;
	margin-right: rem(15);
}

.tweet-img {
	width: 60px;
	height: width;
	border-radius: 8px;
	@media screen and (max-width: 1280px) {
		width: 60px;
		height: 60px;
	}
	@media screen and (max-width: 768px) {
		width: 50px;
		height: 50px;
		margin-right: 10px;
	}
	@media screen and (max-width: 480px) {
		width: 40px;
		height: 40px;
		margin-right: 0px;
	}
}

.tweet-name {
	display: block;
	//margin-top: 24px;
	//margin-bottom: 6px;
	//align-items: center;
	text-transform: uppercase;
	font-size: 14px;
	font-weight: 700;
}

.tweet-title {
	display: block;
	margin-bottom: 8px;
	font-size: 26px;
	color: black;
	font-weight: 900;
}

.tweet-body {
	width: 100%;
}

.tweet-body_header {
	position: relative;
	width: 100%;
	padding: 0px;
	display: flex;
	margin: auto;
	justify-content: space-between;
	align-items: center;
}
.tweet-body-header-close {
	font-size: 30px;
	padding: 0px;
	width: rem(40px);
	height: rem(40px);
	transition: 0.2s;
	border: none;
	background: none;
	cursor: pointer;
	&:hover {
		color: rgb(247, 6, 6);
	}
}

/* 1. declare transition */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 1.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
}
</style>
