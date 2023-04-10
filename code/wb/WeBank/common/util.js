
function parseTel(tel) {
 //const reg =/^[1][3-9][0-9]{9}$/;
 var reg = new RegExp("/^[1][3-9][0-9]{9}$/","g")
 return reg.test(tel) ;
}

function parseMoney(money, n) {
	if (money == 'undefined' || money == null || money == '0' || money == undefined || money == "" ||
		parseFloat(money) == 0) {
		return '0.00';
	} else {
		if (money > 0) { //金额为大于0
			n = n > 0 && n <= 20 ? n : 2;
			money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
			var l = money.split(".")[0].split("").reverse();
			var r = money.split(".")[1];
			var t = "";
			for (let i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			}
			return t.split("").reverse().join("") + "." + r;
		} else { //金额小于0
			n = n > 0 && n <= 20 ? n : 2;
			money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
			var l = money.split(".")[0].split("").reverse();
			l.pop();
			var r = money.split(".")[1];
			var t = "";
			for (let i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			}
			return '-' + t.split("").reverse().join("") + "." + r;
		}
	}
}
/**
 *判断是否是数字
 *
 **/

function isRealNum(val) {
	// isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，    
	if (val === "" || val == null) {
		return false;
	}
	if (!isNaN(val)) {
		//对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,   //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
		return true;
	} else {
		return false;
	}
}

function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	},
	dateNomal: function(target) {
		return dateUtils.dateToString(target, "yyyy-MM-dd hh:mm:ss");
	},
	dateYear: function(target) {
		return dateUtils.dateToString(target, "yyyy-MM");
	},
	dateToString: function(target, fmt) {
		var o = {
			"M+": target.getMonth() + 1, //月份 
			"d+": target.getDate(), //日 
			"h+": target.getHours(), //小时 
			"m+": target.getMinutes(), //分 
			"s+": target.getSeconds(), //秒 
			"q+": Math.floor((target.getMonth() + 3) / 3), //季度 
			"S": target.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (target.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[
					k]).length)));
			}
		}
		return fmt;
	}
};

export default {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	parseMoney: parseMoney,
	isRealNum: isRealNum,
	parseTel: parseTel
}
