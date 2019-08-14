
window.onload =function() {

    if (window.innerWidth < 401) {
        this.console.log(window.innerWidth);
        const project__descriptions = [...document.getElementsByClassName('project__comment')];
        this.console.log(project__descriptions);
        project__descriptions.forEach(item => item.classList.add('draggable'));
    }

    
    $('nav').css({display:'flex'});
    $('footer').css({display:'flex'});
    
    const x = document.getElementById('loader-wrapper');
    x.remove();
    
    };
    