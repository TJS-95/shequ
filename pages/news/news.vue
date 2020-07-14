<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true" @clickRight="openAddInput">
			<view class="flex align-center justify-center font-weight-bold w-100">
				<view v-for="(item, index) in tabBars"
					:key="index" class="mx-1"
					:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-light-muted'"
					@click="changeTab(index)">
					{{item.name}}
				</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>
		<!-- 列表 -->
		<swiper
			:current="tabIndex"
			:duration="150"
			:style="'height:' + scrollH + 'px' "
			@change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view :scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadMore">
					<block v-for="(item, index) in list" :key="index">
						<common-list :item="item" :index="index" @doSupport="doSupport"></common-list>
						<!-- 分割线 -->
						<divider></divider>
					</block>
					<load-more :loadmore="loadmore"/>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				<scroll-view :scroll-y="true" :style="'height:' + scrollH + 'px;'">
					<view class="">
						<!-- 热门分类 -->
						<hot-cate :list="hotCate"></hot-cate>
						<!-- 搜索框 -->
						<view class="p-2">
							<view class="flex align-center justify-center bg-light text-secondary rounded py-2">
								<text class="iconfont icon-sousuo mr-2"></text>
								搜索话题
							</view>
						</view>
						<!-- 轮播图 -->
						<swiper class="px-2 pb-2" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item>
								<image src="../../static/demo/banner2.jpg" style="height: 300rpx;" class="w-100 rounded"></image>
							</swiper-item>
						</swiper>
						<divider></divider>
						<!-- 最近更新 -->
						<view class="p-2 font-md">最近更新</view>
						<!-- 话题列表组件 -->
						<block v-for="(item, index) in topicList" :key="index">
							<topic-list :data="item" :index="index"></topic-list>
						</block>
					</view>
				</scroll-view>
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/commom/common-list.vue'
	import loadMore from '@/components/commom/load-more.vue'
	import hotCate from '@/components/news/hot-cate.vue'
	import topicList from '@/components/news/topic-list.vue'
	const demo = [
		{
			username: '陈子轩',
			userpic: '../../static/default.jpg',
			newstime: '2020-5-20 下午05:20',
			isFollow: true,
			title: '成功鄙视偶然',
			titlepic: '../../static/demo/datapic/11.jpg',
			support: {
				type: 'support',
				support_count: 1,
				unsupport_count: 2,
			},
			comment_count: 2,
			share_num: 2
		},
		{
			username: '陈子轩',
			userpic: '../../static/default.jpg',
			newstime: '2020-5-20 下午05:20',
			isFollow: true,
			title: '我是标题啊',
			titlepic: '../../static/demo/datapic/1.jpg',
			support: {
				type: 'unsupport',
				support_count: 100,
				unsupport_count: 2,
			},
			comment_count: 2,
			share_num: 2
		}, {
			username: '陈子轩',
			userpic: '../../static/default.jpg',
			newstime: '2020-5-20 下午05:20',
			isFollow: true,
			title: '我是标题啊',
			titlepic: '',
			support: {
				type: '',
				support_count: 100,
				unsupport_count: 0,
			},
			comment_count: 2,
			share_num: 0
		}
	]
	export default {
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		data() {
			return {
				scrollH: 500,
				tabIndex: 0,
				tabBars: [
					{
						name: '关注'
					},
					{
						name: '话题'
					}
				],
				list: [],
				loadmore: '下拉加载更多',
				hotCate: [
					{
						name: '关注'
					},
					{
						name: '新闻'
					},
					{
						name: '娱乐'
					},
					{
						name: '头条'
					},
					{
						name: '军事'
					}
				],
				topicList: [
					{
						cover: '../../static/demo/topicpic/1.jpeg',
						title: '话题名称',
						desc: '话题描述',
						today_count: 0,
						news_count: 10
					},
					{
						cover: '../../static/demo/topicpic/2.jpeg',
						title: '话题名称',
						desc: '话题描述',
						today_count: 0,
						news_count: 10
					},
					{
						cover: '../../static/demo/topicpic/3.jpeg',
						title: '话题名称',
						desc: '话题描述',
						today_count: 0,
						news_count: 10
					},
					{
						cover: '../../static/demo/topicpic/4.jpeg',
						title: '话题名称',
						desc: '话题描述',
						today_count: 0,
						news_count: 10
					}
				]
			}
		},
		onLoad() {
			this.scrollHeight()
			// 加载数据
			this.list = demo
		},
		methods: {
			// 获取屏幕高度
			async scrollHeight() {
				let res = await uni.getSystemInfoSync()
				this.scrollH = res.windowHeight - res.statusBarHeight - 44
				
			},
			// 切换选项卡
			changeTab(e) {
				this.tabIndex = e
			},
			// 切换
			onChangeTab(e) {
				this.tabIndex = e.detail.current
			},
			// 打开发布页
			openAddInput() {
				uni.navigateTo({
					url: '../add-input/add-input'
				})
			},
			// 顶踩
			doSupport(e) {
				let { type, index } = e
				// 拿到当前对象
				let item = this.list[index].support
				let msg = type === 'support' ? '顶' : '踩'
				// 之前没有操作
				if(item.type === '') {
					item[type + '_count']++
				} else if(item.type === 'support' && type === 'unsupport' ) { // 之前顶了
					// 踩 + 1
					item.unsupport_count++
					// 顶 + 1
					item.support_count--
				} else if(item.type === 'unsupport' && type === 'support') { // 之前踩了
					// 顶 + 1
					item.support_count++
					// 踩 + 1
					item.unsupport_count--
				}
				item.type = type
				uni.showToast({
					title: msg + '成功'
				})
			},
			// 加载更多
			loadMore() {
				// 验证当前是否可加载更多
				if(this.loadmore !== '下拉加载更多') return
				this.loadmore = '加载中...'
				setTimeout(() => {
					this.list = [...this.list, ...this.list]
					this.loadmore = '下拉加载更多'
				}, 2000)
			}
		}
	}
</script>

<style>

</style>
