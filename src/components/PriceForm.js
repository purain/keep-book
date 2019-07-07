/*
* @Author: purain
* @Date:   2019-06-21 21:06:12
* @Last Modified by:   purain
* @Last Modified time: 2019-06-24 14:54:12
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import PropTypes from 'prop-types';

class PriceForm extends React.Component{
	constructor(props){
		super(props);
	}
	checkSubmit(){
		const title = this.titleInput.value.trim(),
			  price = this.priceInput.value.trim() * 1,
			  date = this.dateInput.value.trim();
		if(title && price && date){
			if(parseFloat(price) >= 0){
				return true;
			}else{
				alert('金额必须大于等于 0');
			}
		}else{
			alert('请输入所有必选项');
			return false;
		}
	}
	onSubmit(){
		let checkInput = this.checkSubmit();
		if(checkInput){
			let defaultItem = this.props.defaultItem || {};
			let data = {
				...defaultItem,
				title: this.titleInput.value.trim(),
			  	price: this.priceInput.value.trim() * 1,
			  	date: this.dateInput.value.trim() 
			};
			this.props.onFormSubmit(data);
		}
	}
	onCancelSubmit(){
		this.props.onCancelSubmit();
	}
	render(){
		const { title, price, date } = this.props.defaultItem;
		return (
			<div className="container">
				<div className="form-group row">
					<label htmlFor="title" className="col-md-offset-1 col-md-1 col-form-label">标题 *</label>
					<div className="col-md-11">
						<input type="text" 
							className="form-control" 
							id="title"
							name="title" 
							defaultValue={title}
							ref={(input) => {this.titleInput = input}}
							// onChange={(e)=>this.onValueChange(e)}
							placeholder="请输入标题" 
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="price" className="col-md-1 col-form-label">金额 *</label>
					<div className="input-group col-md-11">
						<div className="input-group-prepend">
							<span className="input-group-text">￥</span>
						</div>
						<input type="number" 
							className="form-control" 
							id="price"
							name="price" 
							defaultValue={price}
							ref={(input) => {this.priceInput = input}}
							// onChange={(e)=>this.onValueChange(e)}
							placeholder="请输入金额" 
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="date" className="col-md-1 col-form-label">日期 *</label>
					<div className="col-md-11">
						<input type="date" 
							className="form-control" 
							id="date"
							name="date" 
							defaultValue={date}
							ref={(input) => {this.dateInput = input}}
							// onChange={(e)=>this.onValueChange(e)}
							placeholder="请输入日期" 
						/>
					</div>
				</div>
				<button className="btn btn-primary col-md-1 mr-3" onClick={() => this.onSubmit()}>
					提交
				</button>
				<button className="btn btn-default col-md-1" onClick={() => this.onCancelSubmit()}>
					取消
				</button>
			</div>
		);
	}
}
PriceForm.propTypes = {
	onFormSubmit: PropTypes.func.isRequired,
	onCancelSubmit: PropTypes.func.isRequired
}

export default PriceForm;