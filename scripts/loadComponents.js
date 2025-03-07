function loadComponent(componentId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o componente: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            // Insere o conteúdo do componente no DOM
            document.getElementById(componentId).innerHTML = data;

            // Inicializa o slider após carregar o componente horizontalScroll
            if (componentId === 'horizontalScroll') {
                initSlider();
            }
        })
        .catch(error => {
            console.error(error);
        });
}

window.onload = function() {
    loadComponent('navigation', './components/navigation.html');
    loadComponent('banner', './components/banner.html');
    loadComponent('horizontalScroll', './components/horizontalScroll.html');
    loadComponent('sobre', './components/sobre.html');
    loadComponent('footer', './components/footer.html');
};