const º = jQuery;
const config = {
    dev: (document.location.origin.includes('127.0.0.1')),
    avatar: 'https://avatars.githubusercontent.com/u/8226118?v=4',
    name: 'Scott Howell',
    query: "You're going to give me an A on this, right?",
    enough: 2,
    countDown: 30,
    projectRowsCount: 3,
    projects: [
        {
            isProject: true,
            title: `Hangman's Revenge`,
            img: {
                src: './assets/img/hangmanScreenshot.PNG',
                alt: `Hangman's Revenge Title Screen`
            },
            discription: 'A word game for the quick witted and thick skinned.',
            cssClass: false,
            link: 'https://cyanidethejuggla.github.io/hangmans-revenge/',
            github: 'https://github.com/CyanideTheJuggla/hangmans-revenge'
        },
        {    
            isProject: true,
            title: `Spottr`,  
            img: {        
                src: './assets/img/spottr.PNG',  
                alt: `Spottr Home Page`    
            },   
            discription: 'Social Network for Exercise Enthusiasts',  
            cssClass: false,  
            link: 'https://spottr-projecttwo.herokuapp.com/',
            github: 'https://github.com/Rush0218/spottr'
        },
    ],
    ipsum: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. '
};


/*
{    isProject: true,    title: ``,    img: {        src: '',        alt: ``    },    discription: '',    cssClass: '',    link: ''},
*/

let enough = 0;
const milliToSecond = 1000;
let countDownTimer = config.countDown;

let counter;
let carousel;
let alertId;

const contactElement = 
    `<a href="https://www.linkedin.com/in/howell-cscott/">` +
    `<img src="https://cdn-icons-png.flaticon.com/128/124/124011.png" style="height: 60px;" />` +
    `</a><a href="https://github.com/CyanideTheJuggla">` +
    `<img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" style="height: 60px;">` +
    `</a><a href="mailTo:howell.cscott@gmail.com">` +
    `<img src="https://cdn-icons-png.flaticon.com/128/732/732200.png" style="height: 60px;"></a>`;


const projectElementStrings = [
    `<td><div class="project"><a href="#"><img class="projectImg" alt="placeholder" src="https://via.placeholder.com/525x315"></a>` +
    `<br><p class="centered title"> Lorem Ipsum </p><p class="centered">${config.ipsum}</p></div></td></tr>`
    ,
    `<tr><td><div class="project"><a href="#"><img class="projectImg" alt="placeholder" src="https://via.placeholder.com/525x315"> ` +
    `</a><br><p class="centered title"> Lorem Ipsum </p><p class="centered">${config.ipsum}</p></div></td>` +
    `<td><div class="project"><a href="#"><img class="projectImg" alt="placeholder" src="https://via.placeholder.com/525x315"></a>` +
    `<br><p class="centered title"> Lorem Ipsum </p><p class="centered">${config.ipsum}</p></div></td></tr>`
];

const featureProjectElement = 
    `<div class="project feature"><a href="https://cyanidethejuggla.github.io/hangmans-revenge/"><img class="featureImage" src="./assets/img/hangmanScreenshot.PNG" ` + 
    ` alt="placeholder"></a><div class="row lh-none"><p class="centered featureText title "> Hangman's Revenge </p><p class="centered featureText caption "> ` +
    `A word game for the quick witted and thick skinned. </p></div></div>`;

function projectElements(proj) {
    if(proj.isProject){
        const {title, img, discription, cssClass, link} = proj;
        
        const retVal = `<tr>` +
            `<td>` +
                `<div class="project${cssClass ? ' ' + cssClass : '' }">` +
                    `<a href="#${link}">` +
                        `<img class="projectImg" alt="${img.alt}" src="${img.src}"> ` +
                    `</a><br>` +
                    `<p class="centered"> ${title} </p>`+
                    `<p class="centered">${discription}</p>` +
                `</div>` +
            `</td>`;
        return retVal;
    } else {
        return projectElementStrings[1];
    }
}

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
};

const resetCountDown = () => {
    countDownTimer = config.countDown;
};

const popupAlert = () =>{
    
    º('.popupContainer').css('display', 'flex');
    º('.popupHeader').html('Attention!');
    º('.popupContent').html(config.query);
    º('.popupContainer').animate({opacity: 1}, 500);
};

const dismissAlert = () => {
    º('.popupContainer').animate({opacity: 0}, 500);
};

const setTimerText = () => {
    º('.countDown').text(`${countDownTimer.toPrecision(
        (countDownTimer >= 10) ? 3 : 
            (countDownTimer >= 1) ? 2 : 1) } seconds`);
};

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

const hangmanAlt = () => {
    ////console.log('Firing hangmanAlt');
    const featureImageSelect = º('.featureImage');
    const featureLink = º('.project.feature a');
    const featureTitle = º('.featureText.title');
    const featureCaption = º('.centered.featureText.caption');
    
    º('.project.feature').children().animate({left: '150vw'}, 840);
    setTimeout(()=>{
        º('.project.feature').children().css('left', '-150vw');
        const titleText = featureTitle.html();

        if(!titleText.includes('Alternative')){
            featureImageSelect.attr('src', './assets/img/hangmanScreenshotAlt.PNG');
            featureLink.attr('href', 'https://cyanidethejuggla.github.io/hangmans-revenge-alt/');
            featureTitle.html(`Hangman's Revenge Alternative`);
            featureCaption.html(`An alternative word game for the quick witted and thick skinned.`);
            
        } else {
            featureImageSelect.attr('src', './assets/img/hangmanScreenshot.PNG');
            featureLink.attr('href', 'https://cyanidethejuggla.github.io/hangmans-revenge/');
            featureTitle.html(`Hangman's Revenge`);
            featureCaption.html(`A word game for the quick witted and thick skinned.`);
        }
        setTimeout(()=>{
            º('.project.feature').children().animate({left: 0}, 850);
        }, 10);
    }, 850);
};

const stopCarousel = () => {
    if(carousel) { clearInterval(carousel); carousel = undefined; }
    else carousel = setInterval(hangmanAlt, 15000);
}

º(window).resize(() => {
    resolutionDisplay();
});

window.onload = () => {
    //console.log('window.onload()');
};

º(document).ready(()=>{
    //console.log('º(document).ready()');
    //console.log('config', config);
    º('#projects').append(featureProjectElement);
    for (let i = config.projects.length - 1; i > 0 ; i--) {
        const project = config.projects[i];
        º('#projects').append(projectElements(project));
    }
    
    if (((config.projects.length - 1) % 2) != 0) º('#projects').children()[1].innerHTML += projectElementStrings[0];
    for (let i = 0; i < (config.projectRowsCount - config.projects.length); i++) {
        º('#projects').append(projectElements({isProject: false}));
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
    //º('.project.feature').children().css('position', 'relative');
    //º('.project.feature a').click(stopCarousel)
    //carousel = setInterval(hangmanAlt, 15000);
}); 