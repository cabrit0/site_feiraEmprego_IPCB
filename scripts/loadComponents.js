// Função para carregar componentes
function loadComponent(componentId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o componente: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(componentId);
            container.innerHTML = data;

            // Extrai e executa scripts embutidos
            const scripts = container.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.text = oldScript.text;
                }
                document.body.appendChild(newScript);
                oldScript.remove();
            });

            return container;
        })
        .catch(error => {
            console.error(`Erro ao carregar ${componentId}:`, error);
        });
}

// Função para carregar componentes com base na página atual
function loadPageComponents() {
    const path = window.location.pathname;

    // Componentes comuns a todas as páginas
    loadComponent('navigation', './components/navigation.html');
    loadComponent('footer', './components/footer.html');

    // Componentes específicos para a página inicial
    if (path.endsWith('index.html') || path.endsWith('/')) {
        Promise.all([
            loadComponent('banner', './components/banner.html'),
            loadComponent('horizontalScroll', './components/horizontalScroll.html'),
            loadComponent('sobre', './components/sobre.html'),
            loadComponent('programa', './components/programa.html'),
            loadComponent('empresas', './components/empresas.html'),
            loadComponent('localizacao', './components/localizacao.html')
        ]).then(() => {
            // Inicializa componentes após carregamento
            if (typeof initEmpresas === 'function') {
                initEmpresas();
                initSlider();
            }
        });
    }
}

// Carrega os componentes quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', loadPageComponents);