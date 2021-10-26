import {getLocalStorage, qs} from "./utils.js"


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
        qs(
          "#item-subtotal"
        ).innerHTML = `$${sum.toFixed(2)}`;
        qs('#quantity').innerHTML = cartItems.length;
      }
      return(sum.toFixed(2));
}

function renderTotalDetails() {
    const tax = qs('#tax');
    const taxAmount = (renderSubtotal() * 0.06).toFixed(2);
    tax.innerHTML = `$${taxAmount}`;
    const shipping = qs('#shipping-estimate');
    let shippingAmount
    if (cartItems.length == 1) {
        shippingAmount = 10;
    }
    else {
        shippingAmount = 10 + (cartItems.length - 1) * 2;
    }
    shipping.innerHTML = `$${shippingAmount.toFixed(2)}`;

    const total = qs('#order-total');
    const totalAmount = parseFloat(renderSubtotal()) + parseFloat(taxAmount) + parseFloat(shippingAmount);
    total.innerHTML = `$${totalAmount}`;
}

renderSubtotal();
const zip = qs('#zip');
zip.addEventListener('blur', (event) => {
    if(zip.value) {
        renderTotalDetails()
    }
})


