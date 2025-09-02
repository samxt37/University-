// Event Calendar JavaScript

// Mock events data
let events = [
    {
        id: 1,
        title: 'Conférence sur l\'Intelligence Artificielle',
        date: '2025-10-15',
        time: '14:00',
        location: 'Amphithéâtre A',
        description: 'Une conférence sur les dernières avancées en IA.'
    },
    {
        id: 2,
        title: 'Journée portes ouvertes',
        date: '2025-10-22',
        time: '09:00',
        location: 'Campus principal',
        description: 'Découvrez notre université et nos formations.'
    },
    {
        id: 3,
        title: 'Séminaire de recherche',
        date: '2025-10-28',
        time: '10:00',
        location: 'Salle de conférence B',
        description: 'Présentation des derniers travaux de recherche.'
    }
];

// Current calendar date
let currentDate = new Date();

// DOM elements
const calendarGrid = document.querySelector('.calendar-grid');
const currentMonthElement = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const eventForm = document.getElementById('event-form');

// Modal elements
let modal = null;
let modalContent = null;

// Initialize calendar
function initCalendar() {
    createModal();
    renderCalendar();
    setupEventListeners();
    renderEventsList();
}

// Create modal for event details
function createModal() {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 id="modal-title"></h2>
            <p><strong>Date:</strong> <span id="modal-date"></span></p>
            <p><strong>Heure:</strong> <span id="modal-time"></span></p>
            <p><strong>Lieu:</strong> <span id="modal-location"></span></p>
            <p><strong>Description:</strong></p>
            <p id="modal-description"></p>
        </div>
    `;
    document.body.appendChild(modal);

    modalContent = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.close');

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Set up event listeners
function setupEventListeners() {
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    if (eventForm) {
        eventForm.addEventListener('submit', handleEventSubmit);
    }
}

// Render calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update month display
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                       'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;

    // Clear existing calendar days (keep headers)
    const existingDays = calendarGrid.querySelectorAll('.calendar-day');
    existingDays.forEach(day => day.remove());

    // Get first day of month and last day
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // Generate calendar days
    for (let i = 0; i < 42; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        const dayDate = new Date(startDate);
        dayDate.setDate(startDate.getDate() + i);

        const dayNumber = dayDate.getDate();
        const isCurrentMonth = dayDate.getMonth() === month;

        if (!isCurrentMonth) {
            dayElement.classList.add('other-month');
        }

        // Check if it's today
        const today = new Date();
        if (dayDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }

        dayElement.innerHTML = `<div class="day-number">${dayNumber}</div>`;

        // Add events for this day
        const dayEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === dayDate.toDateString();
        });

        dayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-indicator';
            eventElement.textContent = event.title.substring(0, 20) + (event.title.length > 20 ? '...' : '');
            eventElement.addEventListener('click', () => showEventDetails(event));
            dayElement.appendChild(eventElement);
        });

        calendarGrid.appendChild(dayElement);
    }
}

// Render events list
function renderEventsList() {
    const eventsList = document.querySelector('.events-list');
    if (!eventsList) return;

    eventsList.innerHTML = '';

    // Sort events by date
    const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';

        const eventDate = new Date(event.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleDateString('fr-FR', { month: 'short' });

        eventCard.innerHTML = `
            <div class="event-date">
                <span class="day">${day}</span>
                <span class="month">${month}</span>
            </div>
            <div class="event-details">
                <h3>${event.title}</h3>
                <p class="event-time">${event.time}</p>
                <p class="event-location">${event.location}</p>
                <p class="event-description">${event.description}</p>
            </div>
        `;

        eventsList.appendChild(eventCard);
    });
}

// Show event details in modal
function showEventDetails(event) {
    document.getElementById('modal-title').textContent = event.title;
    document.getElementById('modal-date').textContent = formatDate(event.date);
    document.getElementById('modal-time').textContent = event.time;
    document.getElementById('modal-location').textContent = event.location;
    document.getElementById('modal-description').textContent = event.description;

    modal.style.display = 'block';
}

// Handle event form submission
function handleEventSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;

    // Validate form
    if (!title || !date || !time || !location) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    // Create new event
    const newEvent = {
        id: Date.now(),
        title,
        date,
        time,
        location,
        description
    };

    // Add to events array
    events.push(newEvent);

    // Re-render calendar and events list
    renderCalendar();
    renderEventsList();

    // Reset form
    eventForm.reset();

    // Show success message
    alert('Événement ajouté avec succès!');
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Navigation between sections
function handleNavigation() {
    const hash = window.location.hash.substring(1);
    const sections = ['calendar', 'events', 'add-event'];

    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = section === hash ? 'block' : 'none';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCalendar();

    // Handle hash changes
    window.addEventListener('hashchange', handleNavigation);

    // Show default section
    if (!window.location.hash) {
        window.location.hash = '#calendar';
    } else {
        handleNavigation();
    }
});

// Export functions for potential use in other scripts
window.Calendar = {
    renderCalendar,
    renderEventsList,
    showEventDetails
};