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
    // console.log(this.datasource);
    this.productList = await this.datasource.getProductsData(this.category);

    this.element = qs(this.element);
    // renderListWithTemplate(
    //   this.template,
    //   this.element,
    //   this.productList,
    //   this.prepareTemplate,
    //   this.editBread
    // );
    this.editTitle();
    this.editBread();

    qs("#sortTypes").addEventListener("change", (e) => {
      this.sortListBy(e.target.value);
    });
  }

  prepareTemplate(clone, product) {
    const a = qs(".product-card a", clone);
    const img = qs(".product-card img", clone);
    const h3 = qs(".card__brand", clone);
    const h2 = qs(".card__name", clone);
    const p = qs(".product-card__price", clone);
    const discount = qs(".discount", clone);
    const originalPrice = qs(".original-price", clone);

    a.href += product.Id;
    img.setAttribute("src", product.Images.PrimaryMedium);
    h3.innerHTML = product.Brand.Name;
    h2.innerHTML = product.NameWithoutBrand;
    p.innerHTML += product.ListPrice;
    originalPrice.innerHTML = `<strike>$${product.SuggestedRetailPrice}</strike>`;
    discount.innerHTML =
      Math.round(
        (100 * (product.SuggestedRetailPrice - product.ListPrice)) /
          product.SuggestedRetailPrice
      ) + "% OFF";
  }

  editTitle() {
    const h2 = qs("section.products h2");
    h2.innerHTML += ` ${this.category}`;
  }

  editBread() {
    const bread = qs("section.breadcrumbs h3");
    bread.innerHTML += `${this.category} -> (${this.productList.length} Items)`;
  }

  sortListBy(type) {
    if (type === "name") {
      this.productList.sort((a, b) =>
        a.NameWithoutBrand > b.NameWithoutBrand
          ? 1
          : b.NameWithoutBrand > a.NameWithoutBrand
          ? -1
          : 0
      );
      console.log(this.productList);
    } else {
      this.productList.sort((a, b) =>
        a.ListPrice > b.ListPrice ? 1 : b.ListPrice > a.ListPrice ? -1 : 0
      );
      console.log(this.productList);
    }
    renderListWithTemplate(
      this.template,
      this.element,
      this.productList,
      this.prepareTemplate,
      this.editBread
    );
  }
}
