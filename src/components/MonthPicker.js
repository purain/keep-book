/*
* @Author: purain
* @Date:   2019-06-19 16:31:05
* @Last Modified by:   purain
* @Last Modified time: 2019-06-23 19:14:54
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import { padLeft, range } from '../utility.js';

class MonthPicker extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isOpen: false,
			selectedYear: this.props.year,
			selectedMonth: this.props.month
		}
	}
	componentDidMount(){
		document.addEventListener('click', this.handleClick,false);
	}
	componentWillUnmount(){
		document.removeEventListener('click', this.handleClick,false);
	}
	handleClick = (event) => {
		if(this.node.contains(event.target)){
			return;
		}
		this.setState({
			isOpen: false
		})
	}
	// 打开或关闭菜单
	toggleDropdown(event){
		event.preventDefault();
		this.setState({
			isOpen: !this.state.isOpen,
		})
	}

	// 更改菜单中的年月
	selectYear(event, yearNumber){
		event.preventDefault();
		this.setState({
			selectedYear: yearNumber
		})
	}
	selectMonth(event, monthNumber){
		event.preventDefault();
		this.setState({
			isOpen: false,
			selectedMonth: monthNumber
		})
		this.props.onChange(this.state.selectedYear,monthNumber);
	}
	render(){
		const { selectedYear, selectedMonth } = this.state;
		const { isOpen } = this.state;
		const yearRange  = range(9, -4).map(number => number + selectedYear);
		const monthRange = range(12, 1);
		return (
			<div className="dropdown month-picker-component" ref={(ref) => {this.node = ref}}>
				<h4>选择月份</h4>
				<button 
					onClick={(event) => this.toggleDropdown(event)}
					className="btn btn-lg btn-secondary dropdown-toggle">
					{`${selectedYear}年 ${padLeft(selectedMonth)}月`}
				</button>
				{
					isOpen && 
					<div className="dropdown-menu" style={{display: 'block'}} >
						<div className="row">
							<div className="col border-right">
							{
								yearRange.map((yearNumber, index) => 
									<a 	key={index} 
										href="#"
										onClick={(event) => this.selectYear(event, yearNumber)}
										className={(yearNumber === selectedYear ? 'dropdown-item active' : 'dropdown-item')}
									>
										{yearNumber} 年
									</a>
								)
							}
							</div>
							<div className="col">
							{
								monthRange.map((monthNumber, index) => 
									<a 
										key={index}
										href="#"
										onClick={(event) => this.selectMonth(event, monthNumber)}
										className={(monthNumber === selectedMonth ? 'dropdown-item active' : 'dropdown-item')}
									>
										{padLeft(monthNumber)} 月
									</a>
								)
							}
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}
MonthPicker.propTypes = {
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
}

export default MonthPicker;