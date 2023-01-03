window.addEventListener("load", init);
gsap.registerPlugin(ScrollTrigger);
const heroVideo = document.querySelector(".hero__video");
const heroButton = document.querySelector(".hero__button");
let vEnd = heroVideo.getBoundingClientRect().bottom;
let bTop = heroButton.getBoundingClientRect().top;

function init() {
  // AnimateHero();
  AnimateCartButton();
}

function AnimateHero() {
  let vEnd = heroVideo.getBoundingClientRect().bottom;
  let bTop = heroButton.getBoundingClientRect().top;
  let tl = gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "40% top",
      scrub: 1.5,
      pin: false,
      markers: true,
    },
  });
  tl.fromTo(
    heroVideo,
    { currentTime: 0, y: -50 },
    {
      currentTime: heroVideo.duration,
      y: (vEnd - bTop - 16) * -1,
    }
  );
}

function AnimateCartButton() {
  const cartTimeline = gsap.timeline({
    defaults: { duration: 0.5 },
    scrollTrigger: {
      trigger: [".power"],
      start: "top 100px",
      // end: "40% top",
      // markers: true,
      toggleActions: "play none play reverse",
    },
  });
  cartTimeline
    .to(".cart-toggle", {
      fill: "white",
    })
    .to(
      ".cart-toggle__quantity",
      {
        css: {
          backgroundColor: "black",
          borderColor: "white",
          color: "white",
          filter: "drop-shadow(2px 1px 0px white)",
        },
      },
      "<"
    )
    .to(
      ".cart-icon-secondary",
      {
        css: {
          fill: "black",
        },
      },
      "<"
    );
}
