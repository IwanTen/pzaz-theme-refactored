const canvas = document.getElementById("hero-canvas");
const container = document.querySelector(".hero");
const context = canvas.getContext("2d");
const hash = "1EldeuKR_zW0oalo8ZDRdA";
const frameName = "hero-frame";
context.translate(0.5, 0.5);

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;
//

const frameCount = 70;
const currentFrame = (index) =>
  `https://imagedelivery.net/${hash}/${frameName}-${index}/public`;

const images = [];
const tube = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  // console.log(currentFrame(i));
  img.src = currentFrame(i);
  images.push(img);
}

// gsap.to(tube, {
//   frame: frameCount - 1,
//   snap: "frame",
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top top",
//     end: "40% top",
//     scrub: 1,
//     pin: true,
//   },
//   onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
// });

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "40% top",
    scrub: 1.5,
    pin: true,
    markers: true,
  },
});

tl.to(tube, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  onUpdate: render,
});

tl.to(
  canvas,
  {
    y: 100,
  },
  "<"
);

gsap.to(".hero-section", {
  scrollTrigger: {
    trigger: ".power",
    start: "top 80%",
    // end: "40% top",
    toggleActions: "play none none reverse",
    pin: false,
    markers: true,
  },
  css: {
    backgroundColor: "rgba(12,12,12)",
  },
});

// gsap.to(canvas, {
//   y: 100,
//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top top",
//     end: "40% top",
//     scrub: 1,
//     pin: true,
//   },
// });

images[0].onload = render;

function render() {
  let curImage = images[tube.frame];
  let wrh = curImage.width / curImage.height;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    curImage,
    0,
    canvas.height / 4,
    canvas.width,
    canvas.width / wrh
  );
}

// gsap.to(".hero-section", {
//   scrollTrigger: {
//     trigger: ".power",
//     start: "top center",
//     // end: "40% top",
//     pin: false,
//     markers: true,
//   },
//   css: {
//     backgroundColor: "#000",
//   },
// });

// context.drawImage(
//   curImage,
//   canvas.width / 2 - images[tube.frame].width / 4,
//   canvas.height / 2 - images[tube.frame].height / 4,
//   images[tube.frame].width / 2,
//   images[tube.frame].height / 2
// );
