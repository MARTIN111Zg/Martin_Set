const Barba = require("./barba");
const anime = require("animejs/lib/anime.min.js");

window.onload = () => {
  Barba.Pjax.start();
  Barba.Prefetch.init();
};

var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(
      this.fadeIn.bind(this)
    );
  },

  fadeOut: function() {
    var transitionPrromise = new Promise(function(resolve) {
      const morph = anime
        .timeline({
          loop: false,

          easing: "linear"
        })
        .add({
          targets: ".a",
          d: [
            {
              value:
                "M0,16 C47,445 112,659 195,659 C327,659 238,135 505,135 C698,135 596,515 728,515 C859,515 780,221 900,221 C1011,221 925,801 1077,801 C1182,801 1223,541 1200,21 L1200,0 L0,0 L0,16 Z"
            },

            {
              value:
                "M0,920 C47,920 112,920 195,920 C327,920 401,920 505,920 C605,920 638,920 728,920 C818,920 844,920 900,920 C960,920 1001,920 1077,920 C1138,920 1178,920 1200,920 L1200,0 L0,0 L0,920 Z"
            }
          ],
          duration: 1000,
          complete: function() {
            let textval = document.querySelector(".text");
            textval.style.display = "flex";
            let list = document.getElementsByClassName("barba-container")[1];
            let atrset = list.getAttribute("data-name");
            textval.textContent = atrset;
          }
        })

        .add({
          targets: ".text",
          opacity: [0.3, 1],

          translateY: [-50, 0],
          deley: 500,
          duration: 700
        })
        .add({
          targets: ".text ",

          duration: 700,
          complete: function() {
            resolve();

            document.querySelector(".text").style.display = "none";
            document.querySelector(".text").innerHTML = "";
            console.log("resolved");
          }
        })

        .add({
          targets: ".a",
          d: [
            {
              value:
                "M0,16 C47,445 112,659 195,659 C327,659 238,135 505,135 C698,135 596,515 728,515 C859,515 780,221 900,221 C1011,221 925,801 1077,801 C1182,801 1223,541 1200,21 L1200,0 L0,0 L0,16 Z"
            },
            {
              value:
                "M0,0 C46,0 112,0 195,0 C327,0 401,0 505,0 C605,0 638,0 728,0 C818,0 844,0 900.3125,0 C960,0 1001,0 1077,0 C1138,0 1178,0 1200,0 L1200,0 L0,0 L0,0 Z"
            }
          ],
          durtion: 1000,
          autoplay: true
        });
    });
    return transitionPrromise;
  },

  fadeIn: function() {
    console.log("new container added");
    let newWrap = this.newContainer;
    let oldWrap = this.oldContainer;

    let _that = this;
    newWrap.style.visibility = "visible";
    oldWrap.style.display = "none";
    _that.done();
    console.log("All finished");
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  return FadeTransition;
};
