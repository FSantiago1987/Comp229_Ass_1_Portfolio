/* 
    app.js
    Made by Fabio Luiz
    Student # 301077364
    2020, Oct 08
 */



(function(){

    function Start()
    {
        console.log("App Started...");

        let deleteBtn = document.querySelectorAll('.btn-danger');

        for(button of deleteBtn)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/book-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();

// Typing Animation
var TxtType = function(el, toRotate, period){
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function(){
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    let that = this;
    let delta = 200 - Math.random() * 100;

    if(this.isDeleting) {delta /= 2;}
    if(!this.isDeleting && this.txt === fullTxt){
        delta = this.period;
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
        this.el.innerHTML = '<span class="wrap">'+'<br>'+'</span>';
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function(){
        that.tick();
    }, delta);
};

// Function Onload 
window.onload = function(){
    let elements = document.getElementsByClassName('typewrite');
    for(var i = 0; i<elements.length; i++){
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if(toRotate){
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    //Inject CSS
    let css = document.createElement("style");
    css = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #C12D2D}";
    document.body.appendChild(css);
}