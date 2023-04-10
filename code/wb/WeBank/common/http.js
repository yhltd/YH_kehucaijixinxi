import axios from "axios";
import runtime_config from "./config";
import message from "./message.js";
import store from '../common/store.js';

axios.defaults.withCredentials = true;
//允许跨域携带cookie信息，cookies信息指某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）。
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.put["Content-Type"] = "application/json";
console.log(axios.defaults.headers);
let _instance = axios.create({
	withCredentials: true,
	baseURL: runtime_config[process.env.NODE_ENV].path
});
_instance.interceptors.request.use(//拦截请求
	config => {
		return config;
	}, 
	error => {
		console.log("出错了")
	}
);

const httpObject = {
	
	_changeParam: param => {
		if (process.env.NODE_ENV !== "local") {
			param.params = param.param;
		}
		return param;
	},
	put: param => {
		param.method = "put";
		return httpObject._request(httpObject._changeParam(param));
	},
	get: param => {
		param.method = "get";
		return httpObject._request(httpObject._changeParam(param));
	},
	post: param => {
		param.method = "post";
		return httpObject._request(httpObject._changeParam(param));
	},
	"delete": param => {
		param.method = "delete";
		return httpObject._request(httpObject._changeParam(param));
	},
	_request: param => {
		return new Promise((resolve, reject) => {
			_instance.request(param)
				.then(res => {
					
					console.log(res);
					let response = typeof res === "string" ? JSON.parse(res) : res;
					
					
					let responseData = response.data;
					
					let statu = responseData.statuCode;
					if ("success" === statu) {
						resolve(responseData.resultData);
					} 
					else if (statu === "notLogin") {
						store.commit('loginOut');
					}
					else if (statu === "fail") {
						message.warning(responseData.resultMessage);
					}
					else if (statu === "error") {
						message.error(responseData.resultMessage);
					} else {
						message.error("系统出现未知错误！");
					}
				})
				.catch(err => {
					message.error("系统出现未知错误！");
				});
		});
	}
}



export default httpObject;