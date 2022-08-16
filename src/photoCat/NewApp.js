import Nodes from "./Component/Nodes";
const $app = document.querySelector(".app");

const initialState = {
  nodes: [],
};

const nodes = new Nodes({
  $app,
  initialState,
});

const nextState = {
  nodes: [],
};

nodes.setState(nextState);
