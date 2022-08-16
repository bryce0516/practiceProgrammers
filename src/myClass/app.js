import Wrapper from "./Component/Wrapper";
import Main from "./Main/index.js";
import Post from "./Post/index.js";
import Other from "./Other/index.js";
export default class App extends Wrapper {
  state = {
    root: null,
    router: [
      { path: "/", isMathch: false, view: Main },
      { path: "/post", isMathch: false, view: Post },
      { path: "/other", isMathch: false, view: Other },
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

    // console.log("get ", getHtml, this.dom, typeof this.dom);

    router.map((element) =>
      element.path === location.pathname
        ? (element.isMathch = true)
        : (element.isMathch = false)
    );

    const currentRouter = router.find((element) => element.isMathch === true);
    let getHtml = super.render() + new currentRouter.view(root).render();
    root.innerHTML += getHtml;
    // console.log(this.dom);

    // return;
  }
}
