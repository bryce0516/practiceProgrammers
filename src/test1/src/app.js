import Api from "./app.api.js";
export default class App {
  state = {
    data: [],
    stack: { root: [] },
    isRoot: [],
    fileSelected: "",
    html: "",
  };
  constructor(props) {
    this.root = props.root;
    this.Nodes = props.Nodes;
    this.Breadcrumb = props.Breadcrumb;
    this.Modal = props.Modal;
    this.init();
  }

  setState({ key, value }, { key2, html }, clickedName) {
    console.log("setState", { key, value }, { key2, html });
    console.log("currentState", this.state, clickedName);

    for (const chlid of document.querySelectorAll(".Node")) {
      this.Nodes.removeChild(chlid);
    }

    const hasName = this.state.isRoot.find(
      (element) => element === clickedName
    );
    if (!hasName) {
      this.state.isRoot.push(clickedName);
    }
    if (this.state.stack[clickedName]) {
      this.state.stack[clickedName] = value;
    }
    this.state[key] = value;
    this.render(key2, html);
  }

  async init() {
    const result = await Api.rootFetch();
    if (result) {
      this.setState(
        { key: "data", value: result },
        { key2: "Nodes", html: Api.makeNode(result, this.state.stack, "root") },
        "root"
      );
    }
  }

  render(key, value) {
    console.log("render>>>>>>>>", key, value);
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
          const target = this.state.data.filter(
            (element, index) => element.id === nodeId
          )[0];
          let props = {
            data: [],
            name: "",
          };
          if (target.type === "DIRECTORY") {
            if (nodeId === "-999") {
              const { data, clickedName } = Api.backClick(
                this.state.isRoot,
                this.state.stack
              );
              props = {
                ...props,
                data,
                name: clickedName,
              };
            } else {
              const { data, clickedName } = await Api.onClick(
                event.target.closest(".Node"),
                target,
                this.state.stack
              );
              props = {
                ...props,
                data,
                name: clickedName,
              };
            }
            if (props.data) {
              this.setState(
                { key: "data", value: props.data },
                {
                  key2: "Nodes",
                  html: Api.makeNode(props.data, this.state.stack, props.name),
                },
                props.clickedName
              );
            }
          } else if (target.type === "FILE") {
            Api.fileClick(this.Modal, target);
          }
        } else if (event.target.closest(".Modal")) {
        }
      });
    } else if (key === "Modal") {
      console.log("else if ", dom, key);
    }
  }
}
