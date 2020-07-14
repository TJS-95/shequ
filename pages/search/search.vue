<template>
	<view>
		<!-- 搜索历史 -->
		<template v-if="searchList.length <= 0">
			<view class="p-2 font-md">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-2" hover-class="bg-light" v-for="(item, index) in list" :key="index" @click="tabSearchHistory(item)">
					{{item}}
				</view>
			</view>
		</template>
		<!-- 搜索列表 -->
		<template v-elseS>
			<!-- 列表 -->
			<block v-for="(item, index) in searchList" :key="index">
				<!-- 列表样式 -->
				<common-list :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
				<!-- 全局分割线-->
				<divider></divider>
			</block>
		</template>
	</view>
</template>

<script>
	import commonList from '@/components/commom/common-list.vue'
	const demo = [
		{
			username: '陈子轩',
			userpic: '../../static/default.jpg',
			newstime: '2020-5-20 下午05:20',
			isFollow: false,
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
			isFollow: false,
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
			isFollow: false,
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
			commonList
		},
		data() {
			return {
				searchText: '',
				list: [
					'uni-app头铁',
					'uni-app抖音开发实战',
					'uni-app第三季微信实战开发',
					'实战教程',
					'系列课程'
				],
				searchList: []
			};
		},
		// 监听导航输入
		onNavigationBarSearchInputChanged(e) {
			this.searchText = e.text
		},
		// 监听带年纪导航搜索按钮
		onNavigationBarButtonTap(e) {
			if(e.index === 0) {
				this.searchEvent()
			}
		},
		methods: {
			// 点击搜索事件
			tabSearchHistory(text) {
				this.searchText = text
				this.searchEvent()
			},
			// 搜索事件
			searchEvent() {
				// 收起键盘
				uni.hideKeyboard()
				// 处于loading状态
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				// 请求搜索
				setTimeout(() => {
					this.searchList = demo
					// 隐藏loading
					uni.hideLoading()
				}, 2000)
			},
			// 关注
			follow(index) {
				console.log(index)
				this.list[index].isFollow = !this.list[index].isFollow
				uni.showToast({
					title: '关注成功'
				})
			},
			doSupport(data) {
				console.log(data)
				let { type, index } = data
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
		}
	}
</script>

<style lang="scss">

</style>
