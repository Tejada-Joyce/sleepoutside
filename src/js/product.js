import ExternalServices from "./externalServices.js";
import ProductDetails from "./productDetails.js";
import { getParams, loadHeaderFooter } from "./utils.js";

const productId = getParams("product");
// console.log(productId);
const dataSource = new ExternalServices();

const product = new ProductDetails(productId, dataSource);
product.init();
loadHeaderFooter();
