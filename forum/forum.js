// Forum JavaScript

// Initialize the forum
function initForum() {
    setupForumNavigation();
    setupNewTopicModal();
    setupSearch();
    setupCategoryFilters();
    setupTopicInteractions();
    loadForumStats();
}

// Navigation between forum sections
function setupForumNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('main section[id]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// New topic modal functionality
function setupNewTopicModal() {
    const newTopicBtn = document.getElementById('new-topic');
    const modal = document.getElementById('new-topic-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = document.getElementById('cancel-topic');
    const topicForm = document.getElementById('topic-form');

    // Open modal
    newTopicBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Handle form submission
    topicForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            title: document.getElementById('topic-title').value,
            category: document.getElementById('topic-category').value,
            content: document.getElementById('topic-content').value,
            notify: document.getElementById('notify-replies').checked
        };

        // Here you would send the data to the server
        console.log('New topic:', formData);

        // Show success message
        showNotification('Sujet créé avec succès!', 'success');

        // Close modal and reset form
        modal.classList.remove('show');
        topicForm.reset();
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('forum-search');
    const searchBtn = document.getElementById('search-btn');

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();

        if (query === '') {
            // Reset search - show all topics
            const topicItems = document.querySelectorAll('.topic-item');
            topicItems.forEach(item => {
                item.style.display = 'grid';
            });
            return;
        }

        // Search in topics
        const topicItems = document.querySelectorAll('.topic-item');
        topicItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.querySelector('p').textContent.toLowerCase();

            if (title.includes(query) || content.includes(query)) {
                item.style.display = 'grid';
            } else {
                item.style.display = 'none';
            }
        });

        // Search in categories
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Category filtering
function setupCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;

            // Here you would navigate to the category page
            // For demo purposes, we'll just highlight the selected category
            categoryCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            showNotification(`Catégorie: ${card.querySelector('h3').textContent}`, 'info');
        });
    });
}

// Topic interactions
function setupTopicInteractions() {
    const replyButtons = document.querySelectorAll('.btn-reply');

    replyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();

            const topicItem = button.closest('.topic-item');
            const topicTitle = topicItem.querySelector('h3').textContent;

            // Here you would open the topic page
            showNotification(`Ouverture du sujet: ${topicTitle}`, 'info');
        });
    });

    // Topic item click
    const topicItems = document.querySelectorAll('.topic-item');
    topicItems.forEach(item => {
        item.addEventListener('click', () => {
            const topicTitle = item.querySelector('h3').textContent;
            showNotification(`Ouverture du sujet: ${topicTitle}`, 'info');
        });
    });
}

// Load forum statistics
function loadForumStats() {
    // Simulate loading stats from server
    const stats = {
        messages: 2547,
        topics: 387,
        members: 156,
        online: 23
    };

    // Update stats display
    document.querySelector('.stat:nth-child(1) .number').textContent = stats.messages.toLocaleString();
    document.querySelector('.stat:nth-child(2) .number').textContent = stats.topics.toLocaleString();
    document.querySelector('.stat:nth-child(3) .number').textContent = stats.members.toLocaleString();
    document.querySelector('.stat:nth-child(4) .number').textContent = stats.online.toLocaleString();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.forum-notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification
    const notification = document.createElement('div');
    notification.className = `forum-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Real-time features simulation
function setupRealTimeFeatures() {
    // Simulate new messages/posts
    setInterval(() => {
        // Random chance of new activity
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
            const activities = [
                'Nouveau message dans "Cours et études"',
                'Nouveau sujet dans "Vie de campus"',
                '3 nouvelles réponses dans "Discussion générale"'
            ];

            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            showNotification(randomActivity, 'info');
        }
    }, 30000);

    // Update online users count
    setInterval(() => {
        const onlineCount = Math.floor(Math.random() * 10) + 15; // 15-25 online users
        document.querySelector('.online-count').textContent = `${onlineCount} membres en ligne`;
    }, 60000);
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + N for new topic
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            document.getElementById('new-topic').click();
        }

        // Ctrl/Cmd + F for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            document.getElementById('forum-search').focus();
        }

        // Escape to close modal
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.show');
            if (modal) {
                modal.classList.remove('show');
            }
        }
    });
}

// Add notification styles
const notificationStyles = `
    .forum-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        min-width: 300px;
        border-left: 4px solid #1e73be;
    }

    .forum-notification.success {
        border-left-color: #28a745;
    }

    .forum-notification.error {
        border-left-color: #dc3545;
    }

    .forum-notification.info {
        border-left-color: #17a2b8;
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

    .category-card.selected {
        border: 2px solid #1e73be;
        box-shadow: 0 0 20px rgba(30,115,190,0.3);
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initForum();
    setupRealTimeFeatures();
    setupKeyboardShortcuts();
});

// Export functions for potential use
window.Forum = {
    initForum,
    showNotification,
    setupNewTopicModal,
    setupSearch
};