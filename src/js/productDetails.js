import {
  qs,
  getLocalStorage,
  setLocalStorage,
  playAnimation,
} from "../js/utils.js";

import { renderCartSuperscript } from "./cart-superscript.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.carousel = "";
    this.carouselLinks = "";
    this.carouselItem = "";
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML

    // Create carousel
    this.carousel = this.renderCarousel();
    this.carouselLinks = this.carousel[1];
    this.carouselItem = this.carousel[0];

    this.renderProductDetails();
    console.log(this.carousel[1]);

    // once the html is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let currentCart = getLocalStorage("so-cart");
    currentCart.push(this.product);
    currentCart.sort((a, b) =>
      a.Name > b.Name ? 1 : b.Name > a.Name ? -1 : 0
    );
    setLocalStorage("so-cart", currentCart);
    playAnimation();
    renderCartSuperscript();
  }

  renderProductDetails() {
    const productDetailsHtml = `
      <section class="product-detail">
      <h3 class="breadcrumbs">${this.product.Category} -> ${
      this.product.NameWithoutBrand
    }</h3>
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>

        <div class="slider">
          <div class="slides">
          <img class="carousel-image" id="slide-1" src="${
            this.product.Images.PrimaryLarge
          }" alt="${this.product.NameWithoutBrand}"/>
            ${this.carouselLinks} 
          </div>
          <div class="carousel-icons">
          <a href="#slide-1"> 1 </a>
            ${this.carouselItem}
            </div>
        </div>

        <p class="discount"> ${Math.round(
          (100 * (this.product.SuggestedRetailPrice - this.product.ListPrice)) /
            this.product.SuggestedRetailPrice
        )}% OFF</p>
        <p class="product-card__price">${this.product.ListPrice}  <strike>$${
      this.product.SuggestedRetailPrice
    }</strike></p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${
            this.product.Id
          }">Add to Cart</button>
        </div>
      </section>
    `;

    const main = qs("#productDetails");
    main.innerHTML = productDetailsHtml;
    this.editBreadCartDetails;
  }

  renderCarousel() {
    var carouselItem = "";
    var boxItems = "";
    var number = 1;
    if (this.product.Images.ExtraImages !== null) {
      this.product.Images.ExtraImages.forEach((item) => {
        number += 1;
        console.log(item);
        carouselItem += `<a href="#slide-${number}"> `;
        carouselItem += number;
        carouselItem += " </a>";

        boxItems += `<img class="carousel-image" id="slide-${number}" src="`;
        boxItems += item.Src;
        boxItems += "/>";

        // boxItems += number;
        // boxItems += `</img>`;
      });

      // <img
      // class="divider"
      // src="${this.product.Images.PrimaryLarge}"
      console.log(carouselItem);
      console.log(boxItems);

      return [carouselItem, boxItems];
    }
  }
}
