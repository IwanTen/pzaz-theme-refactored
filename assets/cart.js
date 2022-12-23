const discountMessageData = [
  {
    count: 0,
    reward: null,
    message:
      "One tube, sixty sprays, $3.99. Select a four-pack of your favorite flavor:",
  },
  {
    count: 1,
    reward: null,
    message: "buy one more pack and recieve free shipping",
  },
  {
    count: 2,
    reward: "Free Shipping",
    message:
      "You’ve unlocked free shipping. Add one more pack to save 20% off your entire order.",
  },
  {
    count: 3,
    reward: "20% off",
    message:
      "You’ve unlocked free shipping and 20% off your entire order. Want to save more? Add two more packs of Pzaz to unlock maximum savings: $0.39 $0.27 per serving, $3.99 $2.79 per tube.",
  },
  {
    count: 4,
    reward: null,
    message:
      "You’ve unlocked 20% off your entire order. add two more packs and recieve 30% off your entire order.",
  },
  {
    count: 5,
    reward: null,
    message:
      "You’ve unlocked 20% off your entire order. add just one more pack and recieve 30% off your entire order.",
  },
  {
    count: 6,
    reward: "30% off",
    message:
      "You've unlocked 30% off your entire order. (subscribe during checkout and recieve an additional 60% off!)",
  },
];

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

function updateDiscountMessage() {
  const discountMessages = [
    ...document.querySelectorAll(".discount-message__text"),
  ];

  console.log("discount messages", discountMessages);
  const discountData = discountMessageData.find((item) => {
    return item.count == parseInt(CartJS.cart.item_count);
  });

  if (!discountData) return;
  discountMessages.forEach((message) => {
    message.innerText = discountData.message;
    gsap.from(message, { opacity: 0, duration: 0.8 });
  });
}

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
    this.cart = this.querySelector(".zazzy-cart");

    this.querySelector(".cart-subscribe__toggle").addEventListener(
      "click",
      this.toggleSubscriptions.bind(this)
    );
  }

  toggleSubscriptions(event) {
    event.target.classList.toggle("active");
  }
}

customElements.define("pzaz-cart", PzazCart);

$(document).on("cart.requestComplete", function (event, cart) {
  updateDiscountMessage();
});
