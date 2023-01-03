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

window.addEventListener("load", InitReviewsEmbla);
