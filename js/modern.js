// Modern UMMTO Website JavaScript - 2025

class ModernWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSearch();
        this.setupThemeToggle();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupAnimations();
    }

    // Modern Navigation Setup
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        const dropdowns = document.querySelectorAll('.nav-dropdown');

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed nav
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Dropdown hover effects
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');

            dropdown.addEventListener('mouseenter', () => {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            });

            dropdown.addEventListener('mouseleave', () => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
        });
    }

    // Search Functionality
    setupSearch() {
        const searchToggle = document.getElementById('search-toggle');
        const searchOverlay = document.getElementById('search-overlay');
        const searchClose = document.getElementById('search-close');
        const searchInput = document.getElementById('search-input');

        // Toggle search overlay
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('show');
            searchInput.focus();
        });

        // Close search overlay
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('show');
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('show')) {
                searchOverlay.classList.remove('show');
            }
        });

        // Search functionality
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
    }

    performSearch(query) {
        // This would typically search through your content
        // For now, we'll just log the search
        console.log('Searching for:', query);

        // You could implement actual search functionality here
        // by searching through page content, or making API calls
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        }

        // Toggle theme
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update theme toggle icon
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        const svg = themeToggle.querySelector('svg');

        if (theme === 'dark') {
            // Moon icon for dark theme
            svg.innerHTML = `
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            `;
        } else {
            // Sun icon for light theme
            svg.innerHTML = `
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
            `;
        }
    }

    // Scroll Effects
    setupScrollEffects() {
        const nav = document.querySelector('.modern-nav');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Add background blur on scroll
            if (currentScrollY > 50) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.backdropFilter = 'blur(20px)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = 'none';
            }

            // Hide/show nav on scroll (optional)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });

        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.feature-card, .news-card-main, .news-card-small, .stat-card-modern');
        animateElements.forEach(el => observer.observe(el));
    }

    // Mobile Menu (for smaller screens)
    setupMobileMenu() {
        // Create mobile menu button
        const navContainer = document.querySelector('.nav-container');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;

        // Only show on mobile
        if (window.innerWidth <= 1024) {
            navContainer.appendChild(mobileMenuBtn);
            this.setupMobileMenuToggle(mobileMenuBtn);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 1024 && !navContainer.contains(mobileMenuBtn)) {
                navContainer.appendChild(mobileMenuBtn);
                this.setupMobileMenuToggle(mobileMenuBtn);
            } else if (window.innerWidth > 1024 && navContainer.contains(mobileMenuBtn)) {
                navContainer.removeChild(mobileMenuBtn);
            }
        });
    }

    setupMobileMenuToggle(button) {
        const navMenu = document.querySelector('.nav-menu');

        button.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
            button.classList.toggle('active');

            // Update button icon
            const svg = button.querySelector('svg');
            if (navMenu.classList.contains('mobile-open')) {
                svg.innerHTML = `
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                `;
            } else {
                svg.innerHTML = `
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                `;
            }
        });
    }

    // Animations
    setupAnimations() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.8s ease-out forwards;
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .nav-menu.mobile-open {
                display: flex !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                border-radius: 0 0 1rem 1rem;
            }

            .mobile-menu-btn {
                display: none;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 0.5rem;
                transition: background-color 0.3s ease;
            }

            .mobile-menu-btn:hover {
                background: rgba(0, 0, 0, 0.1);
            }

            .mobile-menu-btn.active {
                background: rgba(99, 102, 241, 0.1);
            }

            @media (max-width: 1024px) {
                .mobile-menu-btn {
                    display: block;
                }

                .nav-menu {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize theme icon
        this.updateThemeIcon(document.documentElement.getAttribute('data-theme') || 'light');
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce scroll events
    const debouncedScroll = debounce(() => {
        // Handle scroll-based optimizations
    }, 16);

    window.addEventListener('scroll', debouncedScroll);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernWebsite();
    optimizePerformance();
});

// Export for potential use
window.ModernWebsite = ModernWebsite;