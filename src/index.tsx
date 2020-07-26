import * as React from "react";
import * as ReactDOM from "react-dom";
import { RosterList } from "./components/RosterList";
// https://babeljs.io/docs/en/babel-polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";
ReactDOM.render(<RosterList />, document.getElementById("root"));
