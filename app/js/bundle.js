(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
    hideLoader: function hideLoader() {

        $("nav").css({
            display: "flex"
        });
        $("footer").css({
            display: "flex"
        });
        $("#loader-wrapper").remove();
    }
}
},{}],2:[function(require,module,exports){
module.exports = {
  initiateEmailService: function initiateEmailService() {
    let form = document.getElementById("contact-form");
    let submitButton = document.getElementById("submit_button");

    function toggleSubmitButtonDisable() {
      submitButton.disabled = !submitButton.disabled;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      toggleSubmitButtonDisable();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      const content = {
        name: name.value,
        email: email.value,
        message: message.value,
      };

      function resetInputFields() {
        name.value = "";
        message.value = "";
        email.value = "";
      }

      fetch("https://www.enformed.io/9kibv8hh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(content),
      })
        .then((response) => response.json())
        .then((data) => handleResult(true))
        .catch((error) => handleResult(false));

      function handleResult(alert) {
        let result = {
          text: alert ? "Wysłano" : "Błąd połączenia",
          style: alert ? "successStyle" : "failureStyle",
        };

        setMessage();
        setTimeout(function () {
          removeMessage();
        }, 3000);

        function setMessage() {
          const el = document.createElement("div");
          el.id = "sentSuccess";
          el.innerText = result.text;
          el.classList.add(result.style);
          const parent = document.getElementById("status_message");
          parent.appendChild(el);
        }

        function removeMessage() {
          const parent = document.getElementById("status_message");
          const child = document.getElementById("sentSuccess");
          parent.removeChild(child);
          resetInputFields();
          toggleSubmitButtonDisable();
        }
      }
    });
  },
};

},{}],3:[function(require,module,exports){

module.exports = {
    initiateHamburgerMenuFunctionality: function initiateHamburgerMenuFunctionality(){
            var menu = (function () {
              var isHidden = true;
              return {
                isHidden: function () {
                  return isHidden;
                },
                toggle: function () {
                  isHidden = !isHidden;
                },
              };
            })();
        
            function toggleClassMenu() {
        
              menu.isHidden()
                ? TweenMax.to(".menu", 1, { xPercent: 100, ease: Power2.easeInOut, onComplete: menu.toggle })
                : TweenMax.to(".menu", 1, { xPercent: -100, ease: Power2.easeInOut, onComplete: menu.toggle });
            }
        
            $(".hamburger").on("click", toggleClassMenu);
          }





    }


},{}],4:[function(require,module,exports){
module.exports = {
  initiateMenuFunctionality: function initiateMenuFunctionality() {

    const hover = {
      add: (e) => {
        e.target.classList.add("menu__item--hover");
      },
      remove: (e) => {
        e.target.classList.remove("menu__item--hover");
      },
    };

    const buttons = document.getElementsByClassName("menu__item");
    Array.prototype.forEach.call(buttons, (button) =>button.addEventListener("mouseenter", hover.add));
    Array.prototype.forEach.call(buttons, (button) =>button.addEventListener("mouseleave", hover.remove));
    Array.prototype.forEach.call(buttons, (button) =>button.addEventListener("touchstart", hover.add));
    Array.prototype.forEach.call(buttons, (button) =>button.addEventListener("touchend", hover.remove));

}
}

},{}],5:[function(require,module,exports){
const { hideLoader } = require("./hideLoader.js");
const { initiateEmailService } = require("./initiateEmailService.js");
const { initiateHamburgerMenuFunctionality } = require ('./initiateHamburgerMenuFunctionality');
const { initiateMenuFunctionality } = require ('./initiateMenuFunctionality');
const { prepareSideBox} = require ('./prepareSideBox');


window.onload = function () {
    hideLoader()
    initiateMenuFunctionality();
    initiateHamburgerMenuFunctionality();
    initiateEmailService();
    prepareSideBox("draggable", 'fancy');
}




},{"./hideLoader.js":1,"./initiateEmailService.js":2,"./initiateHamburgerMenuFunctionality":3,"./initiateMenuFunctionality":4,"./prepareSideBox":6}],6:[function(require,module,exports){
module.exports = {
  prepareSideBox: function prepareSideBox(element, className) {
    if (window.innerWidth < 401) {
      const project__descriptions = [...document.getElementsByClassName("project__comment")];
      project__descriptions.forEach((item) => item.classList.add("draggable"));
    }
    var numSteps = 1000;
    var boxElement = [...document.getElementsByClassName(element)];
    createObserver();

    function createObserver() {
      var observer;
      var options = {
        root: null,
        rootMargin: "100px 100px 100px 100px",
        threshold: buildThresholdList(),
      };

      observer = new IntersectionObserver(handleIntersect, options);
      boxElement.forEach((item) => observer.observe(item));
    }

    function buildThresholdList() {
      var thresholds = [];

      for (var i = 1.0; i <= numSteps; i++) {
        var ratio = i / numSteps;
        thresholds.push(ratio);
      }

      thresholds.push(0);
      return thresholds;
    }

    function handleIntersect(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add(className);
        } else {
          entry.target.classList.remove(className);
        }
      });
    }
  },
};

},{}]},{},[5]);
