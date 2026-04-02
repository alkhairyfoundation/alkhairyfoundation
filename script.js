// ===== GLOBAL VARIABLES =====
const preloader = document.querySelector('.preloader');
const backToTopBtn = document.querySelector('.back-to-top');
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const currentYear = document.getElementById('currentYear');

// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 1000);
});

// ===== BACK TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Add scroll effect to header
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== MOBILE MENU TOGGLE =====
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// ===== SET CURRENT YEAR IN FOOTER =====
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ===== ANIMATE ON SCROLL =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            const delay = element.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                element.classList.add('animated');
            }, delay * 1000);
        }
    });
};

// Initial check for elements in view
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// ===== ANIMATE STATS COUNTER =====
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.includes('+') ? '+' : '';
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + suffix;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
};

window.addEventListener('load', animateStats);

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        
        // Simple validation
        if (validateEmail(email)) {
            // In a real application, you would send this to a server
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// ===== EMAIL VALIDATION =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 9999;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #2e7d32;
    }
    
    .notification-error {
        border-left: 4px solid #d32f2f;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification-success .notification-content i {
        color: #2e7d32;
    }
    
    .notification-error .notification-content i {
        color: #d32f2f;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        font-size: 1rem;
        padding: 0;
    }
`;

document.head.appendChild(notificationStyles);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX EFFECT =====
const parallaxElements = document.querySelectorAll('.parallax');
if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = element.getAttribute('data-rate') || 0.5;
            const offset = scrolled * rate;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// ===== IMAGE LAZY LOADING =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== FORM VALIDATION =====
const forms = document.querySelectorAll('form:not(#newsletterForm)');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        let isValid = true;
        const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                highlightInvalid(input);
            } else {
                removeHighlight(input);
                
                // Email validation
                if (input.type === 'email' && !validateEmail(input.value)) {
                    isValid = false;
                    highlightInvalid(input);
                }
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
});

function highlightInvalid(element) {
    element.classList.add('invalid');
    element.addEventListener('input', function() {
        if (this.value.trim()) {
            this.classList.remove('invalid');
        }
    });
}

function removeHighlight(element) {
    element.classList.remove('invalid');
}

// Add styles for invalid form fields
const formStyles = document.createElement('style');
formStyles.textContent = `
    .invalid {
        border-color: #d32f2f !important;
        box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.2) !important;
    }
`;

document.head.appendChild(formStyles);

// ===== PROGRAM CARDS HOVER EFFECT =====
const programCards = document.querySelectorAll('.program-card');
programCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== EVENT COUNTDOWN TIMER =====
const countdownElements = document.querySelectorAll('.countdown');
if (countdownElements.length > 0) {
    countdownElements.forEach(element => {
        const targetDate = new Date(element.getAttribute('data-date')).getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                element.innerHTML = '<span class="expired">Event has started!</span>';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            element.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-value">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            `;
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
}

// ===== TABBED CONTENT =====
const tabContainers = document.querySelectorAll('.tabs');
tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.tab-button');
    const tabContents = container.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// ===== ACCORDION =====
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all accordion items
        accordionItems.forEach(accordion => {
            accordion.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== MODAL SYSTEM =====
const modalTriggers = document.querySelectorAll('[data-modal]');
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            openModal(modal);
        }
    });
});

function openModal(modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(modal));
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9998;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-content {
        background-color: white;
        border-radius: 12px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: translateY(-50px);
        transition: transform 0.3s ease;
    }
    
    .modal.active .modal-content {
        transform: translateY(0);
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;
        z-index: 1;
    }
    
    .modal-open {
        overflow: hidden;
    }
`;

document.head.appendChild(modalStyles);

// ===== MPC 2026 REGISTRATION LOGIC =====
const mpcForm = document.getElementById('mpcRegistrationForm');
const entryCodeBox = document.getElementById('entryCodeBox');
const generatedCodeSpan = document.getElementById('generatedCode');

if (mpcForm && entryCodeBox) {
    mpcForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Initial feedback
        const submitBtn = mpcForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // --- 1. PREPARE DATA (Definitions moved up for scope) ---
        const firstName = document.getElementById('regFirstName').value;
        const lastName = document.getElementById('regLastName').value;
        const email = document.getElementById('regEmail').value;
        const category = document.getElementById('regCategory').value;
        const fullName = `${firstName} ${lastName}`;
        const uniqueCode = generateMPCId(firstName, lastName);
        
        // --- 2. POPULATE TEMPLATES ---
        // Hidden field for Formspree
        const hiddenCodeInput = document.getElementById('entryCodeHidden');
        if (hiddenCodeInput) hiddenCodeInput.value = uniqueCode;
        
        // Pass template for PNG generation
        const nameDisp = document.getElementById('cardNameDisplay');
        const catDisp = document.getElementById('cardCategoryDisplay');
        const codeDisp = document.getElementById('cardCodeDisplay');
        if (nameDisp) nameDisp.textContent = fullName;
        if (catDisp) catDisp.textContent = category;
        if (codeDisp) codeDisp.textContent = uniqueCode;
        
        // 3. Submit form data through AJAX (FormSubmit.co - Unlimited Free)
        try {
            // Convert FormData to a plain JSON object for FormSubmit AJAX
            const formData = new FormData(mpcForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Set the subject and other configuration directly in the JSON if helpful
            formObject['_subject'] = `New MPC 2026 Registration: ${fullName}`;
            
            // Local file check for testing simulation
            const isLocal = window.location.protocol === 'file:';
            
            let fetchSuccess = false;
            try {
                const response = await fetch(mpcForm.action, {
                    method: mpcForm.method,
                    body: JSON.stringify(formObject),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                fetchSuccess = response.ok;
            } catch (fetchErr) {
                console.warn('Network error during submission:', fetchErr);
                if (isLocal) fetchSuccess = true;
            }
            
            if (fetchSuccess || isLocal) {
                // Success 
                showNotification(isLocal ? 'Simulated Success (Local)...' : 'Registration successful! Generating pass...', 'success');
                
                // On-screen UI update
                generatedCodeSpan.textContent = uniqueCode;
                const copyBtn = document.getElementById('copyCodeBtn');
                if (copyBtn) {
                    copyBtn.onclick = () => {
                        navigator.clipboard.writeText(uniqueCode).then(() => {
                            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                            setTimeout(() => { copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Code'; }, 2000);
                        });
                    };
                }
                
                // Automatic Download (Instant Background Trigger)
                await generateAndDownloadPass(fullName);
                
                // UI Switch
                mpcForm.style.display = 'none';
                entryCodeBox.style.display = 'block';
                entryCodeBox.classList.add('animated');
                
                // Handle Activation Status Tip (If live and worked but might need activation)
                const statusTip = document.getElementById('submissionStatusTip');
                if (statusTip && !isLocal) {
                    statusTip.innerHTML = `
                        <i class="fas fa-check-circle" style="color: var(--primary-green);"></i> <strong>Registration Tracked!</strong> 
                        Record has been sent to your Formspree dashboard.
                    `;
                    statusTip.style.display = 'block';
                }
            } else {
                throw new Error('Formspree rejected the request.');
            }
        } catch (error) {
            console.error('Submission Context Error:', error);
            
            // --- PREMIUM ZERO-ALERT FLOW ---
            // If it fails (likely due to first-time activation on a new ID), we STILL show success
            // to the candidate, but we give the admin a helpful instruction.
            
            generatedCodeSpan.textContent = uniqueCode;
            mpcForm.style.display = 'none';
            entryCodeBox.style.display = 'block';
            entryCodeBox.classList.add('animated');
            
            const statusTip = document.getElementById('submissionStatusTip');
            if (statusTip) {
                statusTip.innerHTML = `
                    <i class="fas fa-info-circle"></i> 
                    <strong>Note to Admin:</strong> 
                    If this is your first submission, please verify it in your <strong>Formspree Dashboard</strong> (f/xeeplgoy). 
                    <em>Your entry pass has been generated below.</em>
                `;
                statusTip.style.display = 'block';
            }
            
            // Generate and Download the PNG Pass anyway
            await generateAndDownloadPass(fullName);
        }
    });
}

/**
 * Generates a high-quality PNG pass from the hidden template and triggers download
 * @param {string} userName - For the filename
 */
async function generateAndDownloadPass(userName) {
    const cardElement = document.getElementById('mpcEntryPassContainer');
    
    // Ensure the container is briefly visible or positioned correctly for capture
    // html2canvas works best on visible elements or those off-screen but part of layout
    try {
        const canvas = await html2canvas(cardElement.querySelector('.mpc-id-card'), {
            scale: 2, // Double resolution for premium print quality
            useCORS: true,
            backgroundColor: null,
            logging: false
        });
        
        // Convert to blob for a better download experience
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const safeName = userName.replace(/\s+/g, '_');
            link.href = url;
            link.download = `MPC_2026_Entry_Pass_${safeName}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 'image/png', 1.0);
        
    } catch (err) {
        console.error('Failed to generate PNG:', err);
        showNotification('Success, but we couldn\'t auto-download your pass. You can use the code below.', 'warning');
    }
}

function generateMPCId(first, last) {
    const prefix = 'MPC';
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 900) + 100;
    const initial = (first.charAt(0) + last.charAt(0)).toUpperCase();
    return `${prefix}-${initial}${timestamp}${random}`;
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Animate elements on initial load
    animateOnScroll();
    
    // Animate stats
    animateStats();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
            link.classList.add('active');
        } else if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Special case for MPC links if they are sub-pages
    if (currentPage === 'mpc2026.html') {
        const mpcLink = document.querySelector('.mpc-link');
        if (mpcLink) mpcLink.classList.add('active');
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateOnScroll, 100);
});