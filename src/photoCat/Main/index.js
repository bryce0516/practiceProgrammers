import Wrapper from "../Common/Wrapper.js";
import instance from "../Common/api.js";
export default class Main extends Wrapper {
  response;
  constructor(props) {
    super(props);
    this.root = props;
  }
  moveToPage(number) {
    let num = 0;
    console.log("working", num + number, window.location);
  }
  async getHtml() {
    let underHtml = ``;
    this.response = await instance({
      url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com",
      addurl: "/dev",
      method: "GET",
      data: {},
    });
    if (this.response) {
      this.response.map((element) => {
        if (element.type === "DIRECTORY") {
          if (element.filePath) {
            underHtml += `<div class="Node">
            <img src="./static/photoCat/assets/directory.png">
            <div type="button" onclick={'${this.moveToPage()}'}>${
              element.name
            }</div>
        </div>`;
          } else {
            underHtml += `<div class="Node">
            <img src="./static/photoCat/assets/directory.png">
            <div>${element.name}</div>
        </div>`;
          }
        } else if (element.type === "FILE") {
          underHtml += `<div class="Node">
          <img src="./static/photoCat/assets/showBigBtn.png">
          <div>${element.name}</div>
      </div>`;
        }
      });
    }
    let html = `<div class="Nodes">
      ${underHtml}
    </div>`;
    return html;
  }

  async render() {
    const dom = await this.getHtml();
    return super.render() + `${dom}`;
  }
}
