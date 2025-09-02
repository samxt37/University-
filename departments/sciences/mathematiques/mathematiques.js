// Mathematics Specialty JavaScript

// Tab functionality for resources
function setupResourceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const resourcePanes = document.querySelectorAll('.resource-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all panes
            resourcePanes.forEach(pane => pane.classList.remove('active'));

            // Show corresponding pane
            const tabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Interactive math formula display
function setupMathFormulas() {
    const mathFormula = document.querySelector('.math-formula');
    if (!mathFormula) return;

    const formulas = [
        '∫<sub>0</sub><sup>∞</sup> e<sup>-x²</sup> dx = √π/2',
        '∑<sub>n=1</sub><sup>∞</sup> 1/n² = π²/6',
        'lim<sub>x→0</sub> sin(x)/x = 1',
        'e<sup>iπ</sup> + 1 = 0',
        '∇ × E = -∂B/∂t'
    ];

    let currentFormula = 0;

    setInterval(() => {
        currentFormula = (currentFormula + 1) % formulas.length;
        mathFormula.innerHTML = formulas[currentFormula];
    }, 3000);
}

// Animate floating mathematical elements
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-elements .element');

    elements.forEach((element, index) => {
        element.style.animation = `floatMath ${4 + index}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Course card interactions
function setupCourseCards() {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });
}

// Resource item hover effects
function setupResourceItems() {
    const resourceItems = document.querySelectorAll('.resource-item');

    resourceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Professor card interactions
function setupProfessorCards() {
    const professorCards = document.querySelectorAll('.professor-card');

    professorCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
}

// News card interactions
function setupNewsCards() {
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

// Research card interactions
function setupResearchCards() {
    const researchCards = document.querySelectorAll('.research-card');

    researchCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.specialty-stats .number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
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
            counter.textContent = Math.floor(current).toLocaleString();
        }, step);
    });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Admission form handling
function setupAdmissionForm() {
    const admissionBtn = document.querySelector('.btn-admission');
    if (!admissionBtn) return;

    admissionBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Create a simple modal for admission
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                text-align: center;
            ">
                <h3 style="color: #4facfe; margin-bottom: 1rem;">Inscription Mathématiques</h3>
                <p style="margin-bottom: 2rem;">L'inscription en ligne sera disponible à partir du 1er juin 2025.</p>
                <form style="text-align: left;">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem;">Nom complet:</label>
                        <input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem;">Email:</label>
                        <input type="email" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem;">Téléphone:</label>
                        <input type="tel" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                    <button type="submit" style="
                        background: linear-gradient(135deg, #4facfe, #00f2fe);
                        color: white;
                        border: none;
                        padding: 0.8rem 2rem;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Pré-inscription</button>
                </form>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    margin-top: 1rem;
                    background: #666;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                ">Fermer</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle form submission
        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pré-inscription enregistrée! Vous recevrez un email de confirmation.');
            modal.remove();
        });
    });
}

// Interactive math calculator
function setupMathCalculator() {
    // Create calculator button
    const calculatorBtn = document.createElement('button');
    calculatorBtn.textContent = '🧮 Calculateur Mathématique';
    calculatorBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(79,172,254,0.3);
        z-index: 100;
        font-weight: bold;
    `;

    calculatorBtn.addEventListener('click', () => {
        const calculator = document.createElement('div');
        calculator.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 101;
            min-width: 250px;
        `;

        calculator.innerHTML = `
            <h4 style="margin: 0 0 1rem 0; color: #4facfe;">Calculateur</h4>
            <input type="text" id="calc-input" placeholder="Entrez une expression" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button class="calc-btn">7</button>
                <button class="calc-btn">8</button>
                <button class="calc-btn">9</button>
                <button class="calc-btn calc-op">÷</button>
                <button class="calc-btn">4</button>
                <button class="calc-btn">5</button>
                <button class="calc-btn">6</button>
                <button class="calc-btn calc-op">×</button>
                <button class="calc-btn">1</button>
                <button class="calc-btn">2</button>
                <button class="calc-btn">3</button>
                <button class="calc-btn calc-op">-</button>
                <button class="calc-btn">0</button>
                <button class="calc-btn calc-op">+</button>
                <button class="calc-btn calc-equals">=</button>
                <button class="calc-btn calc-clear">C</button>
            </div>
            <div id="calc-result" style="margin-top: 0.5rem; padding: 0.5rem; background: #f8f9fa; border-radius: 5px; min-height: 2rem;"></div>
        `;

        document.body.appendChild(calculator);

        // Calculator functionality
        const input = calculator.querySelector('#calc-input');
        const result = calculator.querySelector('#calc-result');
        const buttons = calculator.querySelectorAll('.calc-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.textContent;

                if (value === '=') {
                    try {
                        const expression = input.value.replace('×', '*').replace('÷', '/');
                        const calcResult = eval(expression);
                        result.textContent = calcResult;
                    } catch (e) {
                        result.textContent = 'Erreur';
                    }
                } else if (value === 'C') {
                    input.value = '';
                    result.textContent = '';
                } else {
                    input.value += value;
                }
            });
        });

        // Close calculator when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeCalc(e) {
                if (!calculator.contains(e.target) && e.target !== calculatorBtn) {
                    calculator.remove();
                    document.removeEventListener('click', closeCalc);
                }
            });
        }, 100);
    });

    document.body.appendChild(calculatorBtn);
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    setupResourceTabs();
    setupMathFormulas();
    animateFloatingElements();
    setupCourseCards();
    setupResourceItems();
    setupProfessorCards();
    setupNewsCards();
    setupResearchCards();
    animateCounters();
    setupSmoothScrolling();
    setupAdmissionForm();
    setupMathCalculator();
});

// Export functions for potential use
window.MathematicsSpecialty = {
    setupResourceTabs,
    animateCounters,
    setupMathCalculator
};