function Nodes({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.$target = document.createElement("ul");
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
        ? `<div class="Node"><img src="./static/photoCat/assets/prev.png"/>${nodesTemplate}</div>`
        : nodesTemplate;
    }
    console.log("inner Nodes", this.state);
    if (this.state.nodes.length !== 0) {
      this.$target.innerHTML = this.state.nodes.map(
        (node) => `<li>${node.name}</li>`
      );
    }

    this.$target.querySelectorAll(".Node").forEach(($node) => {
      $node.addEventListener("click", (e) => {
        const { nodeId } = e.target.dataset;
        const selectedNode = this.state.nodes.find(
          (node) => node.id === nodeId
        );

        if (selectedNode) {
          this.onClick(selectedNode);
        }
      });
    });
  };

  this.render();
}

export default Nodes;
