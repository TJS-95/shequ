<template>
	<view class="page">
		<!-- 顶部选项卡 -->
		<scroll-view
			scroll-x
			class="scroll-row"
			:scroll-into-view="scrollInto"
			scroll-with-animation
			style="height: 100rpx;">
			<view
				v-for="(item,index) in tabBars"
				:key="index"
				:id="'tab' +  index"
				:class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
				class="scroll-row-item px-3 py-3 font-md"
				@click="changTab(index)">
				{{item.name}}
			</view>
		</scroll-view>
		<!-- n -->
		<swiper
			:duration="150"
			:current="tabIndex"
			:style="'height:' + scrollH + 'px' "
			@change="onChangeTab">
			<swiper-item v-for="(item, index) in newsList" :key="index">
				<scroll-view :scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2, index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<topicList :data="item2" :index="index2" ></topicList>
							<!-- 全局分割线-->
						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadmore"/>
					</template>
					<template v-else>
						<no-thing /> 
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import topicList from '@/components/news/topic-list.vue'
	import loadMore from '@/components/commom/load-more.vue'
	const demo = [
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
		},
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
	export default {
		components: {
			topicList,
			loadMore
		},
		data() {
			return {
				// 列表高度
				scrollH: 600,
				// 顶部选项卡
				scrollInto: '',
				tabIndex: 0,
				tabBars: [
					{
						name: '关注',
					},
					{
						name: '推荐',
					},
					{
						name: '体育',
					},
					{
						name: '热点',
					},
					{
						name: '财经',
					},
					{
						name: '娱乐',
					},
					{
						name: '军事',
					},
					{
						name: '历史',
					},
					{
						name: '本地',
					},
				],
				newsList: []
			}
		},
		// 监听顶级导航搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		// 监听导航按钮点击事件
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../add-input/add-input'
			});
		},
		onLoad() {
			this.scrollHeight()
			this.getData()
		},
		methods: {
			// 获取列表数据
			getData() {
				let arr = []
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						loadmore: '上拉加载更多',
						list: []
					}
					if(i < 2) {
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr
			},
			// 获取屏幕高度
			async scrollHeight() {
				let res = await uni.getSystemInfoSync()
				this.scrollH = res.windowHeight - uni.upx2px(100)
			},
			// 监听活动
			onChangeTab(e) {
				this.changTab((e.detail.current))
			},
			// 切换选项
			changTab(index) {
				if(this.tabIndex === index) return
				 this.tabIndex = index
				 // 滚动到指定元素
				 this.scrollInto = 'tab' + index
			},
			// 下拉加载
			loadmore(index) {
				let item = this.newsList[index]
				item.loadmore = '加载中...'
				setTimeout(() => {
					item.list = [...item.list, ...item.list]
					item.loadmore = '上拉加载更多'
				}, 2000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
