// scripts/loadComponents.js
function loadComponent(componentId, filePath) {
    //console.log(`Carregando componente: ${filePath}`); // Debug
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o componente: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
           // console.log(`Componente carregado: ${filePath}`); // Debug
            // Insere o conteúdo do componente no DOM
            document.getElementById(componentId).innerHTML = data;

            // Executa o JavaScript específico para o componente
            if (componentId === 'navigation') {
                initMenu(); // Inicializa o menu mobile
                setActiveLink(); // Destaca o link ativo
            }

            // Inicializa o slider após carregar o componente horizontalScroll
            if (componentId === 'horizontalScroll') {
                initSlider();
            }
        })
        .catch(error => {
            console.error(error);
        });
}

// Função para carregar componentes com base na página atual
function loadPageComponents() {
    //console.log('Carregando componentes...'); // Debug
    const path = window.location.pathname;

    // Componentes comuns a todas as páginas
    loadComponent('navigation', './components/navigation.html');
    loadComponent('footer', './components/footer.html');

    // Componentes específicos para a página inicial
    if (path.endsWith('index.html') || path.endsWith('/')) {
        loadComponent('banner', './components/banner.html');
        loadComponent('horizontalScroll', './components/horizontalScroll.html');
        loadComponent('sobre', './components/sobre.html');
        loadComponent('programa', './components/programa.html');
        loadComponent('empresas', './components/empresas.html');
        loadComponent('localizacao', './components/localizacao.html');
    }

    // Componentes específicos para a página programaFull.html
    if (path.endsWith('programaFull.html')) {
        console.log('Carregando componentes específicos para programaFull.html'); // Debug
        loadComponent('navigation', '../components/navigation.html');
        loadComponent('footer', '../components/footer.html');
    }
}

// Executa a função ao carregar a página
document.addEventListener('DOMContentLoaded', loadPageComponents);