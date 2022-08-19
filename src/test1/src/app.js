import Api from "./app.api.js";
export default class App {
  state = {
    data: [],
    stack: { root: [] },
    isRoot: "root",
    html: "",
  };
  constructor(props) {
    this.root = props.root;
    this.Nodes = props.Nodes;
    this.Breadcrumb = props.Breadcrumb;
    this.init();
  }

  setState({ key, value }, { key2, html }, clickedName) {
    console.log("setState", { key, value }, { key2, html });

    if (this.state.isRoot === "root") {
      this.state.stack["root"] = value;
    }

    this.state[key] = value;
    console.log(">>>>>>>>>> state", this.state);
    this.render(key2, html);
  }

  async init() {
    const result = await Api.rootFetch();
    if (result) {
      this.setState(
        { key: "data", value: result },
        { key2: "Nodes", html: Api.makeNode(result, this.state.stack) },
        "root"
      );
    }
  }

  render(key, value) {
    let dom = null;
    if (key === "root") {
      dom = this.root;
    } else if (key === "Nodes") {
      dom = this.Nodes;
    } else if (key === "Breadcrumb") {
      dom = this.Breadcrumb;
    }
    if (typeof value === "string") {
      dom.innerHTML += value;
    } else {
      value();
    }
    let hasChild = typeof dom.children === "object" ? dom.children : null;
    let childLength =
      typeof dom.children === "object" && Object.keys(dom.children).length;

    if (hasChild && key === "Nodes" && childLength > 0) {
      dom.addEventListener("click", async (event) => {
        if (event.target.closest(".Node")) {
          const { nodeId } = event.target.closest(".Node").dataset;
          const { data, clickedName } = await Api.onClick(
            event.target.closest(".Node"),
            this.state.data,
            this.Nodes,
            this.state.stack
          );
          if (data) {
            this.setState(
              { key: "data", value: data },
              { key2: "Nodes", html: Api.makeNode(data, this.state.stack) },
              clickedName
            );
          }
        }
      });
    }
  }
}
