// Component Loader
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
            
            // Reinitialize any necessary event listeners after component load
            this.initializeEventListeners();
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    static initializeEventListeners() {
        // Reinitialize hamburger menu
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        if (hamburger && navMenu) {
            // Toggle menu on hamburger click
            hamburger.addEventListener("click", (event) => {
                event.stopPropagation();
                hamburger.classList.toggle("active");
                hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
                navMenu.classList.toggle("active");
            });

            // Close menu when clicking outside
            document.addEventListener('click', (event) => {
                if (navMenu.classList.contains('active') && 
                    !event.target.closest('.nav-menu') && 
                    !event.target.closest('.hamburger')) {
                    hamburger.classList.remove("active");
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove("active");
                    // Close any open dropdowns
                    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                        dropdown.classList.remove('active');
                        const toggle = dropdown.querySelector('.dropdown-toggle');
                        if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    });
                }
            });

            // Close menu when clicking a link
            navMenu.querySelectorAll("a:not(.dropdown-toggle)").forEach(link => {
                link.addEventListener("click", () => {
                    hamburger.classList.remove("active");
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove("active");
                    // Close any open dropdowns
                    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                        dropdown.classList.remove('active');
                        const toggle = dropdown.querySelector('.dropdown-toggle');
                        if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    });
                });
            });
        }

        // Reinitialize dropdown menus
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (event) => {
                if (window.innerWidth <= 768) {
                    event.preventDefault();
                    event.stopPropagation();
                    const dropdown = toggle.parentElement;
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                            const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
                            otherToggle?.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                    toggle.setAttribute('aria-expanded', !isActive);
                }
            });
        });

        // Reinitialize go-to-top button
        const goToTopButton = document.querySelector('.go-to-top');
        if (goToTopButton) {
            goToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Load components when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load header
    ComponentLoader.loadComponent('header-container', '/components/header.html');
    
    // Load footer
    ComponentLoader.loadComponent('footer-container', '/components/footer.html');
}); 