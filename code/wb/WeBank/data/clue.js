import Mock from 'mockjs';

let data = [
	{
		key: "/clue/info",
		method: "get",
		data: () => {
			return Mock.mock({
				'statuCode': "success",
				'resultData': {
					"clueId": 1,
					"tel": "13942619755",
					"secCode": "210211192001013514",
					"cu": "1212",
					"ct": "1985-04-20 04:24:12",
					"uu": "1234",
					"ut": "1985-04-20 04:24:12",
					"des": "线索信息描述，女40岁，爱好健身",
					"belongUserId": "张三"
				}
			});
		}
	},
	{
		key: "/clue/info",
		method: "delete",
		data: function() {
			return Mock.mock({
				'statuCode': "success",
				'resultData': "",
			});
		}
	},
	{
		key: "/clue/info",
		method: "put",
		data: function() {
			return Mock.mock({
				'statuCode': "SUCCESS",
				'resultData': "",
			});
		}
	},
	{
		key: "/clue/info",
		method: "post",
		data: function() {
			return Mock.mock({
				'statuCode': "success",
				'resultData': "",
			});
		}
	},
	{
		key: "/clue/page/g",
		method: "post",
		data: () => {
			return Mock.mock({
				'statuCode': "success",
				'resultData': {
					'current': 0,
					'size': 10,
					'pages': 1,
					'total': 11,
					"records|10": [{
						'clueId': '@increment(1)',
						'tel|11': /[0-9]/,
						'secCode|18': /[0-9]/,
						'belongUserName': '@cname()',
						'uuName': '@cname()',
						'ct': '@datetime("yyyy-MM-dd hh:mm:ss")',
						'ut': '@datetime("yyyy-MM-dd hh:mm:ss")',
					}]
				}
			});
		}
	},
];

export default data;