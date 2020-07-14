<template>
	<view>
		<!-- 消息列表 -->
		<block v-for="(item, index) in list" :key="index">
			<msg-card :data="item" :index="index"></msg-card>
		</block>
	</view>
</template>

<script>
	import msgCard from '@/components/msg/msg-card.vue'
	export default {
		components: {
			msgCard
		},
		data() {
			return {
				list: [
					{
						cover: '../../static/default.jpg',
						nickname: '昵称',
						time: '12:33',
						content: 'hi扫iOS擦hi哦菜哦爱我的',
						count: 2
					},
					{
						cover: '../../static/default.jpg',
						nickname: '昵称',
						time: '12:33',
						content: 'hi扫iOS擦hi哦菜哦爱我的',
						count: 2
					},
					{
						cover: '../../static/default.jpg',
						nickname: 'king',
						time: '12:33',
						content: '去洗脚吗',
						count: 10
					}
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
