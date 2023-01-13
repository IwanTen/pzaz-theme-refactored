const hcanvas = document.getElementById("hero-canvas");
const container = document.querySelector(".hero");
const context = hcanvas.getContext("2d");
const hash = "1EldeuKR_zW0oalo8ZDRdA";
const frameName = "hero-frame";
let wrh = null;
heroPadding = 20;
context.translate(0.5, 0.5);

hcanvas.width = container.offsetWidth;
// canvas.height = container.offsetHeight;

context.fillStyle = "blue";
context.fillRect(0, 0, hcanvas.width, hcanvas.height);

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
  images.push(img);
}

// Get first image and set canvas height using image aspect (WORKS BC ALL IMAGES ARE SAME SIZE)

images[0].onload = (event) => {
  // console.log("first image loaded", event.target.width, event.target.height);
  wrh = event.target.width / event.target.height;
  hcanvas.height = hcanvas.width / wrh;
  initHeroCanvas();
};

//Once the first image is loaded, set the canvas size to the image size and get the width/height ratio

function initHeroCanvas() {
  let heroTimeline = gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "40% top",
      scrub: 1,
      pin: true,
      // markers: true,
    },
  });

  heroTimeline.to(tube, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    onUpdate: render,
  });

  heroTimeline.to(
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
    start: "10% bottom",
    toggleActions: "play none none reverse",
    pin: false,
    onEnter: () => {
      document.querySelector(".hero .button").classList.add("button--dark")
    },
    onLeaveBack: () => {
      document.querySelector(".hero .button").classList.remove("button--dark")
    }
  },
  css: {
    backgroundColor: "rgba(12,12,12)",
  },
  duration: 0.3,
});

function render() {
  let curImage = images[tube.frame];
  context.clearRect(0, 0, hcanvas.width, hcanvas.height);
  context.drawImage(curImage, 0, 0, hcanvas.width, hcanvas.width / wrh);
}
