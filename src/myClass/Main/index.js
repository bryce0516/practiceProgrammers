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
    return `<div><p>this is main</p></div>`;
  }
}
