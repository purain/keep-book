/*
* @Author: purain
* @Date:   2019-06-18 22:04:36
* @Last Modified by:   purain
* @Last Modified time: 2019-06-19 00:29:32
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import { LIST_VIEW, CHART_VIEW } from '../utility.js';

const generageLinkClass = (current, view) => {
	return current === view ? 'nav-link active' : 'nav-link';
}
const ViewTab = ({ activeTab, onTabChange}) => (
	<ul className="nav nav-tabs nav-fill my-4">
		<li className="nav-item">
			<a 	href="#" 
				className={generageLinkClass(activeTab, LIST_VIEW)}
				onClick={(event) => {event.preventDefault(); onTabChange(LIST_VIEW)}}
			>
				<Ionicon className="rounded-circle mr-2"
					font-size="25px" 
					color={'#007bff'}
					icon={'ios-paper'}
				/>
				列表模式
			</a>
		</li>
		<li className="nav-item">
			<a 	href="#" 
				className={generageLinkClass(activeTab, CHART_VIEW)}
				onClick={(event) => {event.preventDefault(); onTabChange(CHART_VIEW)}}
			>
				<Ionicon className="rounded-circle mr-2"
					font-size="25px" 
					color={'#007bff'}
					icon={'ios-pie'}
				/>
				图表模式
			</a>
		</li>
	</ul>
)
ViewTab.propTypes = {
	activeTab: PropTypes.string.isRequired,
	onTabChange: PropTypes.func.isRequired
}

export default ViewTab;