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
    //Add hover event for each variant (media changes and such)
    this.variants.forEach((variant) => {
      variant.addEventListener("mouseenter", this.handleMouseOver.bind(this));
    });
    //get all of the quantity buttons
    this.quantityButtons = [...document.querySelectorAll(".variant__button")];
    this.quantityButtons.forEach((button) => {
      button.addEventListener("click", this.handleQuantityChange.bind(this));
    });
    this.querySelector(".product__submit").addEventListener(
      "click",
      this.handleAddToCart.bind(this)
    );
  }

  handleMouseOver(event) {
    //get the variant that was hovered
    const variant = event.currentTarget;
  }

  handleQuantityChange(event) {
    const button = event.currentTarget;
    const variant = button.closest(".variant");
    if (button.dataset.value != variant.dataset.value) return;
    const currentQuantity = parseInt(variant.dataset.quantity);
    let newQuantity;
    if (button.dataset.action == "add") {
      newQuantity = currentQuantity + 1;
    } else if (button.dataset.action == "subtract") {
      newQuantity = currentQuantity - 1;
    }
    variant.dataset.quantity = newQuantity < 0 ? 0 : newQuantity;
    const quantityDisplay = variant.querySelector(".variant__quantity");
    quantityDisplay.innerHTML = `${variant.dataset.quantity}pc`;

    // //check if reward bar exists and update it

    this.total = this.variants.reduce((total, variant) => {
      return total + parseInt(variant.dataset.quantity);
    }, 0);

    const rewardBar = document.querySelector("pzaz-reward-bar");
    if (!rewardBar) {
      console.log("no reward bar");
      return;
    }
    rewardBar.updateRewardBar(this.total);
  }

  handleAddToCart() {
    const items = this.variants.map((variant) => {
      return {
        id: variant.dataset.value,
        quantity: variant.dataset.quantity,
      };
    });

    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .finally(() => {
        document.querySelector("pzaz-cart").updateCartData();
        setTimeout(openCart, 500);
      })
      .catch((error) => console.log(error));
  }
}

customElements.define("pzaz-variant-picker", PzazVariantPicker);
