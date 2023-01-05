console.clear();

const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");
const hash = "1EldeuKR_zW0oalo8ZDRdA";
const frameName = "hero-frame"

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const frameCount = 70;
const currentFrame = index => (
  `https://imagedelivery.net/${hash}/${frameName}-${index}/public`
);

const images = []
const airpods = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  console.log(currentFrame(i));
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(airpods, {
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
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
  let curImage = images[airpods.frame];
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(curImage, canvas.width/2-images[airpods.frame].width/4, canvas.height/2-images[airpods.frame].height/4,images[airpods.frame].width/2,images[airpods.frame].height/2); 
}
