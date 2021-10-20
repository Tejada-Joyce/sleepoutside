const baseURL = "http://157.201.228.93:2992/";

function convertToJson(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}

export default class ProductData {
  constructor() {}

  getProductsData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async findProductById(productId) {
    const product = fetch(baseURL + `product/${productId}`)
      .then(convertToJson)
      .then((data) => data.Result);
    return product;
  }
}
