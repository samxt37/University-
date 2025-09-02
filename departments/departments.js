// 3D Departments JavaScript - Enhanced Interactive 3D Effects

// Initialize departments page
function initDepartmentsPage() {
    setup3DCardInteractions();
    setupParticleEffects();
    setupScrollAnimations();
    setupHoverSounds();
}

// Enhanced 3D card interactions
function setup3DCardInteractions() {
    const cards = document.querySelectorAll('.department-card');

    cards.forEach((card, index) => {
        const card3d = card.querySelector('.card-3d');

        // Mouse move for 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card3d.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
        });

        // Mouse leave to reset
        card.addEventListener('mouseleave', () => {
            card3d.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        });

        // Click to flip card
        card.addEventListener('click', () => {
            const isFlipped = card3d.style.transform.includes('rotateY(180deg)');
            if (isFlipped) {
                card3d.style.transform = 'rotateY(0deg)';
            } else {
                card3d.style.transform = 'rotateY(180deg)';
            }
        });
    });
}

// Particle effects for cards
function setupParticleEffects() {
    const cards = document.querySelectorAll('.department-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', createParticles);
    });

    function createParticles(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position around the card
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;

            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${getRandomColor()};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${x}px;
                top: ${y}px;
                animation: particleFloat 1s ease-out forwards;
            `;

            card.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }

    function getRandomColor() {
        const colors = ['#1e73be', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Scroll-triggered animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0deg)';
            }
        });
    }, observerOptions);

    // Observe department cards
    const cards = document.querySelectorAll('.department-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(10deg)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(card);
    });

    // Observe stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Hover sound effects (visual feedback)
function setupHoverSounds() {
    const cards = document.querySelectorAll('.department-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Create visual "sound" effect
            const soundWave = document.createElement('div');
            soundWave.className = 'sound-wave';
            soundWave.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border: 2px solid rgba(255,215,0,0.6);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: soundWave 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;

            card.appendChild(soundWave);

            setTimeout(() => {
                if (soundWave.parentNode) {
                    soundWave.parentNode.removeChild(soundWave);
                }
            }, 600);
        });
    });
}

// 3D floating animation for icons
function setupIconAnimations() {
    const icons = document.querySelectorAll('.card-icon');

    icons.forEach((icon, index) => {
        icon.style.animation = `iconFloat 4s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.2}s`;
    });
}

// Enhanced card flip with 3D depth
function setupEnhancedFlips() {
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const isFlipped = card.classList.contains('flipped');

            if (isFlipped) {
                card.classList.remove('flipped');
                card.style.transform = 'rotateY(0deg)';
            } else {
                card.classList.add('flipped');
                card.style.transform = 'rotateY(180deg)';

                // Add 3D depth effect
                setTimeout(() => {
                    card.style.transform = 'rotateY(180deg) translateZ(20px)';
                }, 250);
            }
        });
    });
}

// Magnetic effect for buttons
function setupMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-explore');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// CSS animations for particles and effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }

    @keyframes soundWave {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }

    @keyframes iconFloat {
        0%, 100% {
            transform: translateY(0px) rotateY(0deg);
        }
        50% {
            transform: translateY(-10px) rotateY(180deg);
        }
    }

    .particle {
        animation: particleFloat 1s ease-out forwards;
    }

    .sound-wave {
        animation: soundWave 0.6s ease-out;
    }

    .card-3d.flipped {
        transform: rotateY(180deg) translateZ(20px);
    }
`;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDepartmentsPage();
    setupIconAnimations();
    setupEnhancedFlips();
    setupMagneticButtons();
});

// Export functions for potential use
window.DepartmentsPage = {
    initDepartmentsPage,
    setup3DCardInteractions,
    setupParticleEffects,
    setupScrollAnimations
};