<template>
	<view class="main">
		<view class="main-form">
			<uni-forms ref="model" :model="model" border>
				<uni-forms-item label="价格地区">
					<uni-data-picker 
						placeholder="请选择价格地区" 
						popup-title="请选择价格地区" 
						:localdata="dataTree" 
						v-model="model.lx">
					</uni-data-picker>
				</uni-forms-item>
				<uni-forms-item>
					<button type="primary" @click="onSubmit()">查询</button>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view :style="{ height: scrollHeight + 'px'}">
			<scroll-view 
				class="scroll-list"
				scroll-y>
				<view class="scroll-list">
					<view class="card-box"
						v-for="(item, index) in list" :key="'item' + index">
						<view class="card-item"
							v-for="child in columns" :key="child.prop">
							<view v-if="child.prop === 'changepercent'" class="card-item-child">
								<view>{{ child.label }}:</view>
								<view>
									<span v-if="/-/.test(item[child.prop]) === false" style="color: #F56C6C;">
										{{ item[child.prop] }}
										<uni-icons type="arrow-up" color="#F56C6C"></uni-icons>
									</span>
									<span v-else style="color: #67C23A;">
										{{ item[child.prop] }}
										<uni-icons type="arrow-down" color="#67C23A"></uni-icons>
									</span>
								</view>
							</view>
							<view v-else class="card-item-child">
								<view>{{ child.label }}:</view>
								<view>{{ item[child.prop] }}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
	import { 
		goldshgold,
		goldstoregold,
		goldbank,
		goldhkgold,
		goldlondon ,
	} from '@/utils/request/modules/api.js'
	
	export default {
		data() {
			return {
				columnlist: {
				    column01: [
				      {
				        prop: 'type',
				        label: '品种代号'
				      },{
				        prop: 'typename',
				        label: '品种名称'
				      },{
				        prop: 'price',
				        label: '最新价'
				      },{
				        prop: 'openingprice',
				        label: '开盘价'
				      },{
				        prop: 'maxprice',
				        label: '最高价格'
				      },{
				        prop: 'minprice',
				        label: '最低价格'
				      },{
				        prop: 'changepercent',
				        label: '涨跌幅'
				      },{
				        prop: 'lastclosingprice',
				        label: '昨收盘价'
				      },{
				        prop: 'tradeamount',
				        label: '总成交量'
				      },{
				        prop: 'updatetime',
				        label: '更新时间'
				      }
				    ],
				    column02: [],
				    column03: [
				      {
				        prop: 'type',
				        label: '品种代号'
				      },{
				        prop: 'buyprice',
				        label: '买入价'
				      },{
				        prop: 'sellprice',
				        label: '卖出价'
				      },{
				        prop: 'changequantity',
				        label: '涨跌量'
				      },{
				        prop: 'openingprice',
				        label: '开盘价'
				      },{
				        prop: 'closingprice',
				        label: '收市价'
				      },{
				        prop: 'maxprice',
				        label: '最高价'
				      },{
				        prop: 'minprice',
				        label: '最低价'
				      },{
				        prop: 'updatetime',
				        label: '更新时间'
				      }
				    ],
				    column04: [
				      {
				        prop: 'typename',
				        label: '品种名称'
				      },{
				        prop: 'midprice',
				        label: '中间价'
				      },{
				        prop: 'buyprice',
				        label: '买入价'
				      },{
				        prop: 'sellprice',
				        label: '卖出价'
				      },{
				        prop: 'minprice',
				        label: '最低价'
				      },{
				        prop: 'maxprice',
				        label: '最高价'
				      },{
				        prop: 'updatetime',
				        label: '更新时间'
				      }
				    ],
				    column05: [
				      {
				        prop: 'type',
				        label: '品种代号'
				      },{
				        prop: 'price',
				        label: '最新价'
				      },{
				        prop: 'changepercent',
				        label: '涨跌幅'
				      },{
				        prop: 'changequantity',
				        label: '涨跌量'
				      },{
				        prop: 'openingprice',
				        label: '开盘价'
				      },{
				        prop: 'maxprice',
				        label: '最高价'
				      },{
				        prop: 'minprice',
				        label: '最低价'
				      },{
				        prop: 'lastclosingprice',
				        label: '昨收盘价'
				      },{
				        prop: 'updatetime',
				        label: '更新时间'
				      }
				    ],
				    column06: [
				      {
				        prop: 'store_name',
				        label: '金店名称'
				      },{
				        prop: 'date',
				        label: '日期'
				      },{
				        prop: 'gold',
				        label: '黄金（元/克）'
				      },{
				        prop: 'platinum',
				        label: '铂金（元/克）'
				      },{
				        prop: 'platinum_hk',
				        label: '铂金（香港）（港币/两）'
				      },{
				        prop: 'goldbar',
				        label: '金条（内地）（元/克）'
				      },{
				        prop: 'goldbar_hk',
				        label: '金条（香港）（港币/两）'
				      },{
				        prop: 'jewelry',
				        label: '黄金饰品（内地）（元/克）'
				      },{
				        prop: 'jewelry_hk',
				        label: '黄金饰品（香港）（港币/两）'
				      },{
				        prop: 'solid_gold',
				        label: '足金价格（元/克）'
				      }
				    ]
				},
				columns: [],
				list: [],
				dataTree: [
					{
						text: '上海黄金交易所价格',
						value: '01'
					}, {
						text: '香港黄金价格',
						value: '03'
					}, {
						text: '银行账户黄金价格',
						value: '04'
					}, {
						text: '伦敦金银价格',
						value: '05'
					}, {
						text: '金店价格',
						value: '06'
					},
				],
				model: {
					lx: '01'
				},
				scrollHeight: null,
			}
		},
		onReady() {
			const that = this;
			let height = '';
			let formHeight = '';
			const query = uni.createSelectorQuery().in(this);
				query.select('.main').boundingClientRect(data => {
					// console.log(data)
					height = data.height //盒子tab高度
					console.log(height)
					//通过手机高度和盒子高度来判断页面是否全屏显示
				}).exec()
				query.select('.main-form').boundingClientRect(data => {
					// console.log(data)
					formHeight = data.height //盒子tab高度
					// console.log(formHeight)
					that.scrollHeight = height - formHeight;
					console.log(that.scrollHeight)
					//通过手机高度和盒子高度来判断页面是否全屏显示
				}).exec()
		},
		methods: {
			onSubmit() {
			  const that = this;

			  that.tableData = [];
			  
			  switch (that.model.lx) {
				case '01':
				  goldshgold({
					  appkey: '3ce7f5aa37009551'
					}).then(res => {
					if(res.status === 0) {
						that.list = res.result;
						that.columns = that.columnlist.column01;
					}else {
						uni.showToast({
							title: res.msg
						})
					}
				  }).catch(err=>{
					console.log(err)
				  })
				  break;
				case '03':
				  goldhkgold({
					  appkey: '3ce7f5aa37009551'
					}).then(res => {
					if(res.status === 0) {
						that.list = res.result;
						that.columns = that.columnlist.column03;
					}else {
						uni.showToast({
							title: res.msg
						})
					}
				  }).catch(err=>{
					console.log(err)
				  })
				  break;
				case '04':
				  goldbank({
					  appkey: '3ce7f5aa37009551'
					}).then(res => {
					if(res.status === 0) {
						that.list = res.result;
						that.columns = that.columnlist.column04;
					}else {
						uni.showToast({
							title: res.msg
						})
					}
				  }).catch(err=>{
					console.log(err)
				  })
				  break;
				case '05':
				  goldlondon({
					  appkey: '3ce7f5aa37009551'
					}).then(res => {
					if(res.status === 0) {
						that.list = res.result;
						that.columns = that.columnlist.column05;
					}else {
						uni.showToast({
							title: res.msg
						})
					}
				  }).catch(err=>{
					console.log(err)
				  })
				  break;
				case '06':
				  goldstoregold({
					  appkey: '3ce7f5aa37009551'
					}).then(res => {
					if(res.status === 0) {
						that.list = res.result.list;
						that.columns = that.columnlist.column06;
					}else {
						uni.showToast({
							title: res.msg
						})
					}
				  }).catch(err=>{
					console.log(err)
				  })
				  break;
			  }
			}
		}
	}
</script>

<style scoped lang="scss">
	.main, .scroll-list {
		width: 100%;
		height: 100%;
	}
	
	.main-form {
		padding: 10rpx;
		background-color: #FFF;
	}
	
	button {
		height: 80rpx;
		line-height: 80rpx;
		letter-spacing: 40rpx;
		font-size: 1rem;
	}
	
	.scroll-list {
		background-color: #f7f7f7;
	}
	
	.card-box {
		margin: 20rpx;
		padding: 10rpx;
		box-sizing: border-box;
		border-radius: 5rpx;
		background-color: antiquewhite;
	}
	
	.card-item {
		width: 100%;
		padding: 0 20rpx;
		height: 60rpx;
		border-bottom: thin solid #FFF;
		box-sizing: border-box;
		.card-item-child {
			display: flex;
			justify-content: space-between;
			align-items: center;
			> view:nth-child(1) {
				color: #3a3a3a;
			}
			> view:nth-child(2) {
				color: #909399;
			}
		}
	}
</style>
