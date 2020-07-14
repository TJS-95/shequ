<template>
	<view>
		<uni-nav-bar left-icon="back" statusBar :border="false" @clickLeft="navBack">
			<view class="flex align-center justify-center w-100">
				所有人可见<text class="iconfont icon-shezhi"></text>
			</view>
		</uni-nav-bar>
		<!-- 文本域 -->
		<textarea v-model="content" placeholder="说一句话吧" class="uni-textarea px-2" />
		<!-- 图片上传 -->
		<upload-image :show="show" ref="uploadImage" :list="imagesList" @change="changeImage"></upload-image>
		<!-- 底部操作条 -->
		<view class="fixed-bottom bg-white flex align-center mx-2" style="height: 85rpx;">
			<view class="iconfont icon-caidan footer-btn animated" hover-class="jello"></view>
			<view class="iconfont icon-huati footer-btn animated" hover-class="jello"></view>
			<view class="iconfont icon-tupian footer-btn animated" hover-class="jello" @click="iconClickEvent('uploadImage')"></view>
			<view class="bg-main text-white ml-auto flex align-center justify-center rounded animated" hover-class="jello" style="width: 140rpx; height: 60rpx;">发送</view>
		</view>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import uploadImage from '@/components/commom/upload-image.vue'
	export default {
		components: {
			uniNavBar,
			uploadImage
		},
		data() {
			return {
				content: '',
				imagesList: [],
				// 是否已经弹出提示框
				showBack: false
			};
		},
		// 监听返回
		onBackPress() {
			if(!this.showBack && (this.content !== '' || this.imagesList.length > 0)) {
				uni.showModal({
					content: '是否要保存草稿？',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if(res.confirm) {
							this.store()
						} else {
							uni.removeStorage({
								key: 'add-input'
							})
						}
						// 手动返回
						uni.navigateBack({
							delta: 1
						})
					},
				})
				this.showBack = true
				return true
			}
		},
		// 页面加载时
		onLoad() {
			this.getStore()
		},
		computed: {
			show() {
				return this.imagesList.length > 0
			}
		},
		methods: {
			// 底部图片点击事件
			iconClickEvent(e) {
				switch(e) {
					case 'uploadImage':
						this.$refs.uploadImage.chooseImage()
						break;
				}
			},
			// 选择图片
			changeImage(e) {
				this.imagesList = e
			},
			// 返回上一步
			navBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 保存操作
			store() {
				// 保存为本地
				let obj = {
					content: this.content,
					imagesList: this.imagesList
				}
				uni.setStorage({
					key: 'add-input',
					data: JSON.stringify(obj)
				})
			},
			// 获取本地存储
			getStore() {
				uni.getStorage({
					key: 'add-input',
					success: res => {
						let { content, imagesList } = JSON.parse(res.data)
						this.content = content
						this.imagesList = imagesList
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer-btn {
		width: 86rpx;
		height: 86rpx;
		display: flex;
		justify-content: center;
		align-content: center;
		font-size: 50rpx;
	}
</style>
