/*
* @Author: purain
* @Date:   2019-06-21 16:02:03
* @Last Modified by:   purain
* @Last Modified time: 2019-06-21 16:13:18
* @E-mail: 1073357107@qq.com
*/
import React from 'react';
import { shallow } from 'enzyme';
import TotalPrice from '../TotalPrice';

const props = {
	income: 1000,
	outcome: 2000
}
describe('test Total component', () => {
	it('component should render correct income&&outcome', () => {
		const wrapper = shallow(<TotalPrice {...props} />);
		expect(wrapper.find('.income span').text()*1).toEqual(1000);
		expect(wrapper.find('.outcome span').text()*1).toEqual(2000);
	})
})