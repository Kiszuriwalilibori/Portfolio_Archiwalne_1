$( document ).ready(function() {

  var startHoverOnMenu =(function(){
    const hover = {
      add:(e)=>{e.target.classList.add("menu__item--hover")},
      remove:(e)=>{e.target.classList.remove("menu__item--hover")}
    }    

    const x = [...document.getElementsByClassName('menu__item')];

    x.forEach(element => {element.addEventListener('mouseenter', hover.add)});
    x.forEach(element => {element.addEventListener('mouseleave', hover.remove)});
    x.forEach(element => {element.addEventListener('touchstart', hover.add)});
    x.forEach(element => {element.addEventListener('touchend', hover.remove)});
  })();


var startHamburgerMenu = (function(){

  var menu = (function(){
  var isHidden = true;
    return {
        isHidden:function(){return isHidden;},
        toggle:function(){isHidden = !isHidden}
    }

  })();

  function toggleClassMenu(){

    if (menu.isHidden()){TweenMax.to(".menu", 1, {xPercent:100, ease: Power2.easeInOut, onComplete: menu.toggle});}
    else {TweenMax.to(".menu", 1, {xPercent: -100, ease: Power2.easeInOut, onComplete: menu.toggle});}
  }

$('.hamburger').on('click', toggleClassMenu)
 
})();

})





let form = document.getElementById('contact-form');

form.addEventListener('submit', function(e){

  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const content = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
  function resetInputFields() {
      name.value = '';
      message.value = '';
      email.value = '';
    }

	fetch('https://www.enformed.io/9kibv8hh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(content)
  })
    .then(response => response.json())
    .then(data => handleResult(true))
    .catch(error => handleResult(false));


function handleResult(alert) {

  let result = {
    text: alert ? 'Wysłano' : 'Błąd połączenia',
    style: alert ? 'successStyle' : 'failureStyle'
  }

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
  }

}

});