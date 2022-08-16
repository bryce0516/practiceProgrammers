function Nodes({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "./static/photoCat/assets/file.png"
              : "./static/photoCat/assets/directory.png";

          return `<div class="Node" data-node-id="${node.id}">
          <img src="${iconPath}"/>
          <div>${node.name}</div>
        </div>`;
        })
        .join("");

      this.$target.innerHTML = !this.state.isRoot
        ? `<img src="./static/photoCat/assets/prev.png"/>${nodesTemplate}`
        : `${nodesTemplate}`;
    }
    // if (this.state.nodes.length !== 0) {
    //   this.$target.innerHTML = this.state.nodes.map(
    //     (node) => `<li>${node.name}</li>`
    //   );
    // }
    console.log("this tar", this.$target.childNodes, this.$target.children);

    // this.$target.querySelectorAll(".Node").
    for (const $node of this.$target.children) {
      $node.addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          // if (e.target !== e.currentTarget) return;
          const { nodeId } = e.target.dataset;
          const selectedNode = this.state.nodes.find(
            (node) => node.id === nodeId
          );
          console.log("event listener", selectedNode, e.target);
          if (selectedNode) {
            this.onClick(selectedNode);
          }
        },
        false
      );
    }
    // $node.addEventListener("click", (e) => {
    //   const { nodeId } = e.target.dataset;
    //   const selectedNode = this.state.nodes.find(
    //     (node) => node.id === nodeId
    //   );
    //   console.log("event listener", selectedNode, e.target);
    //   if (selectedNode) {
    //     this.onClick(selectedNode);
    //   }
    // });
  };

  this.render();
}

export default Nodes;
