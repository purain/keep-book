/*
* @Author: purain
* @Date:   2019-06-19 20:52:40
* @Last Modified by:   purain
* @Last Modified time: 2019-06-21 16:13:01
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import PropTypes from 'prop-types';

const TotalPrice = ({income, outcome}) => {
	return (
		<div className="row">
			<div className="col">
				<h5 className="income">收入：<span>{income}</span> 元</h5>
			</div>
			<div className="col">
				<h5 className="outcome">支出：<span>{outcome}</span> 元</h5>
			</div>
		</div>
	);
}
TotalPrice.propTypes = {
	income: PropTypes.number.isRequired,
	outcome: PropTypes.number.isRequired
}

export default TotalPrice;