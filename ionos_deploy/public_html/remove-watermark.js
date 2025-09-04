// Script pour supprimer le watermark "Made with Emergent"
(function() {
    'use strict';
    
    function removeEmergentWatermark() {
        // Sélecteurs possibles pour le bouton "Made with Emergent"
        const selectors = [
            '[data-testid="emergent-watermark"]',
            'div[style*="position: fixed"][style*="bottom: 20px"][style*="right: 20px"]',
            'button[style*="position: fixed"][style*="bottom"]',
            'div[style*="z-index: 9999"]',
            '*[class*="emergent-watermark"]',
            '*[id*="emergent-watermark"]'
        ];
        
        // Rechercher et supprimer les éléments
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element && (
                    element.textContent.includes('Made with Emergent') ||
                    element.textContent.includes('Emergent') ||
                    element.innerHTML.includes('Emergent')
                )) {
                    element.style.display = 'none';
                    element.style.visibility = 'hidden';
                    element.style.opacity = '0';
                    element.remove();
                }
            });
        });
        
        // Rechercher dans tous les éléments avec position fixed
        const fixedElements = document.querySelectorAll('*[style*="position: fixed"]');
        fixedElements.forEach(element => {
            if (element.textContent.includes('Made with Emergent') || 
                element.textContent.includes('Emergent')) {
                element.style.display = 'none';
                element.remove();
            }
        });
        
        // Rechercher les boutons en bas à droite
        const buttons = document.querySelectorAll('button, div');
        buttons.forEach(button => {
            if (button.textContent.includes('Made with Emergent') ||
                button.textContent.includes('Emergent')) {
                const rect = button.getBoundingClientRect();
                if (rect.bottom > window.innerHeight - 100 && rect.right > window.innerWidth - 200) {
                    button.style.display = 'none';
                    button.remove();
                }
            }
        });
    }
    
    // Exécuter immédiatement
    removeEmergentWatermark();
    
    // Exécuter après chargement de la page
    document.addEventListener('DOMContentLoaded', removeEmergentWatermark);
    
    // Exécuter périodiquement pour les éléments ajoutés dynamiquement
    setInterval(removeEmergentWatermark, 1000);
    
    // Observer les changements du DOM
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    removeEmergentWatermark();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();