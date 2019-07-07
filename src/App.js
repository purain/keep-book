import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

import Home from './containers/Home';
import Create from './containers/Create';
import { flatternArrToObj, ID, parseToYearAndMonth } from './utility';

export const AppContext = React.createContext();
class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: {},
			categories: {},
			currentDate: parseToYearAndMonth(),
			isLoading: false,
		}
		const withLoading = () => {
			this.setState({
				isLoading: true
			})
		}
		this.actions = {
			getInitialData: async () => {
				withLoading();
				const {currentDate} = this.state;
				const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
				const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)]);
				const [ categories, items] = results;
				this.setState({
					items: flatternArrToObj(items.data),
					categories: flatternArrToObj(categories.data),
					isLoading: false,
				})
				return results;
			},
			getEditData: async (id) => {
				withLoading();
				let { items, categories } = this.state;
				let promiseArr = [];
				if(Reflect.ownKeys(categories).length === 0){
					promiseArr.push(axios.get('/categories'));
				}
				let itemAlreadyFetched = (Reflect.ownKeys(items).indexOf(id) > -1);
				if(id && !itemAlreadyFetched){
					promiseArr.push(axios.get(`/items/${id}`));
				}
				const [ fetchCategories, editItem ] = await Promise.all(promiseArr);
				const finalCategories = fetchCategories ? flatternArrToObj(fetchCategories.data) : categories;
				const finalItems = editItem ? editItem.data : items[id];
				if(id){
					this.setState({
						categories: finalCategories,
						items: { ...this.state.items, [id]: finalItems },
						isLoading: false
					})
				}else{
					this.setState({
						categories: finalCategories,
						isLoading: false
					})
				}
				return {
					categories: finalCategories,
					editItem: finalItems
				}
			},
			changeDate: async (year, month) => {
				withLoading();
				const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
				const items = await axios.get(getURLWithData)
				this.setState({
					items: flatternArrToObj(items.data),
					currentDate: {year, month},
					isLoading: false,
				})
				return items;
			},
			deleteItem: async (item) => {
				withLoading();
				const deleteItem = await axios.delete(`/items/${item.id}`)
				delete this.state.items[item.id];
				this.setState({
					items: this.state.items,
					isLoading: false,
				})
				return deleteItem;
			},
			createItem: async (data, categoryId) => {
				withLoading();
				const newId = ID();
				const parseDate = parseToYearAndMonth(data.date);
				data.timestamp = new Date(data.date).getTime();
				data.monthCategory = `${parseDate.year}-${parseDate.month}`;
				const newItem = await axios.post('/items', { ...data, 'cid': categoryId, 'id': newId});
				this.setState({
					items: { ...this.state.items, [newId]: newItem.data },
					isLoading: false
				})
				return newItem;
			},
			updateItem: async (data, categoryId) => {
				// console.log(data,categoryId)
				withLoading();
				const modifiedItem = { 
					...data, 
					cid: categoryId,
					timestamp: new Date(data.date).getTime(),
				};
				const updataData = await axios.put(`/items/${data.id}`, modifiedItem);
				this.setState({
					items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
					isLoading: false
				})
				return updataData;
			}
		}
	}
	render(){
		return (
			<AppContext.Provider value={{
				state: this.state,
				actions: this.actions
			}}>
				<Router>
				    <div className="App">
				    	<div className="container pb-5">
			    			<Route exact path="/" component={Home} />
							<Route exact path="/create" component={Create} />
							<Route path="/edit/:id" component={Create} />							
				    	</div>
				    </div>
			    </Router>
			</AppContext.Provider>
		);		
	}
}

export default App;
