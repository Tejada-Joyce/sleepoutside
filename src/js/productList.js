import { qs } from "../js/utils.js";
import { renderListWithTemplate } from "../js/utils.js";

export default class ProductList {
  constructor(category, element, datasource, template) {
    this.category = category;
    this.element = element;
    this.datasource = datasource;
    this.template = template;
    this.productList = {};
  }

  async init() {
    console.log(this.datasource);
    this.productList = await this.datasource.getProductsData();
    console.log(this.productList);
    this.element = qs(this.element);
    renderListWithTemplate(this.template, this.element, this.productList, this.prepareTemplate);
  }

  prepareTemplate(clone, product) {
    const a = qs(".product-card a", clone);
    const img = qs(".product-card img", clone);
    const h3 = qs(".card__brand", clone);
    const h2 = qs(".card__name", clone);
    const p = qs(".product-card__price", clone);

    a.href += product.Id;
    img.setAttribute('src', product.Image);
    h3.innerHTML = product.Brand.Name;
    h2.innerHTML = product.NameWithoutBrand;
    p.innerHTML += product.ListPrice;
  }
}
