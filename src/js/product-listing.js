import ExternalServices from "./externalServices.js";
import ProductList from "./productList.js";
import { loadHeaderFooter, getParams } from "./utils.js";

const productData = new ExternalServices();

const category = getParams("category");

const productList = new ProductList(
  category,
  "ul.product-list",
  productData,
  "#product-card-template"
);

loadHeaderFooter();

productList.init();
