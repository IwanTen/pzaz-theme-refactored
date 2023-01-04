const cart = document.querySelector(".zazzy-cart");
const overlayClass = ".cart-overlay";
const cartClass = ".cart";
const cartToggleClass = ".cart-toggle";
const closeButtonClass = ".cart__close";

[...document.querySelectorAll(".cart-addon__input")].forEach((input) =>
  input.addEventListener("change", function (event) {
    let checked = event.target.checked;
    if (checked) {
      event.target.parentNode.classList.add("active");
      event.target.parentNode.querySelector(
        ".cart-addon__button-text"
      ).innerText = "remove";
    } else {
      event.target.parentNode.classList.remove("active");
      event.target.parentNode.querySelector(
        ".cart-addon__button-text"
      ).innerText = "add";
    }
  })
);

document.querySelector(cartToggleClass).addEventListener("click", function () {
  openCart();
});
document.querySelector(closeButtonClass).addEventListener("click", function () {
  closeCart();
});
document.querySelector(overlayClass).addEventListener("click", function () {
  closeCart();
});

// function updateDiscountMessage() {
//   const discountMessages = [
//     ...document.querySelectorAll(".discount-message__text"),
//   ];
//   console.log("discount messages", discountMessages);
//   const discountData = discountMessageData.find((item) => {
//     return item.count == parseInt(CartJS.cart.item_count);
//   });
//   if (!discountData) return;
//   discountMessages.forEach((message) => {
//     message.innerText = discountData.message;
//     gsap.from(message, { opacity: 0, duration: 0.8 });
//   });
// }

function openCart() {
  console.log("cart opened");
  document.querySelector(cartClass).classList.add("active");
  document.querySelector(overlayClass).classList.add("active");
}

function closeCart() {
  console.log("cart closed");
  document.querySelector(cartClass).classList.remove("active");
  document.querySelector(overlayClass).classList.remove("active");
}

class PzazCart extends HTMLElement {
  constructor() {
    super();
    this.querySelector(".cart-subscribe__toggle").addEventListener(
      "click",
      this.toggleSubscriptions.bind(this)
    );
  }

  toggleSubscriptions(event) {
    event.target.classList.toggle("active");
    this.querySelector(".cart-subscribe").classList.toggle("active");
  }
}

customElements.define("pzaz-cart", PzazCart);

document.querySelector("*[data-action=clear]").addEventListener("click", () => {
  liquidAjaxCart.cartRequestClear();
  console.log("cart clear button clicked");
});

window.addEventListener("load", function () {
  liquidAjaxCart.subscribeToCartSectionsUpdate((sections) => {
    console.log("Sections are updated: ", sections);
  });
});
