window.onload = InitTestimonialsEmbla;

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