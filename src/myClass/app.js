import Wrapper from "./Component/Wrapper";

export default class App extends Wrapper {
  constructor($root) {
    super();

    this.dom = $root;
    console.log("this isroot", $root);

    this.render();
  }

  render() {
    let getHtml = super.render();
    console.log("get ", getHtml, this.dom);
    return this.dom.appendChild(getHtml);
  }
}
