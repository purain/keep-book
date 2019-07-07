/*
* @Author: purain
* @Date:   2019-06-18 22:12:23
* @Last Modified by:   purain
* @Last Modified time: 2019-07-07 16:57:45
* @E-mail: 1073357107@qq.com
*/
// 列表模式或图表模式
export const LIST_VIEW = 'list';
export const CHART_VIEW = 'chart';
export const TYPE_OUTCOME = 'outcome';
export const TYPE_INCOME = 'income';

// 为月份补0
export const padLeft = (n) => {
	return n < 10 ? '0'+n : n;
}

// 年和月份的范围
export const range = (size, startAt = 0) => {
	const arr = [];
	for(let i=0;i<size; i++){
		arr[i] = startAt + i;
	}
	return arr;
}

export const parseToYearAndMonth = (str) => {
	const date = str ? new Date(str) : new Date();
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1
	}
}

export const Colors = {
  blue: '#347eff',
  deepBlue: '#61dafb',
  green: '#28a745',
  red: '#dc3545',
  gray: '#555',
  lightGray: '#efefef',
  white: '#fff',
}

export const flatternArrToObj = arr => {
	return arr.reduce((prev, curr) => {
		prev[curr.id] = curr;
		return prev;
	}, {})
}

export const objToArr = obj => {
	let arr=[];
	for(let i in obj){
		arr.push(obj[i])
	}
	return arr;
}

export const ID = () => {
	return '_'+Math.random().toString(36).substr(2,9);
}
