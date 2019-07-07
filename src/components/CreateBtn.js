/*
* @Author: purain
* @Date:   2019-06-19 23:58:35
* @Last Modified by:   purain
* @Last Modified time: 2019-06-21 14:50:30
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

const CreateBtn = ( {onClick} ) => (
	<button className="btn btn-primary btn-block
		 d-flex justify-content-center align-items-center"
		onClick={() => onClick()}
	>
		<Ionicon 
			className="rounded-circle"
			fontSize="25px"
			color="#fff"
			icon="ios-add-circle"
		/>
		创建新的记账记录
	</button>
);
CreateBtn.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default CreateBtn;