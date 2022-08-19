import Api from "./app.api.js";
export default class App {
  state = {
    data: [],
    stack: [],
    html: "",
  };
  constructor(props) {
    this.root = props.root;
    this.Nodes = props.Nodes;
    this.Breadcrumb = props.Breadcrumb;
    this.init();
  }

  setState({ key, value }, { key2, html }) {
    console.log("setState", { key, value }, { key2, html });
    this.state[key] = value;
    this.render(key2, html);
  }

  async init() {
    const result = await Api.rootFetch();
    this.state.data = result;
    if (result) {
      this.setState(
        { key: "data", value: result },
        { key2: "Nodes", html: Api.makeNode(result) }
      );
    }
  }

  render(key, value) {
    let dom = null;
    console.log(typeof value);
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
          const result = await Api.onClick(nodeId, this.state.data, this.Nodes);
          if (result) {
            this.setState(
              { key: "data", value: result },
              { key2: "Nodes", html: Api.makeNode(result) }
            );
          }
        }
      });
    }
  }
}
