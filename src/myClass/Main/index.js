import mainApi from "./MainApi";

export default class Main {
  state = {
    data: [],
  };
  constructor(props) {
    console.log("this is main props", props);
    this.init();
    console.log("data", this.state.data);
  }

  async init() {
    const initialFetching = await mainApi.instance("/dev", {}, "GET");
    console.log(initialFetching);
    this.state.data = initialFetching;
  }

  render() {
    return `<div><p>this is main</p></div>`;
  }
}
