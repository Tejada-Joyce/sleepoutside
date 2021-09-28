function convertToJson(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  getProductsData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(productId) {
    const products = await this.getProductsData();
    // Return product with that Id
    const product = products.find((item) => item.Id === productId);
    return product;
  }
}
