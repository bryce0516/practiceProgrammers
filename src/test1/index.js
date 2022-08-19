import App from "./src/app.js";
console.log("working");
const root = document.querySelector(".App");
const Nodes = document.querySelector(".Nodes");
const Breadcrumb = document.querySelector(".Breadcrumb");
new App({ root, Nodes, Breadcrumb });
