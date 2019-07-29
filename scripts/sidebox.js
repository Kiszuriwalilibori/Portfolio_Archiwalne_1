
//bierze element o identyfikatorze element i nadaje  mu klasę className. IIFE, parametry przekazywane na końcu

(function x ( element, className) {var numSteps = 1000;
var boxElement;


window.addEventListener("load", function(event) {
  boxElement = document.querySelector(element);

  createObserver();
}, false);





function createObserver() {
    var observer;
  
    var options = {
      root: null,
    
     rootMargin: '100px 100px 100px 100px',
     
    
     
      threshold: buildThresholdList()
     
    };
  
    observer = new IntersectionObserver(handleIntersect, options);
    
    
    observer.observe(boxElement);
  }


  function buildThresholdList() {
    var thresholds = [];
  
    for (var i=1.0; i<=numSteps; i++) {
      var ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }


  function handleIntersect ( entries, observer) {
    entries.forEach(function(entry) {
      if (entry.intersectionRatio > 0) {
       
      entry.target.classList.add(className);
      } else {
       entry.target.classList.remove(className);
       
      }
    
    }
 
  ); 
  }
}('#draggable','fancy'));

