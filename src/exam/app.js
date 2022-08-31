import Home from "./component/home.js";
export default class App {
  constructor($app) {
    this.app = $app;
    this.router = [{ path: "", view: Home, isMatched: true }];
    this.init();
  }

  init() {
    this.getHeader();
    this.setCurrentRouter();
  }

  getHeader() {
    let container = document.createElement("div");
    container.className = "HeaderContainer";
    let nav = document.createElement("nav");
    container.appendChild(nav);
    const headerList = [
      { name: "Home", url: "" },
      { name: "Detail", url: "Detail" },
      { name: "Post", url: "Post" },
    ];
    headerList.map((element) => {
      const link = document.createElement("a");
      link.setAttribute("class", "navItem");
      link.setAttribute("href", `${element.url}`);
      link.textContent = `${element.name}`;
      nav.appendChild(link);
    });
    this.app.appendChild(container);
  }

  setCurrentRouter() {
    const currentRouter = this.router.find((element) => element.isMatched);
    if (currentRouter) {
      const childrenHtml = new currentRouter.view().render();
      this.app.innerHTML += childrenHtml;
    }
  }

  render() {}
}
