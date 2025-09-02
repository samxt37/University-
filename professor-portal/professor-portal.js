// Professor Portal JavaScript

// Initialize the professor portal
function initProfessorPortal() {
    setupLogin();
    setupNavigation();
    setupCourseManagement();
    setupStudentManagement();
    setupMessageSystem();
}

// Login functionality
function setupLogin() {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login');
    const dashboardSection = document.getElementById('dashboard');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (in production, this would be server-side)
        if (username && password) {
            // Simulate successful login
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            showNotification('Connexion réussie!', 'success');
        } else {
            showNotification('Veuillez saisir vos identifiants', 'error');
        }
    });
}

// Navigation between sections
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('main section[id]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Hide all sections
                sections.forEach(section => {
                    if (!section.classList.contains('login-section')) {
                        section.classList.add('hidden');
                    }
                });

                // Show target section
                targetSection.classList.remove('hidden');

                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Course management functionality
function setupCourseManagement() {
    const addCourseBtn = document.getElementById('add-course');
    const semesterFilter = document.getElementById('semester-filter');

    // Add course functionality
    addCourseBtn.addEventListener('click', () => {
        showModal('Nouveau Cours', `
            <form id="course-form">
                <div class="form-group">
                    <label for="course-name">Nom du cours:</label>
                    <input type="text" id="course-name" required>
                </div>
                <div class="form-group">
                    <label for="course-level">Niveau:</label>
                    <select id="course-level" required>
                        <option value="">Sélectionner un niveau</option>
                        <option value="licence1">Licence 1</option>
                        <option value="licence2">Licence 2</option>
                        <option value="licence3">Licence 3</option>
                        <option value="master1">Master 1</option>
                        <option value="master2">Master 2</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="course-hours">Heures par semaine:</label>
                    <input type="number" id="course-hours" min="1" max="40" required>
                </div>
                <div class="form-group">
                    <label for="course-description">Description:</label>
                    <textarea id="course-description" rows="4"></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Créer le cours</button>
                </div>
            </form>
        `);

        // Handle course form submission
        document.getElementById('course-form').addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would send the data to the server
            showNotification('Cours créé avec succès!', 'success');
            closeModal();
        });
    });

    // Semester filter
    semesterFilter.addEventListener('change', (e) => {
        const selectedSemester = e.target.value;
        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
            if (selectedSemester === 'all' || card.dataset.semester === selectedSemester) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Student management functionality
function setupStudentManagement() {
    const studentSearch = document.getElementById('student-search');
    const classFilter = document.getElementById('class-filter');

    // Student search
    studentSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const studentRows = document.querySelectorAll('.students-table tbody tr');

        studentRows.forEach(row => {
            const studentName = row.cells[0].textContent.toLowerCase() + ' ' + row.cells[1].textContent.toLowerCase();
            if (studentName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Class filter
    classFilter.addEventListener('change', (e) => {
        const selectedClass = e.target.value;
        const studentRows = document.querySelectorAll('.students-table tbody tr');

        studentRows.forEach(row => {
            const studentClass = row.cells[2].textContent.toLowerCase().replace(' ', '');
            if (selectedClass === 'all' || studentClass.includes(selectedClass)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Message system
function setupMessageSystem() {
    const messageItems = document.querySelectorAll('.message-item');

    messageItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            messageItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');

            // Here you would load the message content
            // For demo purposes, we'll just show a notification
            showNotification('Message chargé', 'info');
        });
    });
}

// Modal functionality
function showModal(title, content) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Logout functionality
function setupLogout() {
    const logoutLink = document.querySelector('a[href="#logout"]');
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();

        // Hide all sections except login
        const sections = document.querySelectorAll('main section[id]');
        sections.forEach(section => {
            if (!section.classList.contains('login-section')) {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        });

        // Clear form
        document.getElementById('login-form').reset();

        showNotification('Déconnexion réussie', 'success');
    });
}

// Add modal styles
const modalStyles = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        border-radius: 15px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #e1e5e9;
    }

    .modal-header h3 {
        margin: 0;
        color: #1e73be;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }

    .modal-body {
        padding: 1.5rem;
    }

    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1.5rem;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        min-width: 300px;
    }

    .notification.success {
        border-left: 4px solid #28a745;
    }

    .notification.error {
        border-left: 4px solid #dc3545;
    }

    .notification.info {
        border-left: 4px solid #17a2b8;
    }

    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initProfessorPortal();
    setupLogout();
});

// Export functions for potential use
window.ProfessorPortal = {
    initProfessorPortal,
    showModal,
    closeModal,
    showNotification
};