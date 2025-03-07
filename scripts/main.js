
// Menu Mobile
function initMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Alterna a visibilidade do menu
            mobileMenu.classList.toggle('hidden');

            // Animação de deslizar para baixo/para cima
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('-translate-y-full');
                mobileMenu.classList.add('translate-y-0');
            } else {
                mobileMenu.classList.remove('translate-y-0');
                mobileMenu.classList.add('-translate-y-full');
            }
        });
    }
}

function setActiveLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('text-orange-500', 'font-bold');
            link.classList.remove('text-blue-900');
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

function initSlider() {
    // Elementos dos Cards
    const cardsContainer = document.getElementById('cardsContainer');
    const cards = document.querySelectorAll('.card');
    const navDots = document.querySelectorAll('[data-index]');

    let activeIndex = 0;

    function updateActiveCard() {
        // Move o container para exibir o card ativo
        const cardWidth = cards[0].offsetWidth;
        cardsContainer.style.transform = `translateX(-${activeIndex * cardWidth}px)`;

        // Atualiza o seletor de pontos
        navDots.forEach((dot, index) => {
            dot.classList.toggle('bg-blue-900', index === activeIndex);
            dot.classList.toggle('bg-gray-300', index !== activeIndex);
        });
    }

    // seletor
    navDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            activeIndex = parseInt(dot.getAttribute('data-index'));
            console.log('Active index:', activeIndex); // Debug
            updateActiveCard();
            stopAutoSlide(); // Pausa o auto slide
        });
    });

    // Troca 
    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            activeIndex = (activeIndex + 1) % cards.length; 
            updateActiveCard();
        }, 3000); // 3 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    updateActiveCard();
    startAutoSlide();
}

// Inicializa o slider e o menu
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initMenu(); 
    setActiveLink(); 
});