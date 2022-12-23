document.addEventListener("DOMContentLoaded", InitWakeup);

function InitWakeup() {
  ResizeDiagramItems();
  AnimateWakeup();
}
function AnimateWakeup() {
  let items = gsap.utils.toArray([
    ".wakeup p",
    ".wakeup h1",
    ".wakeup .button-wrapper",
    // ".science-item",
    // ".home-heading",
  ]);

  // items.forEach((item, index) => {
  //   gsap.from(item, {
  //     opacity: 0,
  //     y: 100,
  //     duration: 0.5,
  //     ease: "ease1",
  //     scrollTrigger: {
  //       trigger: item,
  //       markers: false,
  //       toggleActions: "play none none none",
  //     },
  //   });
  // });

  // let SectionTransitionTimeline = gsap.timeline({
  //   defaults: { duration: 1 },
  //   scrollTrigger: {
  //     trigger: ".power",
  //     start: "top top",
  //     pinSpacing: false,
  //     pin: true,
  //     scrub: true,
  //     toggleActions: "restart none none reset",
  //     // markers: true,
  //   },
  // });
  // SectionTransitionTimeline.to(".power", {
  //   opacity: 0,
  //   y: "-60%",
  // });

  const diagramItems = gsap.utils.toArray(".diagram-item");

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
          item
            .querySelector(".diagram-item__border")
            .classList.remove("active");
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
              .querySelector(".diagram-item__border")
              .classList.add("active");
          },
        },
      },
      "<0.2"
    );
}
function ResizeDiagramItems() {
  let items = document.querySelectorAll(".diagram-item svg");
  let px = 16;
  let py = 14;
  items.forEach((item) => {
    let text = item.querySelector(".diagram-item__text");
    let border = item.querySelector(".diagram-item__border");
    let textWidth = text.getBoundingClientRect().width;
    let textHeight = text.getBoundingClientRect().height;
    item.setAttribute("width", `${textWidth + px}px`);
    item.setAttribute("height", `${textHeight + py}px`);
    border.setAttribute("width", `${textWidth + px}px`);
    border.setAttribute("height", `${textHeight + py}px`);
    console.log(text.clientWidth);
  });
}

// function AnimateWakeup() {
//   let i = gsap.utils.toArray(".intro-text");
//   let tl1 = gsap.timeline({
//     defaults: { duration: 1 },
//     scrollTrigger: {
//       trigger: ".power",
//       end: "bottom top",
//       markers: true,
//       pin: false,
//       scrub: false,
//     },
//   });
//   tl1
//     .from(
//       i.filter(
//         (item, index) => index % 2 === 0 && item.classList.contains("alt")
//       ),
//       {
//         opacity: 0,
//         scale: 0.9,
//         x: "-100%",
//         stagger: 0.1,
//         rotation: 45,
//       },
//       "<"
//     )
//     .from(
//       i.filter(
//         (item, index) => index % 2 != 0 && item.classList.contains("alt")
//       ),
//       {
//         opacity: 0,
//         scale: 0.9,
//         x: "100%",
//         stagger: 0.1,
//         rotation: -45,
//         onComplete: () => {
//           gsap.to(i, { color: "#fdff02" });
//         },
//       },
//       "<+=0.1"
//     )
//     .to(
//       ".intro-text",
//       {
//         opacity: 0,
//         scale: 2,
//         y: "100%",
//         stagger: {
//           amount: 1,
//           from: "end",
//         },
//         rotation: 0,
//       },
//       "text-end"
//     )
//     .from([".power-text", ".power .button-wrapper"], {
//       opacity: 0,
//       x: 100,
//     })
//     .from(
//       ".diagram-image",
//       {
//         opacity: 0,
//         scale: 0.5,
//         y: -100,
//       },
//       "<.1"
//     )
//     .from(".diagram-item", {
//       opacity: 0,
//       scale: 0.9,
//       stagger: {
//         amount: 1,
//         onStart: function () {
//           this.targets()[0]
//             .querySelector(".diagram-item__border")
//             .classList.add("active");
//         },
//         onReverseComplete: function () {
//           this.targets()[0]
//             .querySelector(".diagram-item__border")
//             .classList.remove("active");
//         },
//       },
//     });
// }
