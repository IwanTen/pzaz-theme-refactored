const canvas = document.getElementById("hero-canvas");
const container = document.querySelector(".hero");
const context = canvas.getContext("2d");
const hash = "1EldeuKR_zW0oalo8ZDRdA";
const frameName = "hero-frame";
let wrh = null;
heroPadding = 20;
context.translate(0.5, 0.5);

canvas.width = container.offsetWidth;
// canvas.height = container.offsetHeight;

context.fillStyle = "blue";
context.fillRect(0, 0, canvas.width, canvas.height);

const frameCount = 70;
const currentFrame = (index) =>
  `https://imagedelivery.net/${hash}/${frameName}-${index}/public`;

const images = [];
const tube = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  if (i == 0) {
    img.addEventListener("load", () => {
      console.log("image loaded", img.width, img.height);
    });
  }

  images.push(img);
}

images[0].onload = (event) => {
  console.log("first image loaded", event.target.width, event.target.height);
  wrh = event.target.width / event.target.height;
  canvas.height = canvas.width / wrh;
  initHeroCanvas();
};

//Once the first image is loaded, set the canvas size to the image size and get the width/height ratio

function initHeroCanvas() {
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
    ".hero__content",
    {
      y: 100,
    },
    "<"
  );
}

//here we change the background color on scroll

gsap.to(".hero-section", {
  scrollTrigger: {
    trigger: ".power",
    start: "top bottom",
    // end: "40% top",
    toggleActions: "play none none reverse",
    pin: false,
    markers: true,
  },
  css: {
    backgroundColor: "rgba(12,12,12)",
  },
});

function render() {
  let curImage = images[tube.frame];
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(curImage, 0, 0, canvas.width, canvas.width / wrh);
}

// context.drawImage(
//   curImage,
//   canvas.width / 2 - images[tube.frame].width / 4,
//   canvas.height / 2 - images[tube.frame].height / 4,
//   images[tube.frame].width / 2,
//   images[tube.frame].height / 2
// );

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
