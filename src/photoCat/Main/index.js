import Wrapper from "../Common/Wrapper.js";
import instance from "../Common/api.js";
export default class Main extends Wrapper {
  response;
  constructor(props) {
    console.log("this is props", props);
    super();
    this.root = props;
  }

  async getHtml() {
    let html = `<nav class="Breadcrumb">
        <div>root</div>
    </nav>`;
    let underHtml = ``;
    this.response = await instance({
      url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com",
      addurl: "/dev",
      method: "GET",
      data: {},
    });
    if (this.response) {
      this.response.map((element) => {
        underHtml += `<div class="Node">
                    <img src="./assets/directory.png">
                    <div>${element.name}</div>
                </div>`;
      });
      return `
                <div class="Nodes">
                ${underHtml}
                </div>
            `;
    }
    return html + underHtml;
  }

  async render() {
    const dom = await this.getHtml();
    return `
        ${dom}
        `;
  }
}
