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

  static onClick = async (dom, data, targetDom, stack) => {
    const { dataset } = dom;
    const { id } = dataset;
    console.log("onClick inputed", id, data, targetDom, stack);
    if (targetDom) {
      for (const chlid of document.querySelectorAll(".Node")) {
        targetDom.removeChild(chlid);
      }
    }

    let result = [];
    const target = data.filter((element, index) => element.id === id);

    console.log(target);
    if (target.length !== 0) {
      if (target[0].type === "DIRECTORY") {
        result = {
          data: await instance({
            url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev",
            addurl: `/${id}`,
            method: "GET",
            data: {},
          }),
          clickedName: target[0].name,
        };
      }
      if (Object.keys(stack).length === 1) {
        stack[target[0].name] = result.data;
      }
    }

    return result;
    // console.log('onClick',super().state)
  };

  static makeNode(arr, stack) {
    let html = "";
    if (Object.keys(stack).length > 1) {
      html += `<div class="Node">
            <img src="./assets/prev.png">
          </div>`;
    }
    if (arr && arr.length !== 0) {
      arr.map((element) => {
        if (element.type === "DIRECTORY") {
          html += `<div class="Node" data-node-id="${element.id}">
                    <img src="./assets/directory.png">
                    <div>${element.name}</div>
                    </div>`;
        } else if (element.type === "FILE") {
          html += `<div class="Node" data-node-id="${element.id}">
            <img src="./assets/file.png">
            <div>${element.name}</div>
            </div>`;
        }
      });
    }
    return html;
  }
}
