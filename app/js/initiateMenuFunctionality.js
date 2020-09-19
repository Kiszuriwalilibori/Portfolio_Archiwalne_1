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
