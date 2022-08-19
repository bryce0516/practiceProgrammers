import instance from "./api/index.js";
export default class Api {
  static rootFetch = async () => {
    const result = await instance({
      url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev",
      addurl: "",
      method: "GET",
      data: {},
    });
    return result;
  };

  static onClick = async (id, data, targetDom) => {
    if (targetDom) {
      for (const chlid of targetDom.children) {
        targetDom.removeChild(chlid);
      }
    }

    let result = [];
    const target = data.filter((element, index) => element.id === id);
    if (target && target[0].type === "DIRECTORY") {
      result = await instance({
        url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev",
        addurl: `/${id}`,
        method: "GET",
        data: {},
      });
    }
    return result;
    // console.log('onClick',super().state)
  };

  static makeNode(arr) {
    let html = "";
    if (arr && arr.length !== 0) {
      arr.map((element) => {
        if (element.type === "DIRECTORY") {
          html += `<div class="Node" data-node-id="${element.id}">
                    <img src="./assets/directory.png">
                    <div>${element.name}</div>
                    </div>`;
        }
      });
    }
    return html;
  }
}
