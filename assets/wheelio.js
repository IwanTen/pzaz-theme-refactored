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
  document.getElementById("wlo-trigger-image").setAttribute("style", "background-size: 150px !important;");
  document.getElementById("wlo-trigger-button").setAttribute("style", "width: 150px !important; height: 150px !important;");
  footerContainer.appendChild(button);
}

function removeWheelio() {
  const button = document.querySelector(wheelio);
  button.setAttribute(
    "style",
    `position:fixed; top:""; left:""; display:""; transform: "";`
  );
  document.getElementById("wlo-trigger-image").setAttribute("style", "background-size:''");
  document.getElementById("wlo-trigger-button").setAttribute("style", "width: ''; height: '';");
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
