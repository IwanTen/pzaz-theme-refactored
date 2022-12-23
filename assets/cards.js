document.addEventListener("DOMContentLoaded", function () {
    InitProductCardsEmbla();
    });

function InitProductCardsEmbla() {
    const emblaNode = document.querySelector(".cards .embla__viewport ");
    const plugins = [EmblaCarouselClassNames()];
    const options = {
      align: "center",
      inViewThreshold: 1,
      loop: false,
    };
    const cards = EmblaCarousel(emblaNode, options, plugins);
  }
  