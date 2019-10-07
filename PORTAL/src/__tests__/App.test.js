import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, mockStore } from "../utils/index";
import App from "../App";

const setUp = () => {
  const initialState = {};
  const testStore = mockStore(initialState);
  const wrapper = shallow(<App store={testStore} />);
  return wrapper;
};

describe("App Component", () => {
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = setUp();
  });
  it("Should render without errors", () => {
    const component = findByTestAttr(shallowComponent.dive(), "AppComponent");
    expect(component.length).toBe(1);
  });
});
