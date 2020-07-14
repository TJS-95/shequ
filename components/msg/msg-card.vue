<template>
	<view class="flex align-center p-2 border-bottom border-light-secondary" hover-class="bg-light">
		<image
			:src="data.cover"
			style="width: 80rpx;height: 80rpx;"
			class="rounded-circle mr-2">
		</image>
		<view class="flex flex-column flex-1">
			<view class="flex align-center justify-between">
				<text class="font-md">{{data.nickname}}</text>
				<text class="text-secondary">{{data.time}}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="text-secondary text-ellipsis" style="max-width: 500rpx;">{{data.content}}</text>
				<uni-badge :text="data.count" type="error"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	export default {
		props: {
			data: Object
		},
		components: {
			uniBadge
		}
	}
</script>

<style>
</style>
