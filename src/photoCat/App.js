import Main from "./Main/index.js";
class App {
  constructor(root) {
    this.root = root;
    this.router = [{ path: "/web/", isMathch: false, view: Main }];

    this.routing();
  }

  async routing() {
    this.router.map((element) =>
      element.path === location.pathname
        ? (element.isMathch = true)
        : (element.isMathch = false)
    );

    const currentRouter = this.router.find(
      (element) => (element.isMathch = true)
    );
    console.log("current router is ", currentRouter, this.root);

    const target = new currentRouter.view(this.root);
    this.root.innerHTML = await target.render();
  }
}

export default App;
