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
  HandleDiagramCards();
  InitDiagramAnimation();
  InitScienceAnimation();
  InitFocusAnimation();
});

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
        duration: 0.5,
        stagger: {
          amount: 1,
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

function InitTestimonialAnimation() {
  const testimonials = gsap.utils.toArray(".testimonial .embla__slide__inner");
  let testimonialTimeline = gsap.timeline({
    defaults: { duration: 1, ease: "ease1" },
    scrollTrigger: {
      // markers: true,
      id: "testimonial",
      trigger: ".testimonial",
      start: "top bottom",
      toggleActions: "play none none reset",
      onLeaveBack: () => {},
    },
  });

  testimonialTimeline.from(testimonials, {
    opacity: 0,
    scale: 1,
    duration: 0.5,
    stagger: {
      amount: 1,
      onStart: function () {},
    },
  });
}

function InitScienceAnimation() {
  const scienceItems = gsap.utils.toArray(".science__item");
  gsap.from(scienceItems, {
    scrollTrigger: {
      id: "science",
      trigger: ".science",
      start: "50% bottom",
      // toggleActions: "play none none reset",
      // markers: true,
    },
    opacity: 0,
    scale: 1,
    y: 50,
    duration: 0.5,
    stagger: {
      amount: 0.7,
      onStart: function () {},
    },
  });
}

function InitFocusAnimation() {
  gsap.from(".focus__image", {
    scrollTrigger: {
      trigger: ".focus",
      start: "top 60%",
      // scrub: 1,
      markers: true,
      onEnter: () => console.log("onEnter"),
      onLeave: () => console.log("onLeave"),
    },
    duration: 1,
    x: "50%",
    opacity: 0,
  });
}

// function InitScienceAnimation() {
//   const scienceItems = gsap.utils.toArray(".science__item");
//   let scienceTimeline = gsap.timeline({
//     defaults: { duration: 1, ease: "ease1" },
//     scrollTrigger: {
//       // markers: true,
//       id: "science",
//       trigger: ".science",
//       start: "50% bottom",
//       // toggleActions: "play none none reset",
//       onLeaveBack: () => {},
//     },
//   });

//   scienceTimeline.from(scienceItems, {
//     opacity: 0,
//     scale: 1,
//     y: 50,
//     duration: 0.5,
//     stagger: {
//       amount: 0.7,
//       onStart: function () {},
//     },
//   });
// }
