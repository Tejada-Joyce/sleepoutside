import { renderCartSuperscript } from "./cart-superscript.js";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  let currentCart = JSON.parse(localStorage.getItem(key));
  if (!currentCart) {
    currentCart = [];
  }
  return currentCart;
}
// save data to local storage
export function setLocalStorage(key, data) {
  // let currentCart = getLocalStorage(key);
  // currentCart.push(data);
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//Function adds the click and touch events to more than one element
export function setClickforAll(selector, callback) {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback(el);
    });
    el.addEventListener("click", () => {
      callback(el);
    });
  });
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  callback
) {
  const newTemplate = qs(template);
  parentElement.innerHTML = "";
  list.forEach((product) => {
    const clone = newTemplate.content.cloneNode(true);
    callback(clone, product);
    parentElement.appendChild(clone);
  });
}

export function renderWithTemplate(template, parentElement, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }
  parentElement.appendChild(clone);
}

export async function loadTemplate(path) {
  const html = await fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error!");
      }
      return response;
    })
    .then((response) => response.text());

  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  const headerHTML = await loadTemplate("../partials/header.html");
  const footerHTML = await loadTemplate("../partials/footer.html");

  const header = qs("#main-header");
  const footer = qs("#main-footer");

  await renderWithTemplate(headerHTML, header);
  await renderWithTemplate(footerHTML, footer);
  renderCartSuperscript();
}

export function playAnimation() {
  const cart = qs("#cart-superscript");
  if (cart.classList.contains("cart-animation")) {
    cart.classList.remove("cart-animation");
    cart.classList.add("cart-animation2");
  } else {
    cart.classList.add("cart-animation");
    cart.classList.remove("cart-animation2");
  }
}
