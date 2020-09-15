const { throttle } = require("./throttle");


function isFunction(x) {
  return Object.prototype.toString.call(x) == "[object Function]";
}

function isNode(o) {
  return typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
}

function reportError(err){
  try{
    if (!err instanceof Error ){throw new Error("it is not error object")}
    console.error(err.name,'\n','\n',err.message,'\n','\n', err.stack);
  }
  catch(e){console.log(e.message)}

}
module.exports = {
  isNode: isNode,
  reportError: reportError,
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

      if (item.toUpperCase !=="BUTTON" &&(!item.hasAttribute("tabindex"))){item.setAttribute('tabindex','0')}

    } catch (err) {
      reportError(err);
    }
  },
  throttled: function throttled(fn, delay){return typeof throttle !== "undefined" ? throttle(fn, delay) : throttle;}
};
