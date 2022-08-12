export default class {
  constructor(props) {
    console.log("abstact", props);
  }
  render(dom) {
    const element = dom ? `<div>root</div>` + dom : `<div>root</div>`;
    return `<nav class="Breadcrumb">
   ${element}
</nav>`;
  }
}
