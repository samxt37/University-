// Student Portal JavaScript

// Mock user data (in a real app, this would come from a server)
const mockUsers = [
    { username: 'student1', password: 'password123', name: 'Alice Dupont' },
    { username: 'student2', password: 'password123', name: 'Bob Martin' }
];

// Current logged-in user
let currentUser = null;

// DOM elements
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login');
const dashboardSection = document.getElementById('dashboard');
const coursesSection = document.getElementById('courses');
const gradesSection = document.getElementById('grades');
const resourcesSection = document.getElementById('resources');

// Navigation links
const navLinks = document.querySelectorAll('nav a[href^="#"]');

// Initialize the portal
function initPortal() {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('ummto_student_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    } else {
        showLogin();
    }

    // Set up event listeners
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Logout
    const logoutLink = document.querySelector('a[href="#logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate input
    if (!username || !password) {
        showAlert('Veuillez remplir tous les champs.', 'error');
        return;
    }

    // Check credentials
    const user = mockUsers.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('ummto_student_user', JSON.stringify(user));
        showDashboard();
        showAlert('Connexion réussie!', 'success');
    } else {
        showAlert('Nom d\'utilisateur ou mot de passe incorrect.', 'error');
    }
}

// Handle navigation
function handleNavigation(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);

    // Hide all sections
    hideAllSections();

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Update URL hash
    window.location.hash = targetId;
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    currentUser = null;
    localStorage.removeItem('ummto_student_user');
    showLogin();
    showAlert('Déconnexion réussie.', 'success');
}

// Show login section
function showLogin() {
    hideAllSections();
    loginSection.classList.remove('hidden');
}

// Show dashboard
function showDashboard() {
    hideAllSections();
    dashboardSection.classList.remove('hidden');
    updateDashboardContent();
}

// Hide all sections
function hideAllSections() {
    const sections = [loginSection, dashboardSection, coursesSection, gradesSection, resourcesSection];
    sections.forEach(section => {
        if (section) {
            section.classList.add('hidden');
        }
    });
}

// Update dashboard content with user data
function updateDashboardContent() {
    if (currentUser) {
        // Update welcome message or user-specific content
        const welcomeElement = document.querySelector('#dashboard h2');
        if (welcomeElement) {
            welcomeElement.textContent = `Bienvenue, ${currentUser.name}`;
        }
    }
}

// Show alert messages
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Insert at the top of the main content
    const main = document.querySelector('main');
    main.insertBefore(alertDiv, main.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

// Mock data for courses and grades
function getMockCourses() {
    return [
        { name: 'Mathématiques', professor: 'Dr. Dupont', progress: 75 },
        { name: 'Physique', professor: 'Dr. Martin', progress: 60 },
        { name: 'Informatique', professor: 'Dr. Durand', progress: 90 }
    ];
}

function getMockGrades() {
    return [
        { subject: 'Mathématiques', grade: '15/20', coefficient: 3, average: 15.0 },
        { subject: 'Physique', grade: '14/20', coefficient: 2, average: 14.0 },
        { subject: 'Informatique', grade: '16/20', coefficient: 3, average: 16.0 }
    ];
}

// Populate courses section
function populateCourses() {
    const coursesGrid = document.querySelector('.courses-grid');
    if (!coursesGrid) return;

    const courses = getMockCourses();
    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <h3>${course.name}</h3>
            <p>Professeur: ${course.professor}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${course.progress}%"></div>
            </div>
            <p>Progression: ${course.progress}%</p>
            <a href="#" class="btn-primary">Accéder au cours</a>
        `;
        coursesGrid.appendChild(courseCard);
    });
}

// Populate grades section
function populateGrades() {
    const gradesTableBody = document.querySelector('.grades-table tbody');
    if (!gradesTableBody) return;

    const grades = getMockGrades();
    gradesTableBody.innerHTML = '';

    grades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${grade.subject}</td>
            <td>${grade.grade}</td>
            <td>${grade.coefficient}</td>
            <td>${grade.average}</td>
        `;
        gradesTableBody.appendChild(row);
    });
}

// Handle hash changes for direct navigation
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (hash && currentUser) {
        handleNavigation({ preventDefault: () => {}, target: { getAttribute: () => `#${hash}` } });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortal();
    populateCourses();
    populateGrades();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
});

// Export functions for potential use in other scripts
window.StudentPortal = {
    showLogin,
    showDashboard,
    handleLogout
};