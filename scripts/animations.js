const observerOptions = {
    threshold: 0.2,
    rootMargin: '50px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

function initAnimations() {
    // Elementos que queremos animar
    const animateElements = document.querySelectorAll('.should-animate');
    animateElements.forEach(element => {
        animationObserver.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', initAnimations);