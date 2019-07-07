/*
* @Author: purain
* @Date:   2019-06-23 20:22:24
* @Last Modified by:   purain
* @Last Modified time: 2019-06-23 20:26:54
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import Ionicon from 'react-ionicons';

const Loader = () => (
	<div className="loading-component text-center">
		<Ionicon icon="ios-refresh"
			fontSize='40px'
			color='#347eff'
			rotate={true} />
		<h5>加载中</h5>
	</div>
)

export default Loader;