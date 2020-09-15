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
