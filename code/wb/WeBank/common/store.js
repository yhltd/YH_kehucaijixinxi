import Vue from 'vue';
import Vuex from 'vuex';
import local from './_local.js';
import http from './http.js';

Vue.use(Vuex);

let loginObject = {
	login: function(param) {
		return new Promise((resolve, reject) => {
			http.get({
				url: "/user/info",
				param: param.data
			}).then(data => {
				console.log(data)
				console.log("++++++++++++++++++++++++++++++++++++++++++++====")
				if (!param.rem) {
					local.setItem("LIMITS", data.limits);
					local.setItem("USER_ID",data.userId);
					local.setItem("USER_NAME",data.userName);
				}
				local.session.setItem("CURRENT_USER", data);
			
			
			
				resolve(data);
					
			});
		});
	}
};

const store = new Vuex.Store({
	state: {
		isAlreadyLogin: false,
		currentUser: undefined
	},
	mutations: {
		checkLogin(state) {
			let currentUser = local.session.getItem("CURRENT_USER");
			if (currentUser) {
				state.isAlreadyLogin = true;
				state.currentUser = currentUser;
				return;
			}
			return;
			let loginParam = local.getItem("LOGIN_INFO");
			if (loginParam && 
				loginParam.data &&
				loginParam.data.password && 
				loginParam.data.account) {
				loginObject.login(loginParam).then(data => {
					state.isAlreadyLogin = true;
					state.currentUser = data;
				});
			}
		},
		login(state, param) {
			loginObject.login(param).then(data => {
				state.isAlreadyLogin = true;
				state.currentUser = data;
			});
		},
		loginOut(state) {
			state.isAlreadyLogin = false;
			state.currentUser = undefined;
			local.session.removeItem("CURRENT_USER");
		}
	}
});
store.local = local;

export default store;
