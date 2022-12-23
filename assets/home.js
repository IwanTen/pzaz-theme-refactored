let cards;
let testimonials;
let autoplayTimer;
window.addEventListener("load", init);

function init() {
  InitProductCardsEmbla();
  InitTestimonialsEmbla();
  InitReviewsEmbla();
  // InitProductsEmbla();
}

// CREATE EMBLA CAROUSELS

function InitProductCardsEmbla() {
  const emblaNode = document.querySelector(".product-cards .embla__viewport ");
  const plugins = [EmblaCarouselClassNames()];
  const options = {
    align: "center",
    inViewThreshold: 1,
    loop: false,
  };
  const cards = EmblaCarousel(emblaNode, options, plugins);
}

function InitTestimonialsEmbla() {
  const emblaNode = document.querySelector(".testimonial.embla");
  const plugins = [EmblaCarouselAutoplay(), EmblaCarouselClassNames()];
  const options = {
    align: "center",
    inViewThreshold: 1,
    loop: true,
  };
  const testimonials = EmblaCarousel(emblaNode, options, plugins);
}

function InitReviewsEmbla() {
  const emblaNode = document.querySelector(".reviews__carousel.embla");
  const plugins = [EmblaCarouselAutoplay(), EmblaCarouselClassNames()];
  const options = {
    align: "center",
    inViewThreshold: 1,
    loop: true,
  };
  const reviews = EmblaCarousel(emblaNode, options, plugins);
}

// function InitProductsEmbla() {
//   const emblaNode = document.querySelector(".product.embla");
//   const plugins = [EmblaCarouselAutoplay(), EmblaCarouselClassNames()];
//   const options = {
//     align: "center",
//     inViewThreshold: 1,
//     loop: false,
//   };
//   const testimonials = EmblaCarousel(emblaNode, options, plugins);
//   console.log("product page carousel intialized");
// }
