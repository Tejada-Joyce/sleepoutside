import { getLocalStorage, qs } from "./utils.js";
import ExternalServices from "./externalServices.js";

const cartItems = getLocalStorage("so-cart");

function renderSubtotal() {
  let sum = 0;
  if (
    getLocalStorage("so-cart") == null ||
    getLocalStorage("so-cart").length == 0
  ) {
    qs("#item-subtotal").style.display = "none";
  } else {
    var prices = [];
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      prices.push(item.FinalPrice);
    }
    for (let j = 0; j < prices.length; j++) {
      sum += prices[j];
    }
    qs("#item-subtotal").innerHTML = `$${sum.toFixed(2)}`;
    qs("#quantity").innerHTML = cartItems.length;
  }
  return sum.toFixed(2);
}

function formDataToJSON(formElement) {
  let formData = new FormData(formElement);

  const converted = Object.fromEntries(formData.entries());

  return converted;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    const itemObject = {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
    return itemObject;
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor() {
    this.shippingAmount = 0;
    this.taxAmount = 0;
    this.totalAmount = 0;
  }

  init() {
    renderSubtotal();
    const zip = qs("#zip");
    zip.addEventListener("blur", (event) => {
      if (zip.value) {
        this.renderTotalDetails();
      }
    });

    qs("#checkout-form form").addEventListener("submit", this.handleSubmit);
  }

  renderTotalDetails() {
    const tax = qs("#tax");
    this.taxAmount = (renderSubtotal() * 0.06).toFixed(2);
    tax.innerHTML = `$${this.taxAmount}`;

    const shipping = qs("#shipping-estimate");
    if (cartItems.length == 1) {
      this.shippingAmount = 10;
    } else {
      this.shippingAmount = 10 + (cartItems.length - 1) * 2;
    }
    this.shippingAmount = this.shippingAmount.toFixed(2);
    shipping.innerHTML = `$${this.shippingAmount}`;

    const total = qs("#order-total");
    this.totalAmount =
      parseFloat(renderSubtotal()) +
      parseFloat(this.taxAmount) +
      parseFloat(this.shippingAmount);
    this.totalAmount = this.totalAmount.toFixed(2);
    total.innerHTML = `$${this.totalAmount}`;
  }

  async handleSubmit(e) {
    e.preventDefault();
    var checkoutForm = e.target;

    const order = formDataToJSON(checkoutForm);
    order.orderDate = new Date();
    order.orderTotal = this.totalAmount;
    order.tax = this.taxAmount;
    order.shipping = this.shippingAmount;
    order.items = packageItems(cartItems);

    const externalServices = new ExternalServices();
    externalServices.checkout(order);
    checkoutForm.reset();
  }
}

const myCheckout = new CheckoutProcess();
myCheckout.init();
