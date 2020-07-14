<template>
	<view class="flex align-center p-2" @click="open">
		<image :src="data.cover" style="width: 150rpx; height: 150rpx;" class="rounded mr-2"></image>
		<view class="flex flex-column flex-1">
			<text class="font-md text-dark">#{{data.title}}#</text>
			<text class="font text-secondary">{{data.desc}}</text>
			<view class="flex font align-center text-secondary">
				<text class="mr-2">动态：{{data.today_count}}</text>
				<text>今日：{{data.news_count}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: Object,
			index: Number
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '../../pages/topic-detail/topic-detail?detail=' + JSON.stringify(this.data)
				})
			}
		}
	}
</script>

<style>
</style>
