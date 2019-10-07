import checkPropTypes from "check-prop-types";
import configureStore from "redux-mock-store";
export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};
const middlewares = [];
export const mockStore = configureStore(middlewares);
