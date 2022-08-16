import Wrapper from "./Component/Wrapper";
import Main from "./Main/index.js";
import Post from "./Post/index.js";
import Other from "./Other/index.js";
export default class App extends Wrapper {
  state = {
    root: null,
    router: [
      { path: "/myclass", isMathch: false, view: Main },
      { path: "/myclass/post", isMathch: false, view: Post },
      { path: "/myclass", isMathch: false, view: Other },
    ],
  };
  constructor($root) {
    super();
    this.state.root = $root;

    // this.dom = $root;
    console.log("this ", this.root);
    // this.root.innerHtml = "<div><p>helloworld</p></div>";
    this.init();
  }

  async init() {
    const { root, router } = this.state;
    let getHtml = super.render();
    // console.log("get ", getHtml, this.dom, typeof this.dom);

    root.innerHTML += getHtml;

    router.map((element) =>
      element.path === location.pathname
        ? (element.isMathch = true)
        : (element.isMathch = false)
    );

    const currentRouter = router.find((element) => element.isMathch === true);

    console.log("currentRouter", currentRouter);
    console.log("location", location.pathname);
    // console.log(this.dom);

    // return;
  }
}
