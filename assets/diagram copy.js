function throttle(fn, wait = 100) {
  var time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}
console.log("diagram.js");
const __item = ".diagram__item";
const __text = ".diagram__text";
const __border = ".diagram__border";

window.addEventListener("DOMContentLoaded", () => {
  // ResizeDiagramItems();
  HandleDiagramCards();
  InitDiagramAnimation();
  InitScienceAnimation();
});
window.onresize = throttle(ResizeDiagramItems, 200);

function ResizeDiagramItems() {
  console.log("resize");
  let items = document.querySelectorAll(`${__item} svg`);
  let px = 16;
  let py = 14;
  items.forEach((item) => {
    let text = item.querySelector(__text);
    let border = item.querySelector(__border);
    let textWidth = text.getBoundingClientRect().width;
    let textHeight = text.getBoundingClientRect().height;
    item.setAttribute("width", `${textWidth + px}px`);
    item.setAttribute("height", `${textHeight + py}px`);
    border.setAttribute("width", `${textWidth + px}px`);
    border.setAttribute("height", `${textHeight + py}px`);
  });
}

function InitDiagramAnimation() {
  const diagramItems = gsap.utils.toArray(".diagram__item");
  let diagramTimeline = gsap.timeline({
    defaults: { duration: 1, ease: "ease1" },
    scrollTrigger: {
      // markers: true,
      id: "diagram",
      trigger: ".diagram",
      start: "top bottom",
      toggleActions: "play none none reset",
      onLeaveBack: () => {
        diagramItems.forEach((item) => {
          item.querySelector(".diagram__border").classList.remove("active");
        });
      },
    },
  });

  diagramTimeline
    .from(".diagram__image", {
      opacity: 0,
      scale: 0.1,
      rotation: 20,
      duration: 1,
    })
    .from(
      diagramItems,
      {
        opacity: 0,
        scale: 0.1,
        // y: -50,
        duration: 0.5,
        stagger: {
          amount: 1,
          onStart: function () {
            this.targets()[0]
              .querySelector(".diagram__border")
              .classList.add("active");
          },
        },
      },
      "<0.2"
    );
}

function HandleDiagramCards() {
  items = document.querySelectorAll(".diagram__item");
  items.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      item.querySelector(".diagram__card").classList.add("active");
    });
    item.addEventListener("mouseleave", function () {
      item.querySelector(".diagram__card").classList.remove("active");
    });
  });
}

// function InitTestimonialAnimation() {
//   const testimonials = gsap.utils.toArray(".testimonial .embla__slide__inner");
//   let testimonialTimeline = gsap.timeline({
//     defaults: { duration: 1, ease: "ease1" },
//     scrollTrigger: {
//       // markers: true,
//       id: "testimonial",
//       trigger: ".testimonial",
//       start: "top bottom",
//       toggleActions: "play none none reset",
//       onLeaveBack: () => {},
//     },
//   });

//   testimonialTimeline.from(testimonials, {
//     opacity: 0,
//     scale: 1,
//     duration: 0.5,
//     stagger: {
//       amount: 1,
//       onStart: function () {},
//     },
//   });
}

function InitScienceAnimation() {
  const scienceItems = gsap.utils.toArray(".science__item");
  let scienceTimeline = gsap.timeline({
    defaults: { duration: 1, ease: "ease1" },
    scrollTrigger: {
      markers: true,
      id: "science",
      trigger: ".science",
      start: "50% bottom",
      toggleActions: "play none none reset",
      onLeaveBack: () => {},
    },
  });

  scienceTimeline.from(scienceItems, {
    opacity: 0,
    scale: 1,
    y: 50,
    duration: 0.5,
    stagger: {
      amount: 1,
      onStart: function () {},
    },
  });
}
