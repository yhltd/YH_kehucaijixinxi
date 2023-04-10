<template>
	<div>
		<div v-if="quanxian.limits == 2" id="beijingse">
			<div id="biantikuaiyanse">
				<div id="tupian" ><img src="../../src/assets/zhaopian.png"/></div>
				<div id="biaoti">企业票贷申请表</div>
				<div id="biaoti2">以下内容均填写法人信息认证使用</div>
			</div>
			<div id="biaoge">
				<Form id="fm"  ><!-- :rules="ruleValidate" -->
					<Form-item  v-for="(item,i) in orderitems"  :label-width="98.5">
						<span id="xing">*</span>
						<span id="wwen">{{i+1}} : {{item.titlePen}}</span><br />
						<span id="zihao">{{item.titleRemarks}}</span><br />
						<Input v-if="orderitems[i].titleCensus == 1"  id="shurukuang" v-model="orderitems[i].orderKey" placeholder="请输入"></Input>
						 <Select v-if="orderitems[i].titleCensus == 2"  id="shurukuang" v-model="orderitems[i].orderKey">
						        <Option  value=" "> {{item.titleAnswer.split(',')}} </Option>
						 </Select>
						 <Radio-group v-if="orderitems[i].titleCensus == 3"  id="shurukuang" v-model="orderitems[i].orderKey" vertical>
							 <Radio >
								 <input type="radio" name="y" checked="checked" /><br />
								 <span>Apple</span>
							 </Radio>
						</Radio-group>
					</Form-item>
				</Form>
				<Button id="tijiao" type="primary"  @click="tijiaowenti()"  >提交</Button>
			</div>
		</div>
		<div v-if="quanxian.limits == 1">
			<div id="neilian" >
				<div id="quan2biaoti">
					客户意向收集
				</div>
				<div id="zhengxun">
					客户需求征询表
				</div>
			</div>
			<div id="yonghu">
				<span id="dangqian">当前用户:{{ quanxian.userName}}</span>
				<span>搜索用户:{{user.userName}}</span>
				<Button id="shuaxin" @click="shua()" type="primary" size="small">刷新页面</Button>
				<Button  @click="xiugai()" type="primary" size="small">修改题目</Button>
				<Button id="tian"  @click="tian()" type="primary" size="small">添加用户</Button>
				<input id="zh" v-model="user.account" type="text"placeholder="请输入账号" /><br />
				<input id="mi" v-model="user.password" type="text"placeholder="请输入密码" /><br />
				<Button id="qding" @click="queding()" type="primary">确定</Button>
				<div v-show="vshow" id="xianshikuang">
					<input id="xm" v-model="user2.userName" type="text"placeholder="请输入姓名" /> : 姓名<br />
					<input id="zhha" v-model="user2.account" type="text"placeholder="请输入账号" /> : 账号<br />
					<input id="ma" v-model="user2.password" type="text"placeholder="请输入密码" /> : 密码<br />
					<input id="ma2" v-model="user2.password2" type="text"placeholder="请输入确认密码" /> : 确认密码<br />
					<input id="quxi" v-model="user2.limits"  type="text"placeholder="请输入权限" /> : 权限<br />
					<Button id="ding" @click="ding()" type="primary">确定</Button>
					<Button id="xiao"  @click="xiao()"  type="primary">取消</Button>
				</div>
			</div>
			<div id="lianggebiao">
				<Table id="biaoge2" :row-class-name="rowClassName" :columns="tabl.colum" :data="tabl.data"></Table>
				<Table id="biaoge3"  :columns="tablitem.columitem" :data="tablitem.data"></Table>
			</div>
		</div>
		<div v-else-if="quanxian.limits == 22">
			<div>
				<Table  :columns="tabletitle.columitem" :data="tabletitle.data"></Table>
			</div>
			<div id = "titl3e">
				<Button @click="xiugai()" id="sh" type="primary">刷新</Button>
				<Button @click="ti()" id="ti" type="primary">添加</Button>
				<Button @click="fa()" id="fa" type="primary">返回</Button>
				<div id="shuruti" v-show="dialog">
					<input id="tm" v-model="title.titlePen" type="text"placeholder="请输入题目" /><br />
					<input id="daan" v-model="title.titleAnswer" type="text"placeholder="请输入答案(逗号隔开)" /><br />
					<input id="bz" v-model="title.titleRemarks" type="text"placeholder="请输入备注" /><br />
					<input id="bz" v-model="title.titleCensus" type="text"placeholder="1输入框,2下拉框,3单选框" /><br />
					<Button id="qd" @click="que()" type="primary">确定</Button>
					<Button id="qx" @click="qu()" type="primary">取消</Button>
				</div>
			</div>
		</div>
		<div v-else-if="quanxian.limits == 33">
			<div><!-- :span-method="handleSpan" -->
				<Table :span-method="handleSpan"  border :columns="tableda.columitemda" :data="tableda.data"></Table>
				<!-- <Button id="da" @click="dayinchulai()"  type="primary">打印</Button> -->
				<Button id="fah" @click="fa()" type="primary">返回</Button>
			</div>
		</div>
	</div>
</template>

<script>
	
	import store from '../../common/store.js';
	import local from '../../common/_local.js';
	import axios from 'axios';
  document.write('<link rel="stylesheet" href="wbank.css">');


	
	export default {
	        data () {
	            return {
					vshow:false,
					dialog: false,
					title:{
						titlePen:"",
						titleAnswer:"",
						titleRemarks:"",
					},
					user:{
						userName:"",
						userId:"",
						account:"",
						password:"",
					},
					user2:{
						userName:"",
						account:"",
						password:"",
						password2:"",
						limits:"",
					},
					quanxian:{
						orderUserId:"",
						userName:"",
						limits:"",
						text:"",
					},
					orderAndOrderitem:{
						userId:"",
					},
					orderitems:[],
					orderite:{
						orderTitle:"",
						orderKey:"",
					},
					tabl:{
						currentPage: 1,
						pageSize:8,
						orderTime:"",
						colum:[
							{
							    title: '序号 ',
							    key: 'index',
								align:'right',
								render:(h,params)=> {
									return h("span",params.index + (this.tabl.currentPage -1) * this.tabl.pageSize +1)
								},
								
							},
							{
							    title: '提交时间 ',
							    key: 'orderTime',
								align:'left',
							},
							{
							    title: '打印',
							    key: 'tiaozhuan',
								align:'right',
								 render: (h, params) => {
								     return h('div',[
										 h('Button',{
											 props:{
												 type:"primary",
												 size:"small"
											 },
											 on:{
												 click:()=>{
													 this.dayin(params.row.orderTime)
												 }
											 }
										 },"arrange")
									 ])
								 } 
							},
							{
							    title: '查询',
							    key: '查询',
								align:'left',
								 render: (h, params) => {
								     return h('div',[
										 h('Button',{
											 props:{
												 type:"primary",
												 size:"small"
											 },
											 on:{
												 click:()=>{
													 this.chaxunitem(params.row.orderTime)
												 }
											 }
										 },"check ")
									 ])
								 }
							}
						],
						data: []
					},
					tablitem:{
						orderTitle:"",
						orderKey:"",
						columitem:[
							{
							    title: '问题 ',
							    key: 'orderTitle',
								align:'center',
								
								
							},
							{
							    title: '答案',
							    key: 'orderKey',
								align:'left',
							}
						],
						data: []
					},
					tabletitle:{
						currentPage: 1,
						pageSize:8,
						titlePen:"",
						titleAnswer:"",
						titleRemarks:"",
						titleCensus:"",
						columitem:[
							{
							    title: '序号 ',
							    key: 'index',
								align:'center',
								render:(h,params)=> {
									return h("span",params.index + (this.tabletitle.currentPage -1) * this.tabletitle.pageSize +1)
								},
								
							},
							{
							    title: '问题 ',
							    key: 'titlePen',
								align:'right',
							},
							{
							    title: '答案',
							    key: 'titleAnswer',
								align:'left',
							},
							{
							    title: '备注',
							    key: 'titleRemarks',
								align:'center',
							},
							{
							    title: '统计',
							    key: 'titleCensus',
								align:'center',
							},
							{
							    title: '删除',
							    key: '删除',
								align:'right',
								 render: (h, params) => {
								     return h('div',[
										 h('Button',{
											 props:{
												 type:"error",
												 size:"small"
											 },
											 on:{
												 click:()=>{
													 this.shanchu(params.row.titlePen)
												 }
											 }
										 },"delete")
									 ])
								 } 
							}
						],
						data: []
					},
	                tableda:{
						currentPage: 1,
						pageSize:8,
	                	orderTime:"",
						orderTitle:"",
	                	orderKey:"",
	                	columitemda:[
							{
							    title: '时间 ',
							    key: 'orderTime',
								align:'center',
								
							},
							{
							    title: '序号 ',
							    key: 'index',
								align:'center',
								render:(h,params)=> {
									return h("span",params.index + (this.tableda.currentPage -1) * this.tableda.pageSize +1)
								},
								
							},
	                		{
	                		    title: '问题 ',
	                		    key: 'orderTitle',
	                			align:'center',
	                			
	                			
	                		},
	                		{
	                		    title: '答案',
	                		    key: 'orderKey',
	                			align:'center',
	                		}
	                	],
	                	data: []
	                },
	               
	            }
	        },
			methods: {
				handleSpan({ row, column, rowIndex, columnIndex }) {
					  if (columnIndex === 0) {
					     return {
					       rowspan: row.mergeCol === 0 ? 0:row.mergeCol,
					       colspan: row.mergeCol === 0 ? 0:1
					     };
					   }
					 },
					 //name 是你想要合并的字段名称
					 integratedData(data) {
					   let arrId = [];
					   data.forEach(i => {
					     !arrId.includes(i.orderTime) ? arrId.push(i.orderTime) : arrId;
					   });
					   console.log(arrId)
					   let arrObj = [];
					   arrId.forEach(j => {
					     arrObj.push({
					       month: j,
					       num: 0
					     })
					   })
					   // 计算每个数据的可跨行数
					   data.forEach(k => {
					     arrObj.forEach(l => {
					       k.orderTime === l.month ? l.num ++ : l.num;
					     })
					   })
					   data.forEach((m,mIndex) => {
					     arrObj.forEach((n,index) => {
					       if(m.orderTime === n.orderTime){
					         if(arrId.includes(m.orderTime)){
					           m.mergeCol = n.num;
					           arrId.splice(arrId.indexOf(m.naorderTimeme),1);
					         }else{
					           m.mergeCol = 0;
					         }
					       }
					     })
					   })
					   this.tableda= data;
				
                },
				//第一次刷新页面的页数
				search: function() {
					this.loadData();
					this.fuzhi();
					this.quanxianheader();
				},
				shua:function(){
					this.quanxianheader();
					
				},
				//查题接口
				loadData: function(){
					this.http.get({
						url:"/title/info",
						param : {}
					}).then(data => {
						this.orderitems = data;
					})
				},
				
				tijiaowenti: function() {
					
						console.log(this.orderitems)
						console.log("ppppppppppppppppppppppppppppppppppppppppppppppp")
							for (var i = 0; i < this.orderitems.length; i++) {
								if(null == this.orderitems[i].orderKey || "" == this.orderitems[i].orderKey || undefined == this.orderitems[i].orderKey  || " " == this.orderitems[i].orderKey  || "  " == this.orderitems[i].orderKey  || "   " == this.orderitems[i].orderKey  || "    " == this.orderitems[i].orderKey  || "     " == this.orderitems[i].orderKey){
										 this.$Message.error('你还有问题没答完，不能提交');
										 return;
									}
								
									this.orderitems[i].orderTitle = this.orderitems[i].titlePen;
							}
						console.log(this.orderitems)
						console.log(this.orderAndOrderitem.userId)
						console.log("/order/pos=======出发前====================================")
							this.http.post({
								url:"/order/pos",
								param : {
										userId: this.orderAndOrderitem.userId,
										// orderitem:this.orderitems.join(',')//变成字符串，以逗号分隔
										orderitem:JSON.stringify(this.orderitems)
										
								}
							}).then(data => {
								console.log(data)
								console.log("/order/pos===========================================")
							})
						
				},
				clear () {
					this.quanxian.text ='';
				},
				quanxianheader: function(){
					this.http.get({
						url:"/order/gett",
						param : {
							orderUserId:this.orderAndOrderitem.userId,
						}
					}).then(data => {
						this.tabl.data= data;
					})
				},
				chaxunitem:function(orderTime){
					this.tabl.orderTime =orderTime
					this.http.get({
						url:"/order/geet",
						param : {
							orderTime:this.tabl.orderTime,
						}
					}).then(data => {
						this.tablitem.data= data;
						this.tablitem.orderKey = data.orderKey;
						this.tablitem.orderTitle = data.orderTitle;
					})
				},
				dayin:function(orderTime){
					this.quanxian.limits = 33;
					this.tabl.orderTime =orderTime;
					this.tableda.data = this.tablitem.data;
					this.tableda.data[0].orderTime = this.tabl.orderTime;
					console.log(this.tableda.data)
					console.log(this.tableda.data[0].orderTime)
					console.log("===========================================")
				},
				xiugai:function(){
				this.quanxian.limits = 22;
				this.titleselect();
				},
				tian:function(){
					this.vshow = true;
				},
				ding:function(){
					if('' == this.user2.userName || null == this.user2.userName){
						 this.$Message.error('姓名不能为空！');
						 return;
					}
					if('' == this.user2.account || null == this.user2.account){
						 this.$Message.error('账号不能为空！');
						 return;
					}
					if('' == this.user2.password || null == this.user2.password || this.user2.password.length <6){
						 this.$Message.error('密码不能为空,密码至少6位！');
						 return;
					}
					if('' == this.user2.password2 || null == this.user2.password2){
						 this.$Message.error('确认密码不能为空！');
						 return;
					}
					if(this.user2.password != this.user2.password2){
						 this.$Message.error('密码与确认密码不符！'); 
						 return;
					}
					if('' == this.user2.limits || null == this.user2.limits){
						 this.$Message.error('权限不能为空！');
						 return;
					}
					if( this.user2.limits >2 || this.user2.limits <1 ){
						 this.$Message.error('权限您只能选择1或2');
						 return;
					}
					console.log(this.user2)
					this.http.post({
						url:"/user/pos",
						param : this.user2,
					}).then(data => {
						 console.log(data)
						 this.$Message.info('添加成功');
					})
					this.xiao();
					this.vshow = false;
				},
				xiao:function(){
					this.vshow = false;
					this.user2.userName ="";
					this.user2.account = "";
					this.user2.password = "";
					this.user2.password2 = "";
					this.user2.limits = "";
				},
				fa:function(){
					this.quanxian.limits = local.getItem("LIMITS");
					this.$router.go(0)
				},
				titleselect: function(){
					this.http.get({
						url:"/title/info",
						param : {}
					}).then(data => {
						this.tabletitle.data = data;
					})
				},
				shanchu:function(titlePen){
					this.tabletitle.titlePen =titlePen
					this.http.post({
						url:"/title/dele",
						param : {
							titlePen:this.tabletitle.titlePen,
						}
					}).then(data => {
						 console.log(data)
					})
					this.xiugai();
				},
				
				que: function() {
					if('' == this.title.titlePen){
						 this.$Message.error('题目不能为空！');
						 return;
					}
					if('' == this.title.titleAnswer){
						 if(this.title.titleCensus >1 || this.title.titleCensus < 1){
						 	 this.$Message.error('因为您答案没填，统计只能为1！');
						 	 return;
						 }
					}
					if('' == this.title.titleCensus){
						 this.$Message.error('统计不能为空！');
						 return;
					}
					if(this.title.titleCensus >3 || this.title.titleCensus < 1){
						 this.$Message.error('统计只能为1 或 2 或 3！');
						 return;
					}
					this.http.post({
						url:"/title/pos",
						param : this.title,
					}).then(data => {
						 console.log(data)
					})
					this.xiugai();
					this.$Message.info('保存成功');
					this.dialog =false;
					this.title.titlePen="";
					this.title.titleAnswer="";
					this.title.titleRemarks="";
					this.title.titleCensus="";
				},
				queding: function() {
					if('' == this.user.account){
						 this.$Message.error('账号不能为空！');
						 this.user.account="";
						 return;
					}
					if('' == this.user.password){
						 this.$Message.error('密码不能为空！');
						 this.user.password="";
						 return;
					}
					this.http.get({
						url:"/user/info",
						param : {
							account:this.user.account,
							password:this.user.password,
							
						}
					}).then(data => {
						 this.user.userId = data.userId;
						 this.user.userName = data.userName;
						 if(this.user.userId == '' || this.user.userName == ''){
						 	this.$Message.error('账号或密码错误')
						 	this.user.account="";
						 	this.user.password="";
						 }else{
						 	this.$Message.info('查询成功');
						 		this.user.account="";
						 		this.user.password="";
						 	this.chongcha();
						 }	
					})
					
				},
				chongcha:function(){
					this.http.get({
						url:"/order/gett",
						param : {
							orderUserId:this.user.userId,
						}
					}).then(data => {
						this.tabl.data= data;
					})
				},
				ti:function(){
					this.dialog =true;
					this.title.titlePen="";
					this.title.titleAnswer="";
					this.title.titleRemarks="";
					this.title.titleCensus="";
				},
				qu:function(){
					this.dialog =false;
					this.title.titlePen="";
					this.title.titleAnswer="";
					this.title.titleRemarks="";
					this.title.titleCensus="";
				},
				// dayinchulai:function(){
				// 	var OrderInfoReq = {
				// 		orderId:"",
				// 	};
				// 	this.$axios
				// 	.post("192.168.43.127/C:\Users\于贵海\Desktop\wb\yu.xlsx",OrderInfoReq)
				// 	then((response) => {
				// 		console.log(response);
						
				// 		var content = response.data.data.path;
				// 		var raw = window.atob(content);
						
				// 		var uInt8Array = new Uint8Array(raw.length);
						
				// 		for (var i = 0; i < raw.length; ++i) {
				// 			uInt8Array[i] = raw.charCodeAt(i);
				// 		}
						
				// 		var link = document.createElement("a");
				// 		var blob = new Blob([uInt8Array],{
				// 			type:"application/vud.ms-excel",
				// 		});
				// 		link.style.display = "none";
				// 		link.href =URL.createObjectURL(blob);
						
				// 		link.setAttribute("weBank",response.data.data.fileName);
				// 		document.body.appendChild(link);
				// 		link.click();
				// 		document.body.removeChild(link);
				// 	});
				// },
				fuzhi:function(){
					this.orderAndOrderitem.userId = local.getItem("USER_ID");
					this.quanxian.limits = local.getItem("LIMITS");
					this.quanxian.userName = local.getItem("USER_NAME");
					console.log("顾客id")
					console.log(this.orderAndOrderitem.userId)
					console.log("limits")
					console.log(this.quanxian.limits)
					console.log("顾客姓名")
					console.log(this.quanxian.userName)
				},
				rowClassName () {
				 return 'demo-table-info-row';
				},
				
			},
			created(){
				this.search();
			},
			
	    }
</script>

<style >
	
	
</style>
