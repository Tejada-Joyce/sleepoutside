import ProductData from "./productData.js";
import ProductList from "./productList.js";

const productData = new ProductData("tents");

const productList = new ProductList("tents", "ul.product-list", productData, '#product-card-template');

productList.init();
