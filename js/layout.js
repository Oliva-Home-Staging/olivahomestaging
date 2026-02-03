// Layout manager - handles loading and displaying components and page content
class LayoutManager {
    constructor() {
        this.currentPage = 'index';
        this.components = {};
        this.pageContent = {};
    }

    // Load a component from the components directory
    async loadComponent(name) {
        try {
            const response = await fetch(`components/${name}.html`);
            if (!response.ok) throw new Error(`Failed to load ${name} component`);
            this.components[name] = await response.text();
            return this.components[name];
        } catch (error) {
            console.error(`Error loading ${name} component:`, error);
            return `<!-- ${name} component failed to load -->`;
        }
    }

    // Load page content
    async loadPageContent(pageName) {
        try {
            // For dynamic loading, we'll use the global page content objects
            if (window[`${pageName}Content`]) {
                this.pageContent[pageName] = window[`${pageName}Content`];
                return this.pageContent[pageName];
            }
            throw new Error(`Page content for ${pageName} not found`);
        } catch (error) {
            console.error(`Error loading ${pageName} page content:`, error);
            return {
                title: 'Page Not Found',
                content: '<div>Page content failed to load</div>'
            };
        }
    }

    // Update page title
    updatePageTitle(title) {
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) {
            pageTitle.textContent = title;
        }
    }

    // Update active navigation link
    updateActiveNavLink(pageName) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });
    }

    // Update body classes based on page
    updateBodyClasses(pageName) {
        document.body.className = '';
        document.body.classList.add(`${pageName}-page`);
    }

    // Handle page-specific JavaScript
    initializePageFeatures(pageName) {
        // Portfolio carousel removed for redesign
        // No special features needed for current pages
    }

    // Navigate to a specific page
    async navigateTo(pageName) {
        this.currentPage = pageName;
        
        // Load page content
        const pageContent = await this.loadPageContent(pageName);
        
        // Update main content area
        const mainContent = document.getElementById('main-content');
        if (mainContent && pageContent.content) {
            mainContent.innerHTML = pageContent.content;
        }

        // Update page title
        this.updatePageTitle(pageContent.title);

        // Update active navigation
        this.updateActiveNavLink(pageName);

        // Update body classes
        this.updateBodyClasses(pageName);

        // Initialize page-specific features
        this.initializePageFeatures(pageName);

        // Update browser history
        const pageTitle = pageContent.title || 'Oliva Home Staging';
        history.pushState({ page: pageName }, pageTitle, pageName === 'index' ? '/' : `#${pageName}`);
    }

    // Setup navigation event listeners
    setupNavigation() {
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('[data-page]');
            if (navLink) {
                e.preventDefault();
                const pageName = navLink.dataset.page;
                this.navigateTo(pageName);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigateTo(e.state.page);
            } else {
                // Handle direct URL access
                const hash = window.location.hash.slice(1);
                const pageName = hash || 'index';
                this.navigateTo(pageName);
            }
        });
    }

    // Initialize the layout manager
    async init() {
        try {
            // Load all components
            const nav = await this.loadComponent('nav');
            const header = await this.loadComponent('header');
            const footer = await this.loadComponent('footer');

            // Insert components into the page
            document.getElementById('navigation').innerHTML = nav;
            document.getElementById('header').innerHTML = header;
            document.getElementById('footer').innerHTML = footer;

            // Setup navigation
            this.setupNavigation();

            // Determine initial page from URL
            const hash = window.location.hash.slice(1);
            const initialPage = hash || 'index';
            
            // Navigate to initial page
            await this.navigateTo(initialPage);

        } catch (error) {
            console.error('Error initializing layout:', error);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.layoutManager = new LayoutManager();
    window.layoutManager.init();
});