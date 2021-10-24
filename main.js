const º = jQuery;
const config = {
    dev: (document.location.origin == 'http://127.0.0.1:5500'),
    avatar: 'https://avatars.githubusercontent.com/u/8226118?v=4',
    name: 'Scott Howell',
    query: "You're going to give me an A on this, right?",
    enough: 2,
    countDown: 30,
    projectRowsCount: 3,
    ipsum: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. '
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

const projectElements = 
    `<tr><td><div class="project"><a href="#"><img class="projectImg" alt="placeholder" src="https://via.placeholder.com/525x315"> 
    </a><br><p class="centered">${config.ipsum}</p></div></td><td><div class="project"><a href="#">
    <img class="projectImg" alt="placeholder" src="https://via.placeholder.com/525x315"></a><br><p class="centered">${config.ipsum}</p>
    </div></td></tr>`

const featureProjectElement = 
    `<div class="project feature"><a href="https://cyanidethejuggla.github.io/Horiseon-refactor/Horiseon/">
    <img class="featureImage" src="https://via.placeholder.com/1100x400?text=Horiseon%20Placeholder" alt="placeholder">
    </a><div class="row"><p class="centered">Accessible codebase for marketing company</p></div></div>`

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
    
    º('.popupContainer').css('display', 'flex');
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
            (countDownTimer >= 1) ? 2 : 1) } seconds`);
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
    for (let i = 0; i < config.projectRowsCount; i++) {
        º('#projects').append( (i == 0) ? featureProjectElement : projectElements);
    }
    º('#decline').click(()=>{
        dismissAlert();
        if(enough != config.enough){
            enough++;
            resetCountDown();
            ñ();
        }
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