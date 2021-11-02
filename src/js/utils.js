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

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  console.log(message);
  console.log("hey");
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  // set the contents. You should have a message and an X or something the user can click on to remove
  let content = "";
  content += `<p> ${message} </p>`;

  alert.innerHTML = content;
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  // alert.addEventListener('click', function (e) {
  //   if ( ) { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
  //     main.removeChild(this);
  //   }
  // })
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}
