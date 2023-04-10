// 运行环境
let runtime_config = {
	production : {
		path: "https://info.gaoyuanzb.club:8010/admin"
	},
	test : {
		path: "http://192.168.1.5:8010/admin"
	},
	dev: {
		path: "http://localhost:8060/"
	},
	local : {
		path: ""
	}
}

export default runtime_config;