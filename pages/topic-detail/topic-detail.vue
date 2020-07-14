<template>
	<view>
		<topic-info :data="info"></topic-info>
		<divider></divider>
		<view class="p-2 flex align-center border-bottom" hover-class="bg-light" v-for="(item, index) in hotList" :key="index">
			<text class="iconfont icon-xihuan text-main"></text>
			<text class="font text-dark text-ellipsis">
				{{item.title}}
			</text>
		</view>
		<divider></divider>
		<!-- tab -->
		<view class="flex align-center py-2">
			<view 
				v-for="(item, index) in tabBars"
				:key="index"
				:class="tabIndex === index ? 'flex align-center justify-center flex-1 font-lg font-weight-bold text-main' : 'flex align-center justify-center flex-1 font-md'"
				@click="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		<!-- 列表 -->
		<template v-if="listData.length > 0">
			<block v-for="(item, index) in listData" :key="index">
				<common-list :item="item" :index="index"></common-list>
				<!-- 分割线 -->
				<divider></divider>
			</block>
			<!-- 加载更多 -->
			<load-more :loadmore="loadmoreText"></load-more>
		</template>
		<template v-else>
			<no-thing /> 
		</template>
	</view>
</template>

<script>
	import topicInfo from '@/components/topic-detail/topic-info.vue'
	import commonList from '@/components/commom/common-list.vue'
	import loadMore from '@/components/commom/load-more.vue'
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
			topicInfo,
			commonList,
			loadMore
		},
		data() {
			return {
				tabIndex: 0,
				info: {},
				hotList: [
					{
						title: '【新人必读】uni-app实战第二季商城类项目开发'
					},
					{
						title: '【新人必读】uni-app实战第三季微信项目开发'
					}
				],
				tabBars: [
					{
						name: '默认'
					},
					{
						name: '最新'
					}
				],
				list1: [],
				loadText1: '上拉加载更多',
				list2: [],
				loadText2: '上拉加载更多'
			}
		},
		onLoad(e) {
			if(e.detail) {
				this.info = JSON.parse(e.detail)
			}
			// 加载数据
			this.list1 = demo
		},
		onReachBottom() {
			this.loadmore()
		},
		computed: {
			listData() {
				return this.tabIndex === 0 ? this.list1 : this.list2
			},
			loadmoreText() {
				return this.tabIndex === 0 ? this.loadText1 : this.loadText2
			}
		},
		methods: {
			// 切换选项卡
			changeTab(index) {
				this.tabIndex = index
			},
			// 上拉加载更多
			loadmore() {
				// 拿到当前的列表
				let index = this.tabIndex
				// 判断是否处于客家子啊状态
				if(this.loadmoreText !== '上拉加载更多') return
				// 设置状态
				this['loadText' + (index + 1)] = '加载中...'
				let item = this['list' + (index + 1)]
				// 请求而数据
				setTimeout(() => {
					 this['list' + (index + 1)]= [...item, ...item]
					 this['loadText' + (index + 1)] = '上拉加载更多'
				}, 2000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
