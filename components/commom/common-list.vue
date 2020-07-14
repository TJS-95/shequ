<template>
	<!-- 列表样式 -->
	<view class="p-2">
		<!-- 头像昵称 | 关注按钮 -->
		<view class="flex align-center justify-between">
			<view class="info flex align-center">
				<!-- 头像 -->
				<image :src="item.userpic" class="avatar mr-2 rounded-circle" lazy-load @click="openSpace"></image>
				<!-- 昵称发布时间 -->
				<view>
					<view class="font nickname">{{item.username}}</view>
					<text class="text-light-muted font-sm">{{item.newstime}}</text>
				</view>
			</view>
			<!-- 按钮 -->
			<view @click="follow(index)" class="follow flex align-center justify-center text-white rounded bg-main animated faster" hover-class="jello" v-if="!item.isFollow">
				<text>关注</text>
			</view>
		</view>
		<!-- 标题 -->
		<view @click="openDetail" class="font-md my-1">{{item.title}}</view>
		<!-- 图片 -->
		<image @click="openDetail" v-if="item.titlepic" :src="item.titlepic" class="img w-100" lazy-load></image>
		<!-- 图标按钮 -->
		<view class="flex ai-center">
			<view @click="doSupport('support')" class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" :class="item.support.type == 'support' ? 'support-active' : ''">
				<text class="mr-2 iconfont icon-dianzan2"></text>
				<text>{{item.support.support_count > 0 ? item.support.support_count : '支持'}}</text>
			</view>
			<view @click="doSupport('unsupport')" class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" :class="item.support.type == 'unsupport' ? 'support-active' : ''">
				<text class="mr-2 iconfont icon-cai"></text>
				<text>{{item.support.unsupport_count > 0 ? item.support.unsupport_count : '反对'}}</text>
			</view>
			<view @click="openDetail" class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main">
				<text class="mr-2 iconfont icon-pinglun2"></text>
				<text>{{item.comment_count > 0 ? item.comment_count : '评论'}}</text>
			</view>
			<view @click="openDetail" class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main">
				<text class="mr-2 iconfont icon-fenxiang"></text>
				<text>{{item.share_num > 0 ? item.share_num : '分享'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item: Object,
			index: Number
		},
		methods:{
			openSpace() {
				console.log('openSpace')
			},
			follow(index) {
				this.$emit('follow', index)
			},
			openDetail() {
				console.log('openDetail')
			},
			doSupport(type) {
				this.$emit('doSupport', {
					type,
					index: this.index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar {
		width: 65rpx;
		height: 65rpx;
	}
	.nickname {
		line-height: 1.5;
	}
	.follow {
		width: 90rpx;
		height: 50rpx;
		border-radius: 5rpx;
	}
	.img {
		height: 350rpx;
		border-radius: 5rpx;
	}
	.support-active {
		color: #FF4A6A;
	}
</style>
