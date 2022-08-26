
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
    threshold: 0,
    rootMargin: `64px`
}

const imgObserver = new IntersectionObserver(loadImage, imgOptions);

imgTargets.forEach(img =>imgObserver.observe(img));