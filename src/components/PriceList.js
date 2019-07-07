/*
* @Author: purain
* @Date:   2019-06-18 20:00:41
* @Last Modified by:   purain
* @Last Modified time: 2019-07-05 16:16:10
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';

const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
	return (
		<ul className="list-group list-group-flush">
		{
			items.map((item) => (
				<li key={item.id}
				 className="list-group-item d-flex
					justify-content-between align-items-center">
					<span className="col-1 badge">
						<Ionicon className="rounded-circle"
							font-size="30px" 
							style={{backgroundColor: '#007bff', padding: '3px'}}
							color={'#fff'}
							icon={item.category.iconName}
						/>
					</span>
					<span className="col-5">{item.title}</span>
					<span className="col-2 font-weight-bold">
					{item.category.type === 'income' ? '+' : '-'}
					{item.price}元
					</span>
					<span className="col-2">{item.date}</span>
					<a className="col-1"
						href="#"
						onClick={() => {onModifyItem(item)}}>
						<Ionicon className="rounded-circle"
							font-size="30px" 
							style={{backgroundColor: '#28a745', padding: '3px'}}
							color={'#fff'}
							icon={'ios-create-outline'}
						/>
					</a>
					<a className="col-1"
						href="#"
						onClick={() => {onDeleteItem(item)}}>
						<Ionicon className="rounded-circle"
							font-size="30px" 
							style={{backgroundColor: '#dc3545', padding: '3px'}}
							color={'#fff'}
							icon={'ios-close'}
						/>
					</a>
				</li>
			))
		}
		</ul>
	)
}
PriceList.propTypes = {
	items: PropTypes.array.isRequired,
	onModifyItem: PropTypes.func.isRequired,
	onDeleteItem: PropTypes.func.isRequired
}
PriceList.defaultProps = {
	onModifyItem: () => {},
	onDeleteItem: () => {}
}
export default PriceList;