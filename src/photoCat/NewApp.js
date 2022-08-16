import Nodes from "./Component/Nodes";
import Breadcrumb from "./Component/Breadcrumb.js";
import instance from "./Common/api";
import ImageView from "./Component/ImageView";

function App($app) {
  this.state = {
    isRoot: true,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };
  const nextState = [];
  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath,
  });
  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });
  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      console.log("onClick working", node);
      if (node.type === "DIRECTORY") {
        const nextNodes = await instance({
          url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com",
          addurl: `/dev/${node.id}`,
          method: "GET",
          data: {},
        });
        this.setState({
          ...this.state,
          depth: [...this.state.depth, node],
          nodes: nextNodes,
        });
        // const nextNodes = await;
      } else if (node.type === "FILE") {
      }
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    console.log("setState root", this.state);
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  const init = async () => {
    try {
      const rootNodes = await instance({
        url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com",
        addurl: "/dev",
        method: "GET",
        data: {},
      });
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (error) {
      alert(error);
    }
  };

  init();
  // nodes.setState(nextState);
  // breadcrumb.setState(nextState);
}

export default App;
