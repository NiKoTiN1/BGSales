import { Provider } from "react-redux";
import renderer from 'react-test-renderer';
import Order from "../../src/components/order";
import CreateOrder from "../../src/components/create-order";
import OrderEdit from "../../src/components/order-edit";
import Orders from "../../src/components/orders";
import store from "../../src/store"
import React from 'react';

jest.mock("history");
jest.useFakeTimers()
describe("BGSales Order module", () => {
	const history: any = 0;
	it("check be truth base element footer ", () => {

		const wrapper = renderer.create(<Provider store={store}><Order id={""} /> </Provider>);
		expect(wrapper.toJSON()).toMatchSnapshot();
	});


	it("check be truth create order ", () => {

		const wrapper = renderer.create(<Provider store={store}><CreateOrder history={history}  /> </Provider>);
		expect(wrapper.toJSON()).toMatchSnapshot();
	});

	it("check be truth order edit ", () => {

		const wrapper = renderer.create(<Provider store={store}><OrderEdit history={history} /> </Provider>);
		expect(wrapper.toJSON()).toMatchSnapshot();
	});


	it("check be truth orders", () => {

		const wrapper = renderer.create(<Provider store={store}><Orders history={history} /> </Provider>);
		expect(wrapper.toJSON()).toMatchSnapshot();
	});
});