/*
* @Author: purain
* @Date:   2019-06-21 18:22:51
* @Last Modified by:   purain
* @Last Modified time: 2019-06-24 15:07:32
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import {Tabs, Tab} from '../components/Tabs';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import withContext from '../withContext';
import { TYPE_OUTCOME, TYPE_INCOME } from '../utility';

const tabsText = [TYPE_OUTCOME, TYPE_INCOME];
class Create extends React.Component{
	constructor(props){
		super(props);
		const { id } = props.match.params;
		const { categories, items } = props.data;
		this.state = {
			selectedTab: (id && items[id]) ? categories[items[id].cid].type : TYPE_OUTCOME,
			selectedCategoryId: (id && items[id]) ? categories[items[id].cid].id : '1',
			isCreate: (id && items[id]) ? false: true,
		}
	}
	componentDidMount(){
		const id = this.props.match.params.id;
		this.props.actions.getEditData(id).then(data => {
			const { categories, editItem } = data;
			this.setState({
				selectedTab: (id && editItem) ? categories[editItem.cid].type : TYPE_OUTCOME,
				selectedCategoryId: (id && editItem) ? categories[editItem.cid].id : '1',
			})
		})
	}
	ontabChange(index){
		this.setState({
			selectedTab: tabsText[index]
		})
	}
	onSelectCategoryId(categoryId){
		this.setState({
			selectedCategoryId: categoryId
		})
	}
	onFormSubmit(data){
		if(this.state.isCreate){
			this.props.actions.createItem(data, this.state.selectedCategoryId).then(() => {
				this.props.history.push('/');
			});
		}else{
			this.props.actions.updateItem(data, this.state.selectedCategoryId).then(() => {
				this.props.history.push('/');
			});
		}
		
	}
	onCancelSubmit(){
		this.props.history.push('/');
	}
	render(){
		const { data } = this.props;
		const { items, categories } = data;
		const { id } = this.props.match.params;
		const editItem = (id && items[id]) ? items[id] : {};
		const filterCategories = Reflect.ownKeys(categories)
			.filter(id => categories[id].type === this.state.selectedTab)
			.map(id => categories[id])
		const tabIndex = tabsText.indexOf(this.state.selectedTab);
		return (
			<div className="create-page py-3 px-3 rounded mt-3"
				style={{background: '#fff'}} >
				<Tabs activeIndex={tabIndex} onTabChange={(index) => this.ontabChange(index)}>
					<Tab>支出</Tab>
					<Tab>收入</Tab>
				</Tabs>
				<CategorySelect 
					categories={filterCategories}
					selectedCategoryId={this.state.selectedCategoryId}
					onSelectCategoryId={(categoryId) => this.onSelectCategoryId(categoryId)} />
				<PriceForm onFormSubmit={(data) => this.onFormSubmit(data)}
					onCancelSubmit={() => this.onCancelSubmit()} 
					defaultItem={ editItem }/>
			</div>
		);
	}
}


export default withRouter(withContext(Create));