import React from "react";
import ReactDom from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../../../qds/src/App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  act(() => {
    ReactDom.render(<App />, div);
  });
  ReactDom.unmountComponentAtNode(div);
});
