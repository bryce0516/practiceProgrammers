import Home from "./component/home.js";
export default class App {
  constructor($app) {
    this.app = $app;
    this.router = [
      { path: "", view: () => new Home.render(), isMatched: true },
    ];
    this.init();
  }

  init() {
    const currentRouter = this.router.find((element) => element.isMatched);
    if (currentRouter) {
      const html = currentRouter.view();
      console.log(html);
    }
    console.log(currentRouter);
  }
}
