import { getLocalStorage } from "../js/utils.js";

export function renderCartSuperscript() {
  if (getLocalStorage("so-cart") == null) {
    const element = document.getElementById("cart-superscript");
    element.innerHTML = 0;
  } else {
    const cartLength = getLocalStorage("so-cart").length;
    const element = document.getElementById("cart-superscript");
    element.innerHTML = cartLength;
  }
}

// renderCartSuperscript();
