// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }));

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Optimized navbar background change on scroll with throttling
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)';
        navbar.style.borderBottom = '2px solid #00d4ff';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)';
        navbar.style.borderBottom = '2px solid #00d4ff';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Optimized Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in-up animation for general sections
            entry.target.classList.add('fade-in-up');
            
            // Add section-specific animations
            if (entry.target.classList.contains('hero')) {
                entry.target.classList.add('animate');
                // Trigger slide-up animation for hero title
                const heroTitle = entry.target.querySelector('.hero-title .highlight');
                if (heroTitle) {
                    heroTitle.classList.add('animate');
                }
            } else if (entry.target.classList.contains('about')) {
                entry.target.classList.add('animate');
            } else if (entry.target.classList.contains('skills')) {
                entry.target.classList.add('animate');
            } else if (entry.target.classList.contains('projects')) {
                entry.target.classList.add('animate');
            } else if (entry.target.classList.contains('experience')) {
                entry.target.classList.add('animate');
            } else if (entry.target.classList.contains('contact')) {
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Trigger hero animation on page load
window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('animate');
            // Trigger the highlight animation immediately
            const heroTitle = heroSection.querySelector('.hero-title .highlight');
            if (heroTitle) {
                heroTitle.classList.add('animate');
            }
        }, 100);
    }
});

// Simplified Particle Generation - Reduced count for better performance
function createDynamicParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Create fewer dynamic particles for better performance
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle dynamic-particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
            animation-duration: ${Math.random() * 5 + 5}s;
            opacity: ${Math.random() * 0.3 + 0.2};
        `;
        particlesContainer.appendChild(particle);
    }
}

// Simplified Interactive Particle Effect - Reduced frequency
function createInteractiveParticles(e) {
    const particle = document.createElement('div');
    particle.className = 'particle interactive-particle';
    particle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 3px;
        height: 3px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: interactiveFloat 1.5s ease-out forwards;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1500);
}

// Add interactive particle effect on mouse move (throttled and reduced frequency)
let mouseMoveTimeout;
document.addEventListener('mousemove', (e) => {
    if (mouseMoveTimeout) return;
    mouseMoveTimeout = setTimeout(() => {
        if (Math.random() < 0.05) { // Reduced to 5% chance to create particle
            createInteractiveParticles(e);
        }
        mouseMoveTimeout = null;
    }, 100); // Increased throttle time
});

// Simplified Energy Field Effect
function createEnergyField() {
    const energyField = document.createElement('div');
    energyField.className = 'energy-field';
    energyField.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 212, 255, 0.01) 50%, transparent 100%);
        pointer-events: none;
        z-index: -1;
        animation: energyPulse 10s infinite ease-in-out;
    `;
    document.body.appendChild(energyField);
}

// Simplified Matrix Rain Effect - Reduced complexity
function createMatrixRain() {
    const matrixContainer = document.getElementById('matrixRain');
    if (!matrixContainer) return;

    const columns = Math.floor(window.innerWidth / 30); // Reduced column density
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = i * 30 + 'px';
        column.style.animationDuration = (Math.random() * 4 + 3) + 's';
        column.style.animationDelay = Math.random() * 3 + 's';

        let text = '';
        for (let j = 0; j < 15; j++) { // Reduced text length
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;

        matrixContainer.appendChild(column);
    }
}

// Simplified Enhanced Particle System - Reduced count
function createEnhancedParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Add fewer dynamic particles
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Simplified Cyber Orb Animation
function createCyberOrbs() {
    const orbs = document.querySelectorAll('.cyber-orb');
    orbs.forEach((orb, index) => {
        orb.style.animationDelay = index * 4 + 's';
        orb.style.left = (20 + index * 30) + '%';
        orb.style.top = (30 + index * 20) + '%';
    });
}

// Simplified Hover Effects - Reduced complexity
function addEnhancedHoverEffects() {
    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Simplified Scroll Effects
function addEnhancedScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to children
                const animatedElements = entry.target.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 150); // Increased delay for better performance
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Simplified Navigation Effects
function addEnhancedNavigationEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 8px var(--primary-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
}

// Initialize all enhanced effects with performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Only create heavy effects on desktop
    if (window.innerWidth > 768) {
        createMatrixRain();
        createEnhancedParticles();
        createCyberOrbs();
    }
    
    addEnhancedHoverEffects();
    addEnhancedScrollEffects();
    addEnhancedNavigationEffects();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Mobile-specific optimizations
if (window.innerWidth <= 768) {
    // Disable heavy effects on mobile
    const heavyElements = document.querySelectorAll('.particles, .matrix-rain, .glow-orb, .cyber-orb, .energy-line, .holographic-overlay');
    heavyElements.forEach(element => {
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // Reduce animation complexity on mobile
    const animatedElements = document.querySelectorAll('.hero-title::before, .hero-description::before');
    animatedElements.forEach(element => {
        if (element) {
            element.style.animation = 'none';
        }
    });
    
    // Optimize scroll performance on mobile
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Only update navbar on scroll end
            updateNavbar();
        }, 100);
    });
}

// Enhanced navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.2), 0 0 40px rgba(0, 212, 255, 0.05)';
    }
    
    lastScrollTop = scrollTop;
});

// Enhanced scroll indicator
const scrollArrow = document.querySelector('.scroll-arrow');
if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 80; // Account for fixed navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .skill-category, .project-card, .timeline-item, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .skill-category.animate, .project-card.animate, .timeline-item.animate, .contact-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Enhanced accessibility
document.addEventListener('keydown', (e) => {
    // Skip to main content
    if (e.key === 'Tab' && e.target === document.body) {
        e.preventDefault();
        document.querySelector('main')?.focus();
    }
});

// Add focus styles for better accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced mobile experience
if ('ontouchstart' in window) {
    // Add touch-specific styles and behaviors
    document.body.classList.add('touch-device');
    
    // Improve touch targets
    document.querySelectorAll('button, a, .skill-item, .project-card').forEach(element => {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
    });
}

// Add loading animation with performance optimization
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize futuristic effects only on desktop
    if (window.innerWidth > 768) {
        createDynamicParticles();
        createEnergyField();
    }
});

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Optimize image loading
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Add print styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .navbar, .scroll-to-top, .hamburger, .hero-buttons, .contact-form {
            display: none !important;
        }
        
        body {
            background: white !important;
            color: black !important;
        }
        
        .section-title {
            color: black !important;
        }
        
        .project-card, .skill-category, .timeline-content {
            box-shadow: none !important;
            border: 1px solid #ccc !important;
        }
    }
    
    @keyframes interactiveFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes energyPulse {
        0%, 100% {
            opacity: 0.02;
            transform: scale(1);
        }
        50% {
            opacity: 0.05;
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(printStyles); 