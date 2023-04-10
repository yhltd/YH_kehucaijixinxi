import Mock from 'mockjs';
import clue from "../data/clue"
let baseURL = runtime_config[process.env.NODE_ENV].path;

let businessDataArray = [
	clue
];

for (let index in businessDataArray) {
	let itemDataArray = businessDataArray[index];
	for (let jndex in itemDataArray) {
		let dataObject = itemDataArray[jndex];

		Mock.mock(baseURL + dataObject.key, dataObject.method, () => {
			if ("function" === typeof dataObject.data) {
				return dataObject.data();
			}
			return dataObject.data;
		});
	}
}