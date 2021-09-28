import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParams } from "./utils.js";

const productId = getParams("product");
console.log(productId);
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
