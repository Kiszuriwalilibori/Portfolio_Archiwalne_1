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
const { prepareChangeLocation } = require ('./prepareChangeLocation');

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

    const menuItems = document.getElementsByClassName("menu__item");
    Array.prototype.forEach.call(menuItems, (menuItem) =>menuItem.addEventListener("mouseenter", hover.add));
    Array.prototype.forEach.call(menuItems, (menuItem) =>menuItem.addEventListener("mouseleave", hover.remove));
    Array.prototype.forEach.call(menuItems, (menuItem) =>menuItem.addEventListener("touchstart", hover.add));
    Array.prototype.forEach.call(menuItems, (menuItem) =>menuItem.addEventListener("touchend", hover.remove));

    const menuButtons =document.getElementsByClassName("menu__link");
    console.log(menuButtons);

    prepareChangeLocation(menuButtons);


}
}

},{"./prepareChangeLocation":7}],5:[function(require,module,exports){
const { throttle } = require("./throttle");

function isFunction(x) {
  return Object.prototype.toString.call(x) == "[object Function]";
}

function isNode(o) {
  return typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
}

function reportError(err) {
  try {
    if (!err instanceof Error) {
      throw new Error("it is not error object");
    }
    console.error(err.name, "\n", "\n", err.message, "\n", "\n", err.stack);
  } catch (e) {
    console.log(e.message);
  }
}

function getAttributeValue(target, attr) {
  
    const item = document.getElementById(target);
    if(item){
    const style = item.currentStyle || window.getComputedStyle(item);
    return style[attr] ? parseInt(style[attr], 10) : 0;
  } else {
    return 0;
  }
}

module.exports = {
  isNode: isNode,
  reportError: reportError,
  getAttributeValue: getAttributeValue,
  mountClickAndEnterHandler: function mountClickAndEnterHandler(item, fn) {
    try {
      if (!isNode(item)) {
        throw new Error("item is not a node");
      }
      if (!isFunction(fn)) {
        throw new Error("fn is not a function");
      }
      if (!item || !document.body.contains(item)) {
        throw new Error("item is not a HTML node within document body");
      }
      item.addEventListener("click", fn);
      item.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          fn(event);
        }
      });

      if (item.toUpperCase !== "BUTTON" && !item.hasAttribute("tabindex")) {
        item.setAttribute("tabindex", "0");
      }
    } catch (err) {
      reportError(err);
    }
  },
  throttled: function throttled(fn, delay) {
    return typeof throttle !== "undefined" ? throttle(fn, delay) : throttle;
  },
};

},{"./throttle":9}],6:[function(require,module,exports){
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




},{"./hideLoader.js":1,"./initiateEmailService.js":2,"./initiateHamburgerMenuFunctionality":3,"./initiateMenuFunctionality":4,"./prepareSideBox":8}],7:[function(require,module,exports){
const { mountClickAndEnterHandler, throttled, reportError } = require("./lib");
module.exports = {
  prepareChangeLocation: function prepareChangeLocation(buttons) {
    function changeLocation(ev) {
      try {
        if (!ev.currentTarget.dataset.target) {
          throw new Error("event location has not valid dataset");
        }
        const intro = document.getElementById("menu");
        window.location.hash = "";
        window.location.hash = ev.currentTarget.dataset.target;
        window.scrollBy(0, -intro.clientHeight);
      } catch (err) {
        reportError(err);
      }
    }

    Array.prototype.forEach.call(buttons, (button) => mountClickAndEnterHandler(button, throttled(changeLocation, 300)));
  },
};

},{"./lib":5}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
module.exports = {
  throttle: function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments);
      isThrottled = true;

      setTimeout(function () {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
    return wrapper;
  },
};

},{}]},{},[6]);
