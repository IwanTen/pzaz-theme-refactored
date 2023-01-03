document.addEventListener("DOMContentLoaded", function () {
  InitProductCardsEmbla();
});

let cardsEmbla;

function InitProductCardsEmbla() {
  const emblaNode = document.querySelector(".cards .embla__viewport ");
  const plugins = [EmblaCarouselClassNames()];
  const options = {
    align: "center",
    inViewThreshold: 1,
    loop: false,
  };
  cardsEmbla = EmblaCarousel(emblaNode, options, plugins);
  createEmblaToggles(cardsEmbla, ".card__toggle");
  // convertSlidesToToggles(cardsEmbla);
}

const createEmblaToggles = (embla, selector) => {
  [...document.querySelectorAll(`${selector}`)].forEach((node, index) => {
    node.addEventListener("click", (event) => {
      embla.scrollTo(index);
      [...document.querySelectorAll(`${selector}`)].forEach((node) => {
        node.dataset.active = false;
      });
      event.currentTarget.dataset.active = true;
    });
  });
};

// const convertSlidesToToggles = (embla) => {
//   embla.slideNodes().forEach((slide, index) => {
//     slide.addEventListener("click", () => {
//       embla.scrollTo(index);
//     });
//   });
// };

// window.addEventListener("resize", () => {
//   console.log(cardsEmbla);
//   cardsEmbla.scrollTo(0);
//   cardsEmbla.reInit();
// });
