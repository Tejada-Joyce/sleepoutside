const baseURL = "http://157.201.228.93:2992/";

function convertToJson(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}

export default class ExternalServices {
  constructor() { }

  getProductsData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async findProductById(productId) {
    const product = await fetch(baseURL + `product/${productId}`)
      .then(convertToJson)
      .then((data) => data.Result);
    return product;
  }

  async checkout(order) {
    try {
      const options = {
        method: "POST",
        header: {
          "Content-Type": "applications/json",
        },
        body: JSON.stringify(order),
      };
      console.log(order);
      const results = await fetch(baseURL + "checkout/", options).then(
        convertToJson
      );
      console.log(results);
      return results;
    } catch (err) {
      console.log(err);
    }
  }
}
