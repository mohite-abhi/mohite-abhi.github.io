var makeSlideShowScrollable = function () {
  let slideShowWindow = document.querySelector(".slideShow");

  var markScrollNavBar = function (elemNo) {
    // console.log(elemNo);
    document.querySelectorAll(".scrollNavButton").forEach((navBut) => {
      if (navBut.id.split("").pop() - 1 == elemNo) {
        navBut.style.backgroundColor = "#dbdbdb";
      } else {
        navBut.style.backgroundColor = "#a5a5a5";
      }
    });
  };

  (function setScrollButtons() {
    (function setLeftScrollButton() {
      document.querySelector(".leftScrollButton").onclick = function () {
        slideShowWindow.scrollBy(-750, 0);
        markScrollNavBar(
          Math.round(
            (slideShowWindow.scrollLeft / slideShowWindow.clientWidth - 1) % 5
          )
        );
      };
    })();

    (function setRightScrollButton() {
      document.querySelector(".rightScrollButton").onclick = function () {
        slideShowWindow.scrollBy(750, 0);
        markScrollNavBar(
          Math.round(
            (slideShowWindow.scrollLeft / slideShowWindow.clientWidth + 1) % 5
          )
        );
      };
    })();
  })();

  (function periodicScroll() {
    setInterval(() => {
      if (
        slideShowWindow.scrollWidth -
          slideShowWindow.scrollLeft -
          slideShowWindow.clientWidth <
        10
      ) {
        slideShowWindow.scrollTo(0, 0);
      } else {
        slideShowWindow.scrollBy(slideShowWindow.scrollWidth / 5 - 20, 0);
      }
      console.log(Math.round((slideShowWindow.scrollLeft / slideShowWindow.clientWidth + 1) % 5))
      markScrollNavBar(
        Math.round(
          (slideShowWindow.scrollLeft / slideShowWindow.clientWidth) % 5
        )
      );
    }, 5000);
  })();

  (function scrollByNavButton() {
    document.querySelectorAll(".scrollNavButton").forEach((element) => {
      element.onclick = function (elem) {
        let elemNo = parseInt(elem.target.id.split("").pop());
        slideShowWindow.scrollTo(
          (slideShowWindow.scrollWidth / 5) * (elemNo - 1),
          0
        );

        markScrollNavBar(elemNo - 1);
      };
    });
  })();
};



makeSlideShowScrollable();
