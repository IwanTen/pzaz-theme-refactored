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

window.addEventListener("load", () => {
  gsap.to(".map__image", {
    scrollTrigger: {
      trigger: ".map__cta",
      start: "top bottom",
      scrub: 1,
      onEnter: () => console.log("onEnter"),
      onLeave: () => console.log("onLeave"),
    },
    y: "-200px",
  });
});
