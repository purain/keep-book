/*
* @Author: purain
* @Date:   2019-06-20 20:43:52
* @Last Modified by:   purain
* @Last Modified time: 2019-06-24 21:14:27
* @E-mail: 1073357107@qq.com
*/
import React 			from 'react';
import {withRouter} 	from 'react-router-dom';
import Ionicon 			from 'react-ionicons';
import MonthPicker 		from '../components/MonthPicker';
import TotalPrice 		from '../components/TotalPrice';
import CreateBtn 		from '../components/CreateBtn';
import PriceList 		from '../components/PriceList';
import { Tabs, Tab } 	from '../components/Tabs';
import CustomPieChart 	from '../components/CustomPieChart';
import Loader 	 		from '../components/Loader';
import withContext 		from '../withContext';
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME,
	 parseToYearAndMonth, padLeft, objToArr, Colors } from '../utility.js';

import '../App.css';

const tabsText = [LIST_VIEW, CHART_VIEW];
const generateChartDataByCategory = (items, type = TYPE_INCOME) => {
	let categoryMap = {};
	items.filter(item => item.category.type === type)
		 .forEach(item => {
		if(categoryMap[item.cid]){
			categoryMap[item.cid].value += (item.price * 1);
			categoryMap[item.cid].item.push(item.id)
		}else{
			categoryMap[item.cid] = {
				name: item.category.name,
				value: item.price * 1,
				item: [item.id]
			}
		}
	})
	return Reflect.ownKeys(categoryMap).map(key => ({ ...categoryMap[key]}));
}

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tabView: LIST_VIEW,
		}
	}
	componentDidMount(){
		this.props.actions.getInitialData();
	}
	changeView(index){
		this.setState({
			tabView: tabsText[index]
		})
	}
	changeDate(year, month){
		this.props.actions.changeDate(year, month);
	}
	modifyItem(item){
		this.props.history.push(`/edit/${item.id}`);
	}
	createItem(){
		this.props.history.push('/create');
	}
	deleteItem(item){
		this.props.actions.deleteItem(item);
	}
	render(){
		let { data } = this.props;
		let items = objToArr(data.items);
		let {currentDate, isLoading} = data;
		let { tabView } = this.state;
		let itemsWithCategory = items.map( item => {
			item.category = data.categories[item.cid];
			return item;
		});
		let chartOutcomeDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME);
		let chartIncomeDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_INCOME);
		// console.log(chartOutcomeDataByCategory);
		let TotalIncome = 0,
			TotalOutcome = 0;
		itemsWithCategory.forEach(item => {
			if(item.category.type === TYPE_INCOME){
				TotalIncome += item.price;
			}else{
				TotalOutcome += item.price;
			}
		});
		return (
			<React.Fragment>
				<header className="App-header">
					<div className="row mb-1 mt-2">
						<div className="col">
							<MonthPicker year={currentDate.year} month={currentDate.month}
				         		onChange={(year, month) => this.changeDate(year, month)} />
				        </div>
						<div className="col">
						 	<TotalPrice income={TotalIncome} outcome={TotalOutcome} />
						</div>
					</div>
				</header>
				{
					isLoading && 
					<Loader />
				}
				{
					!isLoading &&
					<React.Fragment>
						<div className="content-area py-3 px-3">
							<Tabs activeIndex={0} onTabChange={(index) => this.changeView(index)}>
								<Tab>
									<Ionicon className="rounded-circle mr-2"
										font-size="25px" 
										color={'#007bff'}
										icon={'ios-paper'}
									/>
									列表模式
								</Tab>
								<Tab>
									<Ionicon className="rounded-circle mr-2"
										font-size="25px" 
										color={'#007bff'}
										icon={'ios-pie'}
									/>
									图表模式
								</Tab>
							</Tabs>

							<CreateBtn onClick={() => this.createItem()} />
							{
								tabView === LIST_VIEW &&
								<PriceList 
									items={itemsWithCategory} 
									onModifyItem={(item) => this.modifyItem(item)}
									onDeleteItem={(item) => {this.deleteItem(item)}} />
							}
							{
								tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
								<div className="alert alert-light text-center">
									当前月份您还没有任何记账记录
								</div>
							}
							{
								tabView === CHART_VIEW &&
								<div style={{display: 'flex'}}>
									<div style={{flex:'1'}}>
										<CustomPieChart title={'本月支出'} categoryData={chartOutcomeDataByCategory} />
									</div>
									<div style={{flex:'1'}}>
										<CustomPieChart title={'本月收入'} categoryData={chartIncomeDataByCategory} />
									</div>
								</div>
							}
						</div>
					</React.Fragment>
				}
			</React.Fragment>
		);
	}
}

export default withRouter(withContext(Home));