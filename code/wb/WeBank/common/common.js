const common = {
	//判断传入的值是否不为null，undefined，空字符串，过滤前后的空格
	hasLength: function(target) {
		return !(undefined === target || null === target || "" === target || target.trim().length === 0);
	},
	//将json转换成字符串
	toJson: (object) => {
		return JSON.stringify(object);
	},
	//将字符串转换成json
	toObject: (valString) => {
		return JSON.parse(valString);
	},
	//将对象转换成json
	deepClone: (object) => {
		return common.toObject(common.toJson(object));
	},
	//比较两个对象是否相等
	compareObjectDeep: (val1, val2) => {
		return common.toJson(val1) === common.toJson(val2);
	}
};
//cos对象存储
export default common;