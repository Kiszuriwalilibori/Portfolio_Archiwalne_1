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
