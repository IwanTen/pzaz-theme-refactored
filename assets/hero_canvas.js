console.clear();

const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");
const hash = "1EldeuKR_zW0oalo8ZDRdA";
const frameName = "hero-frame";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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

// images.forEach((image) => {
//   let wrh = image.width / image.height;
//   console.log(image.width, image.height);
//   console.log("wrh", wrh);
//   newWidth = canvas.width;
//   newHeight = newWidth / wrh;
//   if (newHeight > canvas.height) {
//     newHeight = canvas.height;
//     newWidth = newHeight * wrh;
//   }
//   console.log(newWidth, newHeight);
//   image.width = newWidth;
//   image.height = newHeight;
// });

gsap.to(tube, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    trigger: ".hero",
    start: "top top",
    end: "40% top",
    scrub: 1,
    pin: true,
  },
  onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
  let curImage = images[tube.frame];
  let wrh = curImage.width / curImage.height;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    curImage,
    0,
    canvas.height / 2 - images[tube.frame].height / 4,
    canvas.width,
    canvas.width / wrh
  );
}

// context.drawImage(
//   curImage,
//   canvas.width / 2 - images[tube.frame].width / 4,
//   canvas.height / 2 - images[tube.frame].height / 4,
//   images[tube.frame].width / 2,
//   images[tube.frame].height / 2
// );
