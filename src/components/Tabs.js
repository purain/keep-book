/*
* @Author: purain
* @Date:   2019-06-22 14:39:54
* @Last Modified by:   purain
* @Last Modified time: 2019-06-23 19:12:10
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import PropTypes from 'prop-types';

export class Tabs extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			activeIndex: props.activeIndex
		}
	}
	tabChange(e, index){
		this.setState({
			activeIndex: index
		})
		this.props.onTabChange(index);
	}
	render(){
		const { children } = this.props;
		const { activeIndex } = this.state;
		return (
			<ul className="nav nav-tabs nav-fill my-3">
				{React.Children.map(children, (child, index) => {
					const activeClassName = (activeIndex === index) ? 'nav-link active' : 'nav-link';
					return (
						<li className="nav-item">
							<a 	href="#" 
								onClick={(e) => this.tabChange(e, index)}
								className={activeClassName}
							>
								{child}
							</a>
						</li>
					);
				})}
			</ul>
		);
	}
}
Tabs.propTypes = {
	activeIndex: PropTypes.number.isRequired,
	onTabChange: PropTypes.func.isRequired
}

export const Tab = ({ children }) => 
	<React.Fragment>{children}</React.Fragment>