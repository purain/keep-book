/*
* @Author: purain
* @Date:   2019-06-21 20:32:53
* @Last Modified by:   purain
* @Last Modified time: 2019-06-23 21:44:17
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import { Colors } from '../utility';

class CategorySelect extends React.Component{
	constructor(props){
		super(props);
	}
	selectCategory(event,categoryId){
		this.props.onSelectCategoryId(categoryId);
		event.preventDefault();
	}
	render(){
		const { categories, selectedCategoryId } = this.props;
		return (
			<div className="category-select-component">
				<div className="row">
				{
					categories.map((category, index) => {
						const iconColor = (selectedCategoryId === category.id) ? Colors.white : Colors.gray;
						const backColor = (selectedCategoryId === category.id) ? Colors.blue : Colors.lightGray;
						
						return (
							<div className='category-item col-3'
								style={{ textAlign: 'center'}}
								key={index}
								onClick={(event) => this.selectCategory(event,category.id)}
							>
								<Ionicon 
									className="rounded-circle"
									style={{backgroundColor: backColor, padding: '5px'}}
									fontSize="50px"
									color={iconColor}
									icon={category.iconName}
								/>
								<p>{category.name}</p>
							</div>
						);
					})
				}
				</div>
			</div>
		);
	}
}
CategorySelect.propTypes = {
	categories: PropTypes.array.isRequired,
	onSelectCategoryId: PropTypes.func.isRequired
}

export default CategorySelect;