export default class ClassApp {
  state = {
    dom: null,
    store: null,
    route: ``,
  };

  constructor($root) {
    this.state.dom = $root;

    console.log("this is props", props);
  }
}
