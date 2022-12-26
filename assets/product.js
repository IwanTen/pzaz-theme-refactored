function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

let addButtons = [...document.querySelectorAll("[data-action=add]")];
console.log("addButtons", addButtons);
let removeButtons = [...document.querySelectorAll("[data-action=subtract]")];
console.log("removeButtons", removeButtons);

if (addButtons) {
  addButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log("add button clicked", event.currentTarget.dataset.id);
      AddToCart(event);
    });
  });
}

if (removeButtons) {
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log("remove button clicked", event.currentTarget.dataset.id);
      SubtractFromCart(event);
    });
  });
}

//Submit button goes to cart (were not actually adding to cart here)
document.querySelector(".product__submit").addEventListener("click", () => {
  openCart();
});

function AddToCart(event) {
  liquidAjaxCart.cartRequestAdd(
    {
      items: [
        {
          id: event.currentTarget.dataset.id,
          quantity: 1,
        },
      ],
    },
    { newQueue: true }
  );
}

function SubtractFromCart(event) {
  liquidAjaxCart.cartRequestChange(
    {
      id: event.currentTarget.dataset.id,
      quantity: event.currentTarget.closest(".variant").dataset.quantity - 1,
    },
    { newQueue: true }
  );
}

window.addEventListener("load", function () {
  if ("liquidAjaxCart" in window) {
    liquidAjaxCart.subscribeToCartStateUpdate((state, isCartUpdated) => {
      UpdateVariantQuantities(state, isCartUpdated);
    });
  } else {
    console.log("no liquidAjaxCart");
  }
});

function UpdateVariantQuantities(state, isCartUpdated) {
  const variants = [...document.querySelectorAll(".variant")];
  if (!variants) {
    console.log("cant access product variant selectors");
    return;
  }
  if (state.cart.item_count == 0) {
    console.log("no items in cart");
    variants.forEach((variant) => {
      variant.querySelector(".variant__quantity").innerText = 0;
      variant.dataset.quantity = 0;
    });
    return;
  }
  if (!isCartUpdated) {
    console.log("cart not updated");
    return;
  }
  state.cart.items.forEach((item) => {
    variants.forEach((variant) => {
      if (item.id == variant.dataset.id) {
        variant.querySelector(".variant__quantity").innerText = item.quantity;
        variant.dataset.quantity = item.quantity;
      }
    });
  });
}

document.querySelectorAll(".accordion-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("active");
  });
});
