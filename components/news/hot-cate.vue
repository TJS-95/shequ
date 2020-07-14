<template>
	<view class="hot-cate">
		<view class="flex align-center justify-between px-2">
			<text class="font-md">热门分类</text>
			<view class="flex align-center font text-secondary animated" hover-class="jello" @click="onMore">
				更多<text class="iconfont icon-jinru"></text>
			</view>
		</view>
		<view class="flex flex-wrap align-center py-3 px-2 border-bottom">
			<view class="border rounded bg-light mx-1 px-2 animated" hover-class="jello" v-for="(item, index) in list" :key="index" @click="openDetails(item)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: { type: Array, default: []}
		},
		methods: {
			// 更多
			onMore() {
				uni.navigateTo({
					url: '../topic-nav/topic-nav'
				})
			},
			openDetails(e) {
				this.$emit('openDetails', e)
			}
		}
	}
</script>

<style>
</style>
