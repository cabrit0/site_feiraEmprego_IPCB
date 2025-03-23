document.addEventListener('DOMContentLoaded', () => {
    // Observer para animações de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observar todos os eventos
    document.querySelectorAll('.animate-event').forEach((event, index) => {
        event.style.animationPlayState = 'paused';
        event.style.setProperty('--delay', index);
        observer.observe(event);
    });

    // Adicionar linha do tempo conectora
    const timelineContainer = document.querySelector('.max-w-3xl');
    const connector = document.createElement('div');
    connector.className = 'timeline-connector';
    timelineContainer.style.position = 'relative';
    timelineContainer.appendChild(connector);

    // Adicionar classe para rotação de ícones
    document.querySelectorAll('.fas').forEach(icon => {
        icon.classList.add('icon-rotate');
    });

    // Adicionar efeito de highlight ao horário
    document.querySelectorAll('.text-xl').forEach(title => {
        const time = title.textContent.split('-')[0].trim();
        title.innerHTML = `<span class="text-blue-500">${time}</span> - ${title.textContent.split('-')[1]}`;
    });
});