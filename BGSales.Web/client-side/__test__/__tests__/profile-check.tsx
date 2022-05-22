import { Provider } from "react-redux";
import renderer from 'react-test-renderer';
import AdvertiserPersonProfile from "../../src/components/advertiser-person-profile";
import AdvertiserPersonProfileEdit from "../../src/components/advertiser-person-profile-edit";
import AppFooter from "../../src/components/app-footer";
import store from "../../src/store"
import React from 'react';
import HistoryPropsInterface from "../../src/interfaces/HistoryPropsInterface";

jest.mock("history");
jest.useFakeTimers()
describe("BGSales Profile module", () => {
  const history:any = 0;
 
  it("check be truth Advertiser person profile edit", () => {
    
    const wrapper = renderer.create(<Provider store={store}><AdvertiserPersonProfileEdit history={history}  /> </Provider>);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it("check be truth Advertiser person profile", () => {
    const wrapper = renderer.create(<Provider store={store}><AdvertiserPersonProfile id={""} /> </Provider>);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
