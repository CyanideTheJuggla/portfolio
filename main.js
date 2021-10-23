const º = jQuery;
const config = {
    dev: document.location.origin == 'http://127.0.0.1:5500',
    avatar: 'https://avatars.githubusercontent.com/u/8226118?v=4',
    name: 'Scott Howell',
    query: "You're going to give me an A on this, right?",
    enough: 5,
    countDown: 15,
    projectCount: 5
};
let enough = 0;
const milliToSecond = 1000;
let countDownTimer = config.countDown;

let counter;
let alertId;

const contactElement = 
    `<a href="https://www.linkedin.com/in/howell-cscott/">
    <img src="https://cdn-icons-png.flaticon.com/128/124/124011.png" style="height: 60px;" />
    </a><a href="https://github.com/CyanideTheJuggla">
    <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" style="height: 60px;">
    </a><a href="mailTo:howell.cscott@gmail.com">
    <img src="https://cdn-icons-png.flaticon.com/128/732/732200.png" style="height: 60px;"></a>`;

const leftProjectElement = 
    `<div class="project"><div class="row"><p class="cell">Lorem ipsum dolor sit, amet consectetur 
    adipisicing elit. Amet itaque totam quaerat, vero eaque laudantium tempora molestias deserunt 
    minus perspiciatis cupiditate earum aliquam culpa dolor provident ratione. Optio, autem sed?
    </p><div class="placeholderImage noTouchy cell"></div></div></div>`;

const rightProjectElement = 
    `<div class="project" ><div class="row"><div class="placeholderImage noTouchy cell"></div><p class="cell">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet itaque totam quaerat, vero eaque laudantium tempora
    molestias deserunt minus perspiciatis cupiditate earum aliquam culpa dolor provident ratione. Optio, autem sed?
    </p></div></div>`;

const resolutionDisplay = () => {
    const target = º(window);
    º('.resolutionDisplay').text(target.innerHeight().toString() + ' x ' + target.innerWidth().toString());
};

const setAvatarImage = () => {
    const target = º('.header');
    target.append(`<img src="${config.avatar}" class="avatarImage" />`);
    target.prepend(`<h1>Scott Howell</h1>`);
}; 
const setContactInfo = () => {
    const target = º('#contact');
    target.html(contactElement);
}
const resetCountDown = () => {
    countDownTimer = config.countDown;
};

const popupAlert = () =>{
    º('.popupHeader').html('Attention!');
    º('.popupContent').html(config.query);
    º('.popupContainer').animate({opacity: 1}, 500);
}
const dismissAlert = () => {
    º('.popupContainer').animate({opacity: 0}, 500);
}
const setTimerText = () => {
    º('.countDown').text(`${countDownTimer.toPrecision(
        (countDownTimer >= 10) ? 3 : 
            (countDownTimer >= 1) ? 2 : 1) 
        } seconds`);
}
const ñ = function () { 
    setTimerText();
    countDownTimer = Math.fround(countDownTimer);
    counter = setInterval(()=>{
        countDownTimer = countDownTimer - 0.10;
        if(countDownTimer.toPrecision(3) < 0.05) {
            countDownTimer = 0.0;
            clearInterval(counter);
            counter = null;
            popupAlert(); 
        } 
        setTimerText();
        /*console.log('countDownTimer', Math.fround(countDownTimer).toPrecision(
                (countDownTimer >= 10) ? 3 : 
                    (countDownTimer >= 1) ? 2 : 1)
            );*/
    }, 100);
};

const buildHeader = () => {
    setAvatarImage();
    setContactInfo();
};

º(window).resize(() => {
    resolutionDisplay();
});

window.onload = () => {
    console.log('window.onload()');
};


º(document).ready(()=>{
    console.log('º(document).ready()');
    for (let i = 0; i < config.projectCount; i++) {
        º('#projects').append(((i % 2 ) == 1) ? leftProjectElement : rightProjectElement);
    }
    º('#decline').click(()=>{
        dismissAlert();
        resetCountDown();
        ñ();
    });
    º('#accept').click(()=>{
        dismissAlert();
        enough = config.enough;
        clearInterval(counter);
    });
    buildHeader();
    resolutionDisplay();
    if(!config.dev) ñ();
    º("a:not(nav li a)").attr('target', '_blank');
}); 