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
