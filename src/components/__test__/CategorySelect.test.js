/*
* @Author: purain
* @Date:   2019-06-21 20:33:10
* @Last Modified by:   purain
* @Last Modified time: 2019-06-21 20:46:16
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import { mount } from 'enzyme';
import CategorySelect from '../CategorySelect';
import Ionicon from 'react-ionicons';

export const categories = {
	"1" : {
		"id": "1",
		"name": "旅行",
		"type": "outcome",
		"iconName": "ios-plane"
	},
	"2" : {
		"id": "1",
		"name": "旅行",
		"type": "income",
		"iconName": "ios-plane"
	}
};
let props = {
	categories,
	onSelectCategory: jest.fn()
}

describe('test CategorySelect component', () => {
	it('render with categories should render the correct items', () => {
		const wrapper = mount(<CategorySelect {...props} />);
		expect(wrapper.find('.category-item').length).toEqual(categories.length);
		expect(wrapper.find('.category-item.active').length).toEqual(0);
		const firstIcon = wrapper.find('.category-item').first().find(Ionicon);
		expect(firstIcon.length).toEqual(1);
		expect(firstIcon.props().icon).toEqual(categories[0]);
	})
})