import { alertMessage, qs } from "./utils.js";

const baseURL = "http://157.201.228.93:2992/";

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: "servicesError", message: res.json() };
  }
}

export default class ExternalServices {
  constructor() {}

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      };
      console.log(order);
      const results = await fetch(baseURL + "checkout/", options).then(
        convertToJson
      );
      console.log(results);
      location.href = "../checkout/checkedout.html";
      localStorage.clear();
      qs("#checkout-form form").reset();
      return results;
    } catch (err) {
      console.log(err);
      for (let message in err.message) {
        console.log("hi");
        alertMessage(err.message[message]);
      }
    }
  }
}
