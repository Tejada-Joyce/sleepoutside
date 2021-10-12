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
  let currentCart = getLocalStorage(key);
  currentCart.push(data);
  localStorage.setItem(key, JSON.stringify(currentCart));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
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
