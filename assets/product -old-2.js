const addoptions = {
  firstComplete: (requestState) => {
    // The first callback that will be called after the request is finished:
    // state object is not updated yet,
    // sections are not updated yet,
    // everything is not updated yet.
  },
  lastComplete: (requestState) => {
    // The last callback that will be called after the request is finished:
    // state is updated,
    // sections are updated,
    // everything is updated.
  },
  info: {
    // Any additional data you want to attach
    // Don't use the "initiator" and the "cancel" keys
    my_parameter: "value",
  },
  newQueue: true, // whether the request should go to a new or the first queue
};

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

console.log("Zazzy Global JS Loaded");

class PzazVariantPicker extends HTMLElement {
  constructor() {
    super();
    //get all of the variants
    this.variants = [...document.querySelectorAll(".variant")];
    //get all of the quantity buttons
    this.quantityButtons = [...document.querySelectorAll(".variant__button")];
    this.quantityButtons.forEach((button) => {
      button.addEventListener("click", this.handleQuantityChange.bind(this));
    });
    //Submit button goes to cart (were not actually adding to cart here)
    this.querySelector(".product__submit").addEventListener("click", () => {
      openCart();
    });
  }

  handleQuantityChange(event) {
    console.log("quantity change");
    const button = event.currentTarget;
    const variant = button.closest(".variant");
    if (button.dataset.value != variant.dataset.value) return;
    const currentQuantity = parseInt(variant.dataset.quantity);
    let newQuantity;
    if (button.dataset.action == "add") {
      newQuantity = currentQuantity + 1;
      this.IncrementQuantity(variant);
    } else if (button.dataset.action == "subtract") {
      newQuantity = currentQuantity - 1;
      this.DecrementQuantity(variant);
    }

    console.log("new quantity", newQuantity);
    variant.dataset.quantity = newQuantity < 0 ? 0 : newQuantity;
    const quantityDisplay = variant.querySelector(".variant__quantity");
    quantityDisplay.innerHTML = `${variant.dataset.quantity}`;
  }

  DecrementQuantity(variant) {}

  IncrementQuantity(variant) {
    liquidAjaxCart.cartRequestAdd(
      {
        items: [
          {
            id: variant.dataset.value,
            quantity: 1,
          },
        ],
      },
      addoptions
    );
  }
}

customElements.define("pzaz-variant-picker", PzazVariantPicker);

const emblaNode = document.querySelector(".product__carousel.embla");
const emblaoptions = {
  align: "center",
  inViewThreshold: 1,
  loop: false,
};

const productEmbla = EmblaCarousel(emblaNode, emblaoptions);
console.log("product page carousel intialized");

console.log(productEmbla.scrollSnapList());
console.log(productEmbla.slideNodes());

function initEmblaVariantToggles() {
  [...document.querySelectorAll(".variant")].forEach((variant, index) => {
    variant.addEventListener("click", () => {
      productEmbla.scrollTo(index);
    });
  });
}

// function updateVariantQuantities() {
//   const variants = [...document.querySelectorAll(".variant")];
//   const cartItems = CartJS.cart.items;
//   variants.forEach((variant) => {
//     const cartItem = cartItems.find((item) => {
//       return item.variant_id == variant.dataset.value;
//     });
//     if (cartItem) {
//       variant.dataset.quantity = cartItem.quantity;
//       variant.querySelector(
//         ".variant__quantity"
//       ).innerHTML = `${cartItem.quantity}`;
//     }
//   });
// }

window.onload = () => {};

document.querySelectorAll(".accordion-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("active");
  });
});
