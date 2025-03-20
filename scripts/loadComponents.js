// scripts/loadComponents.js
function loadComponent(componentId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${componentId}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(componentId);
            container.innerHTML = data;

            // Processar scripts e garantir execução
            const scripts = container.querySelectorAll('script');
            const scriptPromises = Array.from(scripts).map(oldScript => {
                return new Promise((resolve, reject) => {
                    const newScript = document.createElement('script');
                    
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                        newScript.onload = resolve;
                        newScript.onerror = reject;
                    } else {
                        newScript.text = oldScript.text;
                        resolve();
                    }
                    
                    document.body.appendChild(newScript);
                    oldScript.remove();
                });
            });

            return Promise.all(scriptPromises).then(() => container);
        })
        .catch(error => {
            console.error(`Falha ao carregar ${componentId}:`, error);
        });
}

function loadPageComponents() {
    const path = window.location.pathname;
    const isNestedPage = path.includes('/pages/');
    const basePath = isNestedPage ? '../' : './';

    // Carregar navegação primeiro
    loadComponent('navigation', `${basePath}components/navigation.html`)
        .then(() => {
            // Inicializar menu mobile após carregamento
            if (typeof initMenu === 'function') {
                initMenu();
                setActiveLink();
            }
        });

    // Componentes comuns
    loadComponent('footer', `${basePath}components/footer.html`);

    // Página inicial
    if (path.endsWith('index.html') || path.endsWith('/')) {
        Promise.all([
            loadComponent('banner', `${basePath}components/banner.html`),
            loadComponent('horizontalScroll', `${basePath}components/horizontalScroll.html`),
            loadComponent('sobre', `${basePath}components/sobre.html`),
            loadComponent('programa', `${basePath}components/programa.html`),
            loadComponent('empresas', `${basePath}components/empresas.html`),
            loadComponent('localizacao', `${basePath}components/localizacao.html`)
        ]).then(() => {
            // Inicializar sliders após todos os scripts estarem prontos
            if (typeof initSlider === 'function') initSlider();
            if (typeof initEmpresas === 'function') initEmpresas();
        });
    }

    // Página programaFull
    if (path.endsWith('programaFull.html')) {
        loadComponent('programa-full', `${basePath}components/programaFull.html`);
    }
}

document.addEventListener('DOMContentLoaded', loadPageComponents);