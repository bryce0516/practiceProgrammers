import Nodes from "./Component/Nodes";
import Breadcrumb from "./Component/Breadcrumb.js";
import instance from "./Common/api";
import ImageView from "./Component/ImageView";

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    console.log("setState root", this.state);
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
  };

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
        this.setState({
          ...this.state,
          selectedFilePath: node.filePath,
        });
      }
    },
    onBackClick: async () => {
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();
        const prevNodeId =
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;
        if (prevNodeId === null) {
          const rootNodes = await instance({
            url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com",
            addurl: `/dev`,
            method: "GET",
            data: {},
          });

          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
          });
        } else {
          const prevNodes = await instance({
            url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com",
            addurl: `/dev/${prevNodeId}`,
            method: "GET",
            data: {},
          });

          this.setState({
            ...nextState,
            isRoot: false,
            nodes: prevNodes,
          });
        }
      } catch (error) {
        console.log("onBackClick has error", error);
      }
    },
  });

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
