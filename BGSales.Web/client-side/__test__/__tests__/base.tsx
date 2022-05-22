import { Provider } from "react-redux";
import renderer from 'react-test-renderer';
import AdvertiserPersonProfile from "../../src/components/advertiser-person-profile";
import AppHeader from "../../src/components/app-header";
import UserMenu from "../../src/components/user-menu";
import AppFooter from "../../src/components/app-footer";
import store from "../../src/store"
import React from 'react';
import HistoryPropsInterface from "../../src/interfaces/HistoryPropsInterface";

jest.mock("history");
jest.useFakeTimers()
describe("BGSales Base module", () => {
	const history: any = 0;

	it("check be truth base element footer ", () => {

		const wrapper = renderer.create(<Provider store={store}><AppFooter /> </Provider>);
		expect(wrapper.toJSON()).toMatchSnapshot();
	});


	it("check be truth base element user menu ", () => {

		const wrapper = renderer.create(<Provider store={store}><UserMenu onClick={()=>{}} /> </Provider>);
		expect(wrapper.toJSON()).toMatchSnapshot();
	});
});
