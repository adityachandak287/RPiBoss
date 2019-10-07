import React from "react";
import { mockStore } from "../../src/utils";
import Devices from "../Devices";
import { createShallow } from "@material-ui/core/test-utils";

describe("Devices Component", () => {
  describe("Renders without errors", () => {
    let shallow;
    beforeEach(() => {
      shallow = createShallow();
    });
    it("Should render the component", () => {
      const store = mockStore({ devices: ["test-device"] });
      const component = shallow(<Devices store={store} />);
      expect(component.length).toBe(1);
    });
  });
});
