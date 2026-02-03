// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only smooth scroll for same-page anchors
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Avatar card hover effect
    const avatarCards = document.querySelectorAll('.avatar-card');
    avatarCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Set current year in footer
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });
    
    // Highlight current page in navigation
    highlightCurrentPage();
    
    // Initialize modal functionality if on kipfel page
    if (window.location.pathname.includes('kipfel.html') || 
        window.location.pathname.endsWith('kipfel') ||
        (window.location.pathname === '/' && document.querySelector('.avatar-link'))) {
        initAvatarModal();
    }
    
    // Initialize contact form if on information page
    if (window.location.pathname.includes('information.html')) {
        initContactForm();
    }
    
    // Add animation to elements when they come into view
    initScrollAnimations();
    
    // Gallery item animations
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-menu a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        // Remove .html extension for comparison
        const cleanCurrentPage = currentPage.replace('.html', '');
        const cleanItemHref = itemHref.replace('.html', '');
        
        if (cleanCurrentPage === cleanItemHref || 
            (cleanCurrentPage === '' && cleanItemHref === 'index')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Avatar Modal Functionality
function initAvatarModal() {
    const modal = document.getElementById('avatarModal');
    const closeModal = document.querySelector('.close-modal');
    const avatarLinks = document.querySelectorAll('.avatar-link');
    
    if (!modal) return;
    
    // Avatar details data
    const avatarDetails = {
        'Crabcore Kipfel': {
            description: 'A cute cat-like avatar with crab-inspired accessories. Perfect for beach-themed VR worlds!',
            features: ['Crab claw hands', 'Shell backpack', 'Beach-themed outfit', 'Custom animations'],
            status: 'Available',
            platforms: ['VRChat', 'ChilloutVR'],
            colors: ['Red', 'Blue', 'Orange']
        },
        'Blahaj Kipfel': {
            description: 'Shark-themed Kipfel with a soft, huggable design. Comes with a mini Blahaj plushie accessory!',
            features: ['Shark fin hood', 'Blahaj plushie', 'Soft texture', 'Swimming animations'],
            status: 'Available',
            platforms: ['VRChat'],
            colors: ['Blue', 'Gray', 'Pastel']
        },
        'Paniell Kipfel': {
            description: 'Bakery-inspired Kipfel with bread and pastry elements. Even has a cookie-scented texture!',
            features: ['Bread loaf hat', 'Cookie accessories', 'Bakery outfit', 'Food-themed emotes'],
            status: 'In Development',
            platforms: ['VRChat', 'NeosVR'],
            colors: ['Golden Brown', 'Cream', 'White']
        },
        'Lunar Kipfel': {
            description: 'Space-themed Kipfel with galaxy patterns and glowing star accessories.',
            features: ['Glowing stars', 'Galaxy texture', 'Moon phase toggles', 'Space helmet'],
            status: 'Available',
            platforms: ['VRChat', 'ChilloutVR', 'NeosVR'],
            colors: ['Purple', 'Blue', 'Black']
        },
        'Gamer Kipfel': {
            description: 'Kipfel dressed in gaming gear with RGB lighting and controller accessories.',
            features: ['RGB lighting', 'Gaming headset', 'Controller props', 'Game HUD visor'],
            status: 'Available',
            platforms: ['VRChat'],
            colors: ['RGB Custom', 'Black', 'Neon Green']
        },
        'Pride Kipfel': {
            description: 'Rainbow-themed Kipfel celebrating diversity and inclusion in the VR community.',
            features: ['Rainbow gradient', 'Pride flag cape', 'Inclusive pronouns', 'Custom emotes'],
            status: 'Available',
            platforms: ['VRChat', 'ChilloutVR'],
            colors: ['Rainbow', 'Trans flag', 'Progress pride']
        }
    };
    
    // Function to show avatar details in modal
    function showAvatarDetails(avatarName) {
        const details = avatarDetails[avatarName] || {
            description: 'Details coming soon!',
            features: ['More information being added'],
            status: 'Unknown',
            platforms: ['Check back later'],
            colors: ['Multiple variants']
        };
        
        // Build modal content
        const modalContent = document.getElementById('modalAvatarContent');
        modalContent.innerHTML = `
            <h2 id="modalAvatarTitle">${avatarName}</h2>
            <div class="modal-avatar-info">
                <p class="modal-description">${details.description}</p>
                
                <div class="modal-details">
                    <div class="detail-section">
                        <h4><i class="fas fa-star"></i> Features</h4>
                        <ul class="features-list">
                            ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-stats">
                        <div class="stat">
                            <span class="stat-label">Status:</span>
                            <span class="stat-value ${details.status === 'Available' ? 'available' : 'development'}">${details.status}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Platforms:</span>
                            <span class="stat-value">${details.platforms.join(', ')}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Colors:</span>
                            <span class="stat-value">${details.colors.join(', ')}</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn modal-btn" onclick="requestAvatar('${avatarName}')">
                        <i class="fas fa-shopping-cart"></i> Request This Avatar
                    </button>
                    <button class="btn secondary modal-btn" onclick="closeAvatarModal()">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Add click effect to the clicked link
        const clickedLink = document.querySelector(`.avatar-link[onclick*="${avatarName}"]`);
        if (clickedLink) {
            clickedLink.classList.add('clicked');
            setTimeout(() => clickedLink.classList.remove('clicked'), 300);
        }
    }
    
    // Close modal function
    function closeAvatarModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', closeAvatarModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeAvatarModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeAvatarModal();
        }
    });
    
    // Attach click events to avatar links
    avatarLinks.forEach(link => {
        // Remove any existing onclick to avoid duplicates
        const originalOnClick = link.getAttribute('onclick');
        link.removeAttribute('onclick');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const avatarName = this.textContent.trim();
            showAvatarDetails(avatarName);
        });
        
        // Also handle links with onclick attributes from HTML
        if (originalOnClick) {
            link.setAttribute('onclick', originalOnClick);
        }
    });
    
    // Global function for HTML onclick attributes
    window.showAvatarDetails = showAvatarDetails;
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields!');
            return;
        }
        
        // In a real website, you would send this data to a server
        // For GitHub Pages, we'll just show a success message
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
        
        // Reset form
        this.reset();
        
        // Visual feedback
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#20C997';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
        }, 2000);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('gallery-item') || 
                    entry.target.classList.contains('avatar-card') ||
                    entry.target.classList.contains('info-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                    entry.target.style.animationDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.gallery-item, .avatar-card, .feature, .info-card, .section-header'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Avatar Request Function
function requestAvatar(avatarName) {
    alert(`You've requested: ${avatarName}\n\nFor actual requests, this would redirect to a commission form or contact page.`);
    
    // In a real implementation, you might:
    // 1. Redirect to a contact form with the avatar name pre-filled
    // 2. Open an email client with a template
    // 3. Redirect to a commission page
    
    // For now, just close the modal
    const modal = document.getElementById('avatarModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close Avatar Modal (global function)
function closeAvatarModal() {
    const modal = document.getElementById('avatarModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Add some CSS for the modal animations
const style = document.createElement('style');
style.textContent = `
    .animated {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .avatar-link.clicked {
        animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .modal-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin: 2rem 0;
    }
    
    @media (max-width: 768px) {
        .modal-details {
            grid-template-columns: 1fr;
        }
    }
    
    .detail-section h4 {
        color: var(--primary);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .features-list {
        list-style: none;
        padding-left: 0;
    }
    
    .features-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 1.5rem;
    }
    
    .features-list li:before {
        content: '✓';
        color: var(--success);
        position: absolute;
        left: 0;
    }
    
    .modal-stats {
        background: #f8f9ff;
        padding: 1.5rem;
        border-radius: var(--radius);
    }
    
    .stat {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .stat:last-child {
        margin-bottom: 0;
        border-bottom: none;
        padding-bottom: 0;
    }
    
    .stat-label {
        font-weight: 600;
        color: var(--dark);
    }
    
    .stat-value {
        font-weight: 500;
    }
    
    .stat-value.available {
        color: var(--success);
    }
    
    .stat-value.development {
        color: var(--warning);
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .modal-btn {
        flex: 1;
    }
    
    .modal-description {
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--dark);
        background: #f8f9ff;
        padding: 1.5rem;
        border-radius: var(--radius);
        margin-bottom: 1.5rem;
    }
`;
document.head.appendChild(style);