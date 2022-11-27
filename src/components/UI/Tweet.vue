<!-- @format -->

<template>
	<div class="tweet">
		<div class="tweet-img__wrapper">
			<img class="tweet-img" :src="imgUrl" />
		</div>
		<div class="tweet-body">
			<span class="tweet-name">{{ name }}</span>
			<slot></slot>
			<p class="tweet-like-counter" @click="handleOnSubmit">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
					/>
				</svg>
				{{ likes }}
			</p>
		</div>
	</div>
</template>

<script>
export default {
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
		}
	},
	emits: ['onSubmit'],
	setup({ id }, { emit }) {
		const handleOnSubmit = () => emit('onSubmit')
		return { handleOnSubmit }
	}
}
</script>

<style lang="scss">
$border-radius-size: 14px;

.tweet {
	width: 100%;
	padding: 20px;
	display: flex;
	margin: auto;
	border-radius: $border-radius-size + 5;
	position: relative;
	box-shadow: -1px 15px 30px -12px rgba(50, 50, 50, 0.2);
}

.tweet-likes-counter {
	cursor: pointer;
	user-select: none;
	margin-top: 14px;
	font-size: 16px;
}

.tweet-img__wrapper {
	display: flex;
	align-items: center;
	height: 120px;
	margin-right: 20px;
}

.tweet-img {
	width: 30px;
	height: 30px;
}

.tweet-name {
	display: block;
	margin-top: 24px;
	margin-bottom: 6px;
	text-transform: uppercase;
	font-size: 12px;
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
	margin-bottom: 16px;
}
</style>
