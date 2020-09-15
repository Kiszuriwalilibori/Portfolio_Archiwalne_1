
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

