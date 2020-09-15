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



