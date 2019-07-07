/*
* @Author: purain
* @Date:   2019-06-22 18:55:17
* @Last Modified by:   purain
* @Last Modified time: 2019-06-22 19:19:32
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import { AppContext } from './App';

const withContext = (Component) => {
	return (props) => (
		<AppContext.Consumer>
		{({state, actions}) => {
			return <Component {...props} data={state} actions={actions} />
		}}
		</AppContext.Consumer>
	)
}

export default withContext;