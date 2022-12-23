const rewardData = [
  {
    count: 1,
    reward: null,
    message: "buy one more to get free shipping!!!",
  },
  {
    count: 2,
    reward: "Free Shipping",
    message: "Add one more pack and get 20% off your entire order!",
  },
  {
    count: 3,
    reward: "20% off",
    message:
      "20% offs not bad... but add three more and get 30% off your entire order!",
  },
  {
    count: 4,
    reward: null,
    message: "add TWO more packs for a discount that's 2 good! ",
  },
  {
    count: 5,
    reward: null,
    message: "One more pack until you get 30% off! (and 100% faster energy)",
  },
  {
    count: 6,
    reward: "30% off",
    message:
      "Congrats on the big discounts moves! (did you know... you can subscribe and recieve an additional 60% off your first order!)",
  },
];

class PzazRewardBar extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector(".reward-bar__slider");
    this.icon = this.querySelector(".reward-bar__icon");
    console.log("pzaz-reward-bar loaded");
    this.initRewardBar();
  }

  initRewardBar() {
    this.baseLevel = document.querySelector("pzaz-cart").cartCount;
    console.log("base level", this.baseLevel);
    if (this.baseLevel > 0) {
      this.setSlider(this.baseLevel);
    }
  }

  updateRewardBar(projected = 0) {
    console.log("project quantity", projected);
    const newLevel = this.baseLevel + parseInt(projected);
    this.setSlider(newLevel);
  }

  setSlider(level = 0) {
    console.log(level);

    const data = rewardData.filter((reward) => {
      return reward.count == level;
    });
    console.log(data);
    if (data[0].message) {
      document.querySelector(".reward-message").innerHTML = data[0].message;
      gsap.from(".reward-message", {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }

    const newSliderWidth = `${level > 6 ? 100 : (100 / 6) * level}%`;
    this.slider.style.width = newSliderWidth;
    this.icon.style.left = newSliderWidth;

    gsap.from(".reward-bar__icon svg", {
      scale: 2,
      rotation: "180deg",
      duration: 2,
      ease: "elastic.out(1, 0.3)",
    });
  }
}

customElements.define("pzaz-reward-bar", PzazRewardBar);
