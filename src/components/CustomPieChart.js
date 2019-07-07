/*
* @Author: purain
* @Date:   2019-06-24 19:31:14
* @Last Modified by:   purain
* @Last Modified time: 2019-06-24 22:22:30
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, LabelList } from 'recharts';
import { Colors } from '../utility';

let colorsArr = Reflect.ownKeys(Colors).map(key => Colors[key]);

const CustomPieChart = ({title, categoryData}) => {
	if(categoryData.length === 0){
		return <h3 className="text-center mt-3">{title}<h5>还没有任何数据</h5></h3>
	}else{
		return (
			<div className="pie-chart-component">
				<h3 className="text-center mt-3">{title}</h3>
				<ResponsiveContainer width={'100%'} height={300}>
					<PieChart>
						<Pie data={categoryData} 
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%" 
							outerRadius={100}
							label
							>
						{
							categoryData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={colorsArr[index % colorsArr.length]}/>
							))
						}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>
		);
	}
}
CustomPieChart.propTypes = {
	title: PropTypes.string,
	categoryData: PropTypes.array
}
export default CustomPieChart;