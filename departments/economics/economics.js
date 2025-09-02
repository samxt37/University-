// Economics Faculty JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Specialty card interactions
    const specialtyCards = document.querySelectorAll('.specialty-card');

    specialtyCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.querySelector('.btn-specialty');
            if (link) {
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Resource category hover effects
    const resourceCategories = document.querySelectorAll('.resource-category');
    resourceCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });

        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // News card animations
    const newsCards = document.querySelectorAll('.news-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    newsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Contact info hover effects
    const contactInfos = document.querySelectorAll('.contact-info');
    contactInfos.forEach(info => {
        info.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });

        info.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Economic data visualization (placeholder)
    initializeEconomicCharts();

    // Initialize any economics-specific functionality
    initializeEconomicsFaculty();
});

function initializeEconomicsFaculty() {
    // Add any economics faculty specific initialization here
    console.log('Economics Faculty page initialized');

    // You can add specific functionality for:
    // - Economic data visualization
    // - Market analysis tools
    // - Financial calculators
    // - Business plan templates
    // - Entrepreneurship resources
}

function initializeEconomicCharts() {
    // Placeholder for economic data charts
    // This could integrate with Chart.js or similar libraries
    const chartContainers = document.querySelectorAll('.economic-chart');

    chartContainers.forEach(container => {
        // Add chart initialization logic here
        console.log('Economic chart container found:', container.id);
    });
}

// Utility functions for economics faculty
function formatCurrency(amount, currency = 'DZD') {
    return new Intl.NumberFormat('fr-DZ', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function calculateROI(initialInvestment, finalValue) {
    return ((finalValue - initialInvestment) / initialInvestment) * 100;
}

function formatPercentage(value) {
    return new Intl.NumberFormat('fr-DZ', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value / 100);
}

function validateBusinessEmail(email) {
    const businessEmailRegex = /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|dz)$/;
    return businessEmailRegex.test(email);
}

// Export functions for potential use
window.EconomicsFaculty = {
    formatCurrency,
    calculateROI,
    formatPercentage,
    validateBusinessEmail,
    initializeEconomicsFaculty,
    initializeEconomicCharts
};