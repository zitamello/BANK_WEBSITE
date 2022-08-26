'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
});

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');


document.getElementsByClassName('btn');

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = 
`Usamos os cookies do navegador para uma usabilidade mais rápida e fácil. 
<button class="btn btn--close-cookies"> Entendi! </button>`;

header.append(message);

document.querySelector('.btn--close-cookies').addEventListener('click', function() {
    message.remove();
})

message.style.backgroundColor = '#37383d';
message.style.width = '105%';
message.style.height  = Number.parseFloat(getComputedStyle(message).height, 10) + 35 + 'px';

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1'); 

btnScroll.addEventListener('click', function(e) {
    const s1coords = section1.getBoundingClientRect();


    //old way 
    //scrolling to 
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });

    section1.scrollIntoView({behavior: 'smooth'});
})

//PAGE NAVIGATION

//1 add event listener to parent element 

document.querySelector('.nav__links').addEventListener('click', function(e){
    e.preventDefault();
    //matching strategy 
    ////determine which element originated from 
    
    //all targets with nav__link will have the feature below: 
    if(e.target.classList.contains('nav__link')){
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
})

const h1 = document.querySelector('h1');
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'black';

//building tabbing components

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const operationsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab');
    //guard close
    if (!clicked) return;

    //active tabs
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    operationsContent.forEach(content => content.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');

    //Activate content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

//MENU FADE ANIMATION

const nav = document.querySelector('.nav');

const handlerOverFunction = function(e, opacity){
    if(e.target.classList.contains('nav__link')){
        const overed = e.target;
        const sibling = overed.closest('.nav').querySelectorAll('.nav__link');
        const logo  = overed.closest('.nav').querySelector('img');
        const brand = overed.closest('.nav').querySelector('h2');
        

        sibling.forEach(el => {
            if(el !== overed) el.style.opacity = this;
        });
        logo.style.opacity = this;
        brand.style.opacity = this;

    }
}

//USING BIND to pass arguements to event handlers
nav.addEventListener('mouseover', handlerOverFunction.bind(0.5));

nav.addEventListener('mouseout', handlerOverFunction.bind(1.0));

//sticky navigation 
const navHeight = nav.getBoundingClientRect().height;

const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
};

const mainHeader = document.querySelector('.header');
const stickyNavBar = function(entries){
    const [entry] = entries;

    if (!entry.isIntersecting){
        nav.classList.add('sticky');
    }else {
        nav.classList.remove('sticky');
    }
};

const headerObserver = new IntersectionObserver(stickyNavBar, observerOptions);
headerObserver.observe(header);

//lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImage = function(entries, observer){
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    //replace the source attribute with the data src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
};

const imgOptions = {
    root: null,
    threshold: 0
}

const imgObserver = new IntersectionObserver(loadImage, imgOptions);

imgTargets.forEach(img =>imgObserver.observe(img));

//slider 

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;
const maxSlide = slides.length;

//s for slide, i for index
const goToSlide = function(slide){
    slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};

goToSlide(0);

const prevSlide = function(){
    if(currentSlide === 0) {
        currentSlide = maxSlide - 1;
    }else{
    currentSlide--;
    }
    
    goToSlide(currentSlide);
}


const nextSlide = function(){
    if(currentSlide === maxSlide - 1) {
        currentSlide = 0;
    }else{
    currentSlide++;
    }
    
    goToSlide(currentSlide);
}

//to the next slide
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);