// Sciences Faculty JavaScript

// Specialty data
const specialtyData = {
    mathematiques: {
        title: "Mathématiques",
        description: "Formation complète en analyse, algèbre, géométrie et probabilités",
        courses: ["Analyse Mathématique", "Algèbre Linéaire", "Géométrie", "Probabilités"],
        professors: ["Pr. Ahmed Bennani", "Dr. Fatima Zohra", "Dr. Mohamed Lahlou"],
        resources: ["Cours PDF", "Exercices corrigés", "Logiciels Mathematica", "Forum étudiant"],
        news: [
            { title: "Nouveau logiciel de calcul", date: "2025-10-01", content: "Introduction du logiciel Mathematica dans les cours..." },
            { title: "Olympiade mathématique", date: "2025-09-15", content: "Préparation aux olympiades internationales..." }
        ]
    },
    physique: {
        title: "Physique",
        description: "Physique fondamentale et appliquée avec laboratoires modernes",
        courses: ["Mécanique", "Électromagnétisme", "Optique", "Physique Quantique"],
        professors: ["Pr. Karim Tazi", "Dr. Leila Mansouri", "Dr. Hassan Alaoui"],
        resources: ["TP virtuels", "Vidéos expérimentales", "Simulateurs", "Bibliothèque numérique"],
        news: [
            { title: "Nouveau télescope", date: "2025-10-05", content: "Installation d'un nouveau télescope au laboratoire..." },
            { title: "Conférence Nobel", date: "2025-09-20", content: "Visite du lauréat Nobel de physique..." }
        ]
    },
    chimie: {
        title: "Chimie",
        description: "Chimie organique, inorganique et analytique",
        courses: ["Chimie Organique", "Chimie Inorganique", "Chimie Analytique", "Biochimie"],
        professors: ["Pr. Nadia Bennani", "Dr. Rachid Alaoui", "Dr. Samira Tazi"],
        resources: ["Protocoles expérimentaux", "Base de données chimiques", "Logiciels de modélisation", "Sécurité laboratoire"],
        news: [
            { title: "Nouveau laboratoire", date: "2025-10-10", content: "Inauguration du laboratoire de chimie verte..." },
            { title: "Partenariat industriel", date: "2025-09-25", content: "Collaboration avec l'industrie pharmaceutique..." }
        ]
    },
    biologie: {
        title: "Biologie",
        description: "Biologie moléculaire, cellulaire et environnementale",
        courses: ["Biologie Cellulaire", "Génétique", "Microbiologie", "Écologie"],
        professors: ["Pr. Mohamed Alaoui", "Dr. Fatima Bennani", "Dr. Karim Mansouri"],
        resources: ["Banque de gènes", "Microscopes virtuels", "Logiciels d'analyse", "Jardin botanique"],
        news: [
            { title: "Découverte majeure", date: "2025-10-15", content: "Publication dans Nature sur la biodiversité..." },
            { title: "Programme européen", date: "2025-09-30", content: "Participation au programme Horizon Europe..." }
        ]
    },
    informatique: {
        title: "Informatique",
        description: "Informatique théorique et appliquée, IA et cybersécurité",
        courses: ["Algorithmique", "Programmation", "Intelligence Artificielle", "Cybersécurité"],
        professors: ["Pr. Hassan Tazi", "Dr. Leila Alaoui", "Dr. Mohamed Bennani"],
        resources: ["IDE en ligne", "Projets GitHub", "Plateforme de coding", "Hackathons"],
        news: [
            { title: "IA breakthrough", date: "2025-10-20", content: "Développement d'un nouveau modèle d'IA..." },
            { title: "Partenariat tech", date: "2025-10-01", content: "Collaboration avec Google et Microsoft..." }
        ]
    }
};

// Initialize the page
function initSciencesPage() {
    setupSpecialtyCards();
    setupResourceFilters();
    setupNewsFilters();
    setupContactForm();
    animateOnScroll();
}

// Set up specialty cards with 3D effects
function setupSpecialtyCards() {
    const specialtyCards = document.querySelectorAll('.specialty-card');

    specialtyCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const overlay = card.querySelector('.specialty-overlay');
            overlay.style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', (e) => {
            const overlay = card.querySelector('.specialty-overlay');
            overlay.style.transform = 'translateY(20px)';
        });

        // Add click event for specialty details
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn-specialty')) {
                const specialty = card.dataset.specialty;
                showSpecialtyModal(specialty);
            }
        });
    });
}

// Show specialty details modal
function showSpecialtyModal(specialty) {
    const data = specialtyData[specialty];
    if (!data) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'specialty-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${data.title}</h2>
            <p class="specialty-description">${data.description}</p>

            <div class="modal-section">
                <h3>Cours principaux</h3>
                <ul>
                    ${data.courses.map(course => `<li>${course}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3>Enseignants</h3>
                <ul>
                    ${data.professors.map(prof => `<li>${prof}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3>Ressources disponibles</h3>
                <ul>
                    ${data.resources.map(resource => `<li>${resource}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3>Dernières actualités</h3>
                ${data.news.map(item => `
                    <div class="news-item">
                        <h4>${item.title}</h4>
                        <p class="news-date">${formatDate(item.date)}</p>
                        <p>${item.content}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

// Set up resource filters
function setupResourceFilters() {
    const resourceCategories = document.querySelectorAll('.resource-category');

    resourceCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-5px)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
        });
    });
}

// Set up news filters and interactions
function setupNewsFilters() {
    const newsCards = document.querySelectorAll('.news-card');

    newsCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Set up contact form
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const message = contactForm.querySelector('#message').value;

        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        // Simulate form submission
        alert('Message envoyé avec succès! Nous vous répondrons bientôt.');
        contactForm.reset();
    });
}

// Animate elements on scroll
function animateOnScroll() {
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

    // Observe elements to animate
    const animateElements = document.querySelectorAll('.specialty-card, .resource-category, .news-card, .contact-info');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Rechercher une spécialité...';
    searchInput.className = 'search-input';

    const header = document.querySelector('header .container');
    header.appendChild(searchInput);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const specialtyCards = document.querySelectorAll('.specialty-card');

        specialtyCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.hero-stats .number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 20);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSciencesPage();
    setupSearch();
    animateCounters();
});

// Export functions for potential use
window.SciencesFaculty = {
    showSpecialtyModal,
    formatDate,
    animateCounters
};