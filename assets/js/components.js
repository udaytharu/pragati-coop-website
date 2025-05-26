// Component Loader
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            const container = document.getElementById(elementId);
            if (!container) {
                throw new Error(`Container element #${elementId} not found`);
            }
            container.innerHTML = html;
            
            // Only initialize event listeners for header component
            if (elementId === 'header-container') {
                // Small delay to ensure DOM is updated
                setTimeout(() => this.initializeEventListeners(), 0);
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    static initializeEventListeners() {
        console.log('Initializing event listeners...'); // Debug log
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        if (!hamburger || !navMenu) {
            console.error('Hamburger or nav menu not found!'); // Debug log
            return;
        }

        // Remove any existing event listeners
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        const newNavMenu = navMenu.cloneNode(true);
        navMenu.parentNode.replaceChild(newNavMenu, navMenu);

        // Add click event to hamburger
        newHamburger.addEventListener("click", (event) => {
            console.log('Hamburger clicked!'); // Debug log
            event.stopPropagation();
            newHamburger.classList.toggle("active");
            newHamburger.setAttribute('aria-expanded', newHamburger.classList.contains('active'));
            newNavMenu.classList.toggle("active");
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (newNavMenu.classList.contains('active') && 
                !event.target.closest('.nav-menu') && 
                !event.target.closest('.hamburger')) {
                newHamburger.classList.remove("active");
                newHamburger.setAttribute('aria-expanded', 'false');
                newNavMenu.classList.remove("active");
                // Close any open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                });
            }
        });

        // Close menu when clicking a link
        newNavMenu.querySelectorAll("a:not(.dropdown-toggle)").forEach(link => {
            link.addEventListener("click", () => {
                newHamburger.classList.remove("active");
                newHamburger.setAttribute('aria-expanded', 'false');
                newNavMenu.classList.remove("active");
                // Close any open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                });
            });
        });

        // Initialize dropdowns
        newNavMenu.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (event) => {
                if (window.innerWidth <= 768) {
                    event.preventDefault();
                    event.stopPropagation();
                    const dropdown = toggle.parentElement;
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close other dropdowns
                    newNavMenu.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                            const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
                            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                    toggle.setAttribute('aria-expanded', !isActive);
                }
            });
        });
    }
}

// Load components when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Loading components...'); // Debug log
    // Load header
    ComponentLoader.loadComponent('header-container', '/components/header.html');
    // Load footer
    ComponentLoader.loadComponent('footer-container', '/components/footer.html');
}); 