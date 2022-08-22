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

  static onClick = async (dom, target, stack) => {
    let result = [];
    if (target.length !== 0) {
      result = {
        data: await instance({
          url: "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev",
          addurl: `/${dom.dataset.nodeId}`,
          method: "GET",
          data: {},
        }),
        clickedName: target.name,
      };

      if (Object.keys(stack).length === 1) {
        stack[target.name] = result.data;
      }
    }
    return result;
  };

  static backClick(stackName, currentStack) {
    const targetName = stackName[stackName.length - 2];
    stackName.pop();
    const data = currentStack[targetName];
    return {
      data,
      clickedName: targetName,
    };
  }

  static fileClick(dom, target) {
    let hasChild = typeof dom.children === "object" ? dom.children : null;
    console.log("fileClick", dom, dom.children, hasChild);
    dom.style.display = "flex";
    dom.innerHTML += `
		<div class="ImageViewer">
		<div class="content">
			<img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${target.filePath}">
		</div>
	</div>`;
    dom.addEventListener("click", (event) => {
      console.log("event target modals", event.target);
      dom.style.display = "none";
    });
  }

  static makeNode(arr, stack, screenName) {
    console.log("makeNode, stack", stack, screenName);
    let html = "";
    if (screenName !== "root") {
      html += `<div class="Node" data-node-id="-999">
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
