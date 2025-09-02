// Entrance Page JavaScript - Beautiful Landing Page for UMMTO

// Initialize the entrance page
function initEntrancePage() {
    setupAnimations();
    setupStatisticsCounter();
    setupEnterButton();
    setupParallaxEffect();
}

// Set up entrance animations
function setupAnimations() {
    // Add entrance animations with delays
    const elements = document.querySelectorAll('.logo-section, .heritage-section, .stats-section, .mission-section, .enter-section, .entrance-footer');

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Set up statistics counter animation
function setupStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const step = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, step);
    });
}

// Set up enter button functionality
function setupEnterButton() {
    const enterBtn = document.querySelector('.enter-btn');

    enterBtn.addEventListener('click', () => {
        // Add loading animation
        enterBtn.innerHTML = '<span class="btn-text">Chargement...</span><div class="btn-glow"></div>';

        // Redirect to main website after animation
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });

    // Add hover sound effect (visual feedback)
    enterBtn.addEventListener('mouseenter', () => {
        enterBtn.style.transform = 'translateY(-5px) scale(1.05)';
    });

    enterBtn.addEventListener('mouseleave', () => {
        enterBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// Set up parallax effect for floating shapes
function setupParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Add scroll-triggered animations
function setupScrollAnimations() {
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

    // Observe heritage cards
    const heritageCards = document.querySelectorAll('.heritage-card');
    heritageCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Add keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const enterBtn = document.querySelector('.enter-btn');
            if (enterBtn) {
                enterBtn.click();
            }
        }
    });
}

// Add loading screen effect
function setupLoadingEffect() {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e73be 0%, #0056b3 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

    loadingScreen.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎓</div>
            <h2>Université Mouloud Mammeri</h2>
            <p>Chargement de l'excellence...</p>
        </div>
    `;

    document.body.appendChild(loadingScreen);

    // Remove loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loadingScreen);
            }, 500);
        }, 1000);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initEntrancePage();
    setupScrollAnimations();
    setupKeyboardNavigation();
    setupLoadingEffect();
});

// Global function for button click (called from HTML)
function enterWebsite() {
    const enterBtn = document.querySelector('.enter-btn');
    if (enterBtn) {
        enterBtn.click();
    }
}

// Export functions for potential use
window.EntrancePage = {
    initEntrancePage,
    setupStatisticsCounter,
    setupEnterButton,
    setupParallaxEffect
};