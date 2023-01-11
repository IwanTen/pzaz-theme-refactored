const wheelio = ".trigger-button-holder";
const footerContainer = document.querySelector(".footer-button-wrapper");

waitForElm(".trigger-button-holder").then((elm) => {
  //   console.log("wheelio loaded");
  initWheelioButton();
});

function initWheelioButton() {
  ScrollTrigger.create({
    trigger: "footer",
    start: "top bottom",
    // markers: { startColor: "white", endColor: "white" },
    onEnter: addWheelio,
    onLeaveBack: removeWheelio,
  });
}

function addWheelio() {
  const button = document.querySelector(wheelio);
  button.setAttribute(
    "style",
    "position:absolute; top:0 !important; left:50% !important; display:block; transform:translate(-50%,0)"
  );
  footerContainer.appendChild(button);
}

function removeWheelio() {
  const button = document.querySelector(wheelio);
  button.setAttribute(
    "style",
    `position:fixed; top:inherit; left:inherit; display:"" transform:inherit;`
  );
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
