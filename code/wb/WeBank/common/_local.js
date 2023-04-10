
const _local = {
	//本地存储，存数据
	setItem: (key, value) => {
		value = value === undefined ? {} : value;
		localStorage.setItem(key, JSON.stringify(value));
	},
		//本地存储，取数据
	getItem: key => {
		let value = localStorage.getItem(key);
		value = value === undefined ? {} : value;
		return JSON.parse(value);
	},
		//本地存储，根据key值删除一条数据
	removeItem: key => {
		localStorage.removeItem(key);
	},
	session: {
			//临时存储，存数据
		setItem: (key, value) => {
			value = value === undefined ? {} : value;
			sessionStorage.setItem(key, JSON.stringify(value));
		},
		//临时存储，取数据
		getItem: key => {
			let value = sessionStorage.getItem(key);
			value = value === undefined ? {} : value;
			return JSON.parse(value);
		},
		//临时存储，根据key值删除一条数据
		removeItem: key => {
			sessionStorage.removeItem(key);
		}
	}
};

export default _local;