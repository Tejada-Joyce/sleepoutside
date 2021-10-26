import {
  getLocalStorage,
  qs,
  setClickforAll,
  setLocalStorage,
  loadHeaderFooter,
  playAnimation,
} from "../js/utils.js";

import { renderCartSuperscript } from "./cart-superscript.js";

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  const checkoutBtn = qs("#checkout-button");
  if (cartItems.length !== 0) {
    // const newCartItems = [
    //   ...new Map(cartItems.map((item) => [item["Id"], item])).values(),
    // ];
    const mapItems = cartItems.map((item) => [item["Id"], item]);
    const myMap = new Map(mapItems);
    const newCartItems = [...myMap.values()];
    const htmlItems = newCartItems.map((item) => {
      const quantity = getItemQuantity(item, cartItems);
      return renderCartItem(item, quantity);
    });
    qs(".product-list").innerHTML = htmlItems.join("");
    setClickforAll(".removeFromCart", removeFromCart);
    totalCost();
    checkoutBtn.style.display = 'block';
  } else {
    const p = document.createElement("p");
    const ul = qs(".product-list");
    const section = qs(".products");
    p.innerHTML = "There is nothing in your cart yet.";
    ul.style.display = "none";
    section.appendChild(p);
    checkoutBtn.style.display = 'none';
  }

  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

function renderCartItem(item, quantity) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${quantity}</p>
  <p class="cart-card__price">$${(item.FinalPrice * quantity).toFixed(2)}</p>
  <div class="cart-card__remove">
    <button class="removeFromCart" data-id="${
      item.Id
    }">Remove from Cart</button>
  </div>
</li>`;
  return newItem;
}

function totalCost() {
  // console.log(getLocalStorage("so-cart"));
  if (
    getLocalStorage("so-cart") == null ||
    getLocalStorage("so-cart").length == 0
  ) {
    document.getElementById("cartTotal").style.display = "none";
  } else {
    const cartItems = getLocalStorage("so-cart");
    var prices = [];
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      prices.push(item.FinalPrice);
    }
    let sum = 0;
    for (let j = 0; j < prices.length; j++) {
      sum += prices[j];
    }
    document.getElementById(
      "cartTotal"
    ).innerHTML = `Cart total: $${sum.toFixed(2)}`;
  }
}

//Function removes the first element that has the same id that was clicked
function removeFromCart(el) {
  const productId = el.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");
  const index = cartItems.findIndex((product) => product.Id === productId);
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartSuperscript();
  playAnimation();
  getCartContents();
  totalCost();
}

function getItemQuantity(cart, mainArray) {
  let count = 0;
  mainArray.forEach((item) => {
    if (item.Id === cart.Id) {
      count++;
    }
  });
  return count;
}

loadHeaderFooter();
getCartContents();
