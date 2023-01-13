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

function openCart() {
  document.querySelector(cartClass).classList.add("active");
  document.querySelector(overlayClass).classList.add("active");
}

function closeCart() {
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
    const items  = liquidAjaxCart.getCartState().cart.items;
    const hasSubscriptions = items.some((item) => item.selling_plan_allocation);
    if (hasSubscriptions) {
      this.removeSellingPlan(items);
    } else {
      this.addSellingPlan(items);
    }
    event.target.classList.toggle("active");
  }

  addSellingPlan(items) {
    console.log("attempting to add a selling plan");
    const plan = 3532390643;
    const data = items.map((item, index) => {
      return {
        line: index + 1,
        quantity: item.quantity,
        selling_plan: plan,
      };
    });
    data.forEach((item, index) => {
      liquidAjaxCart.cartRequestChange({
        line: item.line,
        quantity: item.quantity,
        selling_plan: item.selling_plan,
      },{newQueue: index == 0? true : false , lastComplete: ( requestState ) => {
        if(index >= data.length -1)
        this.querySelector(".cart-subscribe").classList.toggle("active");
        console.log("requestState", requestState)
      },});

     })
    console.log("data", data);
}

removeSellingPlan(items) {
  console.log("attempting to remove all items from selling plan");
 const data = items.map((item, index) => {
    return {
      line: index+1,
      quantity: item.quantity,
      selling_plan: "",
    };
  });
  data.forEach((item,index) => {
    liquidAjaxCart.cartRequestChange({
      line: item.line,
      quantity: item.quantity,
      selling_plan: item.selling_plan,
    },{newQueue: index == 0? true : false, lastComplete: ( requestState ) => {
      if(index >= data.length -1)
      this.querySelector(".cart-subscribe").classList.toggle("active");
    },});

   })
  console.log("data", data);
}
}
customElements.define("pzaz-cart", PzazCart);

document.querySelector("*[data-action=clear]").addEventListener("click", () => {
  liquidAjaxCart.cartRequestClear();
  console.log("cart clear button clicked");
});

// window.addEventListener("load", function () {
//   liquidAjaxCart.subscribeToCartSectionsUpdate((sections) => {
//     console.log("Sections are updated: ", sections);
//   });
// });




