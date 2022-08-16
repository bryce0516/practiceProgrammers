import Nodes from "./Component/Nodes";
import Breadcrumb from "./Component/Breadcrumb.js";

const $app = document.querySelector(".app");

const initialState = {
  nodes: [],
};

const nodes = new Nodes({
  $app,
  initialState,
});
const breadcrumb = new Breadcrumb({ $app, initialState });
const nextState = {
  nodes: [],
};

nodes.setState(nextState);
breadcrumb.setState(nextState);
