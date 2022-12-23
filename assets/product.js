//Zazzy Global JS

// function debounce(fn, wait) {
//   let t;
//   return (...args) => {
//     clearTimeout(t);
//     t = setTimeout(() => fn.apply(this, args), wait);
//   };
// }

// function fetchConfig(type = "json") {
//   return {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: `application/${type}`,
//     },
//   };
// }

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
    } else if (button.dataset.action == "subtract") {
      newQuantity = currentQuantity - 1;
      this.decrementQuantity(variant);
    }

    console.log("new quantity", newQuantity);
    variant.dataset.quantity = newQuantity < 0 ? 0 : newQuantity;
    const quantityDisplay = variant.querySelector(".variant__quantity");
    quantityDisplay.innerHTML = `${variant.dataset.quantity}`;
  }

  decrementQuantity(variant) {
    let current = CartJS.cart.items.find((item) => {
      return item.variant_id == variant.dataset.value;
    });
    if (!current) return;
    CartJS.updateItemById(current.variant_id, current.quantity - 1);
  }
}

customElements.define("pzaz-variant-picker", PzazVariantPicker);

const emblaNode = document.querySelector(".product__carousel.embla");
// const plugins = [EmblaCarouselAutoplay(), EmblaCarouselClassNames()];
const options = {
  align: "center",
  inViewThreshold: 1,
  loop: false,
};

const productEmbla = EmblaCarousel(emblaNode, options);
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

function updateVariantQuantities() {
  const variants = [...document.querySelectorAll(".variant")];
  const cartItems = CartJS.cart.items;
  variants.forEach((variant) => {
    const cartItem = cartItems.find((item) => {
      return item.variant_id == variant.dataset.value;
    });
    if (cartItem) {
      variant.dataset.quantity = cartItem.quantity;
      variant.querySelector(
        ".variant__quantity"
      ).innerHTML = `${cartItem.quantity}`;
    }
  });
}

window.onload = () => {
  initEmblaVariantToggles();
  updateVariantQuantities();
};

$(document).on("cart.requestComplete", function (event, cart) {
  updateVariantQuantities();
});

document.querySelectorAll(".accordion-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    // document.querySelectorAll(".accordion-item").forEach((item) => {
    //   item.classList.remove("active");
    // });
    // console.log("accordion item clicked");
    event.currentTarget.classList.toggle("active");
  });
});
