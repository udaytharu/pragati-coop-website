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
            // Silently handle component loading errors in production
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.error(`Error loading component ${componentPath}:`, error);
            }
        }
    }

    static initializeEventListeners() {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        if (!hamburger || !navMenu) {
            return;
        }

        // Remove any existing event listeners
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        const newNavMenu = navMenu.cloneNode(true);
        navMenu.parentNode.replaceChild(newNavMenu, navMenu);

        // Add click event to hamburger
        newHamburger.addEventListener("click", (event) => {
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
        newNavMenu.querySelectorAll('.dropdown').forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            let hoverTimeout;

            toggle.addEventListener('click', (event) => {
                if (window.innerWidth <= 768) {
                    event.preventDefault();
                    event.stopPropagation();
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

            // Add hover delay for desktop
            if (window.innerWidth > 768) {
                const showDropdown = () => {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        // Close other dropdowns first
                        newNavMenu.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                                const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
                                if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                            }
                        });
                        dropdown.classList.add('active');
                        toggle.setAttribute('aria-expanded', 'true');
                    }, 200); // 200ms delay to show
                };

                const hideDropdown = () => {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        dropdown.classList.remove('active');
                        toggle.setAttribute('aria-expanded', 'false');
                    }, 300); // 300ms delay to hide
                };

                // Add hover listeners to both toggle and menu
                toggle.addEventListener('mouseenter', showDropdown);
                menu.addEventListener('mouseenter', showDropdown);
                toggle.addEventListener('mouseleave', hideDropdown);
                menu.addEventListener('mouseleave', hideDropdown);
            }
        });
    }
}

// Load components when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load header
    ComponentLoader.loadComponent('header-container', '/components/header.html');
    // Load footer
    ComponentLoader.loadComponent('footer-container', '/components/footer.html');
}); 