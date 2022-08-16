import Nodes from "./Component/Nodes";
import Breadcrumb from "./Component/Breadcrumb.js";

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };
  const nextState = [];
  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });
  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: (node) => {
      if (node.type === "DIRECTORY") {
      } else if (node.type === "FILE") {
      }
    },
  });

  // nodes.setState(nextState);
  // breadcrumb.setState(nextState);
}

export default App;
