import Vue from 'vue'
import VueRouter from 'vue-router'
import webank from "../page/wb/webank.vue";
import {
	RouterTabRoutes
} from 'vue-router-tab';

const importPage = view => () =>
	import(`../page/${view}.vue`)

Vue.use(VueRouter);

const routes = [{
	path: '/',
	component: webank,
	meta: {
		title: '主页' // 页签标题
	},
	children: [
		// 引入 RouterTab 内置路由以支持 iframe 页签
		...RouterTabRoutes,

		{
			path: '/', // 默认页和父级路由一致
			name: 'index',
			component: importPage('index'),
			meta: {
				title: '主页' // 页签标题
			}
		},
		{
			path: '/wb/webank', // 默认页和父级路由一致
			name: 'wb_webank',
			component: importPage('/wb/webank'),
			meta: {
				title: '' // 页签标题
			}
		},
		{
			path: '/wangye/wy', // 默认页和父级路由一致
			name: 'wangye_wy',
			component: importPage('/wangye/wy'),
			meta: {
				title: '' // 页签标题
			}
		},
		
	]
}];

const router = new VueRouter({
	routes
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
} //vue相同路由跳转报错问题处理

export default router;
