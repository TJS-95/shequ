<template>
	<view>
		<view class="position-relative">
			<image :src="data.cover" mode="aspectFill" style="height: 300rpx;" class="w-100 filter"></image>
		</view>
		<view class="position-relative bg-white px-2 pb-2" style="z-index: 10;">
			<view class="flex">
				<image :src="data.cover" class="rounded img mr-2"></image>
				<text class="font-md">#{{data.title}}#</text>
			</view>
			<view class="flex align-center font text-secondary mt-1">
				<text class="mr-2">动态：{{data.today_count}}</text>
				<text>今日：{{data.news_count}}</text>
			</view>
			<view class="text-secondary font-md">
				{{data.desc}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			data: Object
		}
	}
</script>

<style lang="scss" scoped>
	.filter {
		filter: blur(10px);
	}
	.img {
		height: 150rpx;
		width: 150rpx;
		margin-top: -75rpx;
	}
</style>
