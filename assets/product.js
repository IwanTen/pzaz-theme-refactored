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
      // console.log("add button clicked", event.currentTarget.dataset.id);
      AddToCart(event);
    });
  });
}
if (removeButtons) {
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // console.log("remove button clicked", event.currentTarget.dataset.id);
      SubtractFromCart(event);
    });
  });
}

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
  let items = liquidAjaxCart.getCartState().cart.items;
  let line_item = items.find((item) => {
    return item.id == event.currentTarget.dataset.id;
  });

  let quantity = line_item ? line_item.quantity - 1 : 0;
  liquidAjaxCart.cartRequestChange(
    {
      id: event.currentTarget.dataset.id,
      quantity: quantity,
    },
    { newQueue: true }
  );
}

function updateVariantCount(items) {
  const variants = [...document.querySelectorAll(".variant")];
  if (!variants) {
    console.log("cant access product variant selectors");
    return;
  }

  let data = items.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
    };
  });

  variants.forEach((variant) => {
    let match = data.find((item) => {
      return item.id == variant.dataset.id;
    });

    if (match) {
      variant.querySelector(".variant__quantity").innerText = match.quantity;
      variant.dataset.quantity = match.quantity;
      return;
    }

    variant.querySelector(".variant__quantity").innerText = 0;
    variant.dataset.quantity = 0;
  });
}

function updateDiscountMessage(items, data) {
  let count = 0;
  items.forEach((item) => {
    if (item.handle == "pzaz") {
      count += item.quantity;
    }
  });

  if (count >= data.length) {
    count = data.length - 1;
    document.querySelector(".discount-message p").innerText =
      data[data.length - 1].message;
  } else if (count <= 0) {
    document.querySelector(".discount-message p").innerText = data[0].message;
  } else {
    document.querySelector(".discount-message p").innerText = data.find(
      (item) => item.count === count
    ).message;
  }
}

//Submit button goes to cart (were not actually adding to cart here)
document.querySelector(".product__submit").addEventListener("click", () => {
  openCart();
});

function handleAjaxResults() {
  console.log(liquidAjaxCart.getCartState());
  const cart = liquidAjaxCart.getCartState().cart;
  // console.log("cart", cart);
  updateVariantCount(cart.items);
  updateDiscountMessage(cart.items, discountMessageData);
}

window.addEventListener("load", function () {
  if ("liquidAjaxCart" in window) {
    liquidAjaxCart.subscribeToCartAjaxRequests((data, resultFunction) => {
      resultFunction(handleAjaxResults);
    });
  } else {
    console.log("no liquidAjaxCart");
  }
  initEmblaVariantToggles();
});

document.querySelectorAll(".accordion-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    document.querySelectorAll(".accordion-item").forEach((item) => {
      if (item !== event.currentTarget) {
        item.classList.remove("active");
      }
    });
    event.currentTarget.classList.toggle("active");
  });
});

const emblaNode = document.querySelector(".product .embla__viewport");
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

const discountMessageData = [
  {
    count: 0,
    reward: null,
    message:
      "Welcome to the world of fast, fun, and effective energy. Select a four-pack of your favorite flavor.",
  },
  {
    count: 1,
    reward: null,
    message: "Buy one more pack and receive free shipping!",
  },
  {
    count: 2,
    reward: "Free Shipping",
    message:
      "You’ve unlocked free shipping and saved $5. Add one more pack to save 20% off your entire order!",
  },
  {
    count: 3,
    reward: "20% off",
    message:
      "You’ve unlocked free shipping and 20% off your entire order, saving $18. Want to save more? Add three more packs of Pzaz :-) ",
  },
  {
    count: 4,
    reward: null,
    message:
      "You’ve unlocked free shipping and 20% off your entire order. add two more packs and recieve 30% off your entire order.",
  },
  {
    count: 5,
    reward: null,
    message:
      "You’ve unlocked free shipping and 20% off your entire order. add just one more pack and recieve 30% off your entire order.",
  },
  {
    count: 6,
    reward: "30% off",
    message:
      "You've unlocked 30% off your entire order. Subscribe during checkout to recieve a whopping 60% off.",
  },
];
