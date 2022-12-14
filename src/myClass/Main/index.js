import mainApi from "./MainApi";

export default class Main {
  state = {
    data: [],
    node: [],
    depth: [],
    filePath: "",
  };
  constructor($root) {
    console.log("this is main props", $root);
    this.init();
    console.log("data", this.state.data);
  }

  async init() {
    const initialFetching = await mainApi.instance("/dev", {}, "GET");
    console.log(initialFetching);
    this.state.data = initialFetching;

    this.render($root);
  }

  render(dom) {
    console.log("dom", dom);
    if (dom) {
      return `<div><p>this is has main</p></div>`;
    } else {
      return `<div><p>this is main</p></div>`;
    }
  }
}
