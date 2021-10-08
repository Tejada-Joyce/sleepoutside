function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

function totalCost() {
  if (getLocalStorage("so-cart") == null) {
    //pass
  } else {
    const cartItems = getLocalStorage("so-cart");
    var prices = [];
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      prices.push(item.FinalPrice);
    }
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
      sum += prices[i];
    }
    document.getElementById("cartTotal").innerHTML = `Cart total: $${sum}`;
  }
}

totalCost();
getCartContents();
