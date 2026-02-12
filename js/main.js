/**
 * AAP Infratech Limited - Main JavaScript
 * Construction & Engineering Company Website
 */

(function() {
    'use strict';

    // ===================================
    // 1. PRELOADER
    // ===================================
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hide');
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        }
    });

    // ===================================
    // 2. NAVIGATION SCROLL EFFECT
    // ===================================
    const navbar = document.getElementById('mainNav');
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ===================================
    // 3. HERO CAROUSEL INITIALIZATION
    // ===================================
    document.addEventListener('DOMContentLoaded', function() {
        const heroCarouselEl = document.getElementById('heroCarousel');
        if (heroCarouselEl) {
            const heroCarousel = new bootstrap.Carousel(heroCarouselEl, {
                interval: 3500,
                ride: true,
                pause: 'hover',
                wrap: true,
                touch: true
            });
            heroCarousel.cycle();
        }
    });

    // ===================================
    // 4. SMOOTH SCROLLING
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // ===================================
    // 5. ACTIVE NAVIGATION LINK
    // ===================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ===================================
    // 6. COUNTER ANIMATION
    // ===================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Trigger counter if already in view on load
    function checkCounters() {
        document.querySelectorAll('.counter:not(.counted)').forEach(counter => {
            const rect = counter.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom >= 0;
            if (inView) {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counter.classList.add('counted');
            }
        });
    }

    // Intersection Observer for counter animation (for scroll-triggered counters)
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Run once on load in case counters are already visible
    window.addEventListener('load', checkCounters);

    // ===================================
    // 6. PROJECT FILTERING
    // ===================================
    const projectFilters = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            projectFilters.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    const categories = item.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        item.classList.remove('hide');
                        setTimeout(() => {
                            item.style.display = 'block';
                        }, 10);
                    } else {
                        item.classList.add('hide');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // ===================================
    // 7. SCROLL TO TOP BUTTON
    // ===================================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    function toggleScrollToTop() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', toggleScrollToTop);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // 8. SCROLL REVEAL ANIMATIONS
    // ===================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Add reveal animation to elements
    const revealElements = document.querySelectorAll('.service-card, .project-card, .feature-item, .vm-item, .client-logo');
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });

    // ===================================
    // 9. PARALLAX EFFECT (HERO)
    // ===================================
    const heroSection = document.querySelector('.hero-section');
    
    function handleParallax() {
        if (heroSection && window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            heroSection.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
        }
    }

    window.addEventListener('scroll', handleParallax);

    // ===================================
    // 10. FORM VALIDATION (IF CONTACT FORM EXISTS)
    // ===================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="email"]');
            const phone = this.querySelector('input[name="phone"]');
            const message = this.querySelector('textarea[name="message"]');
            
            // Simple validation
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!phone.value.trim()) {
                showError(phone, 'Please enter your phone number');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // In production, send to backend
                showSuccess('Thank you! Your message has been sent successfully. We will contact you soon.');
                contactForm.reset();
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const formGroup = input.closest('.mb-3') || input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorDiv.className = 'error-message text-danger mt-1';
        errorDiv.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        
        input.classList.add('is-invalid');
        
        input.addEventListener('input', function() {
            input.classList.remove('is-invalid');
            if (errorDiv) errorDiv.remove();
        });
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show';
        successDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        contactForm.insertAdjacentElement('beforebegin', successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // ===================================
    // 11. LAZY LOADING IMAGES
    // ===================================
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
                
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // ===================================
    // 12. ACCORDION SMOOTH ANIMATION
    // ===================================
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add smooth transition to accordion body
            const accordionBody = this.nextElementSibling;
            if (accordionBody) {
                accordionBody.style.transition = 'all 0.3s ease';
            }
        });
    });

    // ===================================
    // 13. MOBILE MENU CLOSE ON CLICK OUTSIDE
    // ===================================
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbar.contains(e.target)) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });

    // ===================================
    // 14. PERFORMANCE OPTIMIZATION
    // ===================================
    
    // Debounce function for scroll events
    function debounce(func, wait = 10) {
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

    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(() => {
        handleNavbarScroll();
        updateActiveNavLink();
        toggleScrollToTop();
        handleParallax();
    }, 10));

    // ===================================
    // 15. CONSOLE MESSAGE
    // ===================================
    console.log('%cAAP Infratech Limited', 'color: #E63946; font-size: 24px; font-weight: bold;');
    console.log('%cEngineering & Construction Excellence', 'color: #0A2463; font-size: 14px;');
    console.log('Website developed with modern web technologies');

    // ===================================
    // 16. DETECT BROWSER AND ADD CLASS
    // ===================================
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIE = /MSIE|Trident/.test(navigator.userAgent);
    
    if (isFirefox) document.body.classList.add('firefox');
    if (isSafari) document.body.classList.add('safari');
    if (isIE) document.body.classList.add('ie');

    // ===================================
    // 17. PREVENT ORPHAN WORDS IN HEADINGS
    // ===================================
    function preventOrphans() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        headings.forEach(heading => {
            const text = heading.innerHTML;
            const words = text.trim().split(' ');
            
            if (words.length > 2) {
                words[words.length - 2] += '&nbsp;' + words[words.length - 1];
                words.pop();
                heading.innerHTML = words.join(' ');
            }
        });
    }

    preventOrphans();

    // ===================================
    // 18. HANDLE EXTERNAL LINKS
    // ===================================
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ===================================
    // 19. INITIALIZE TOOLTIPS (IF USING)
    // ===================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ===================================
    // 20. PAGE LOAD COMPLETE
    // ===================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger animations for elements in viewport on load
        const elementsInView = document.querySelectorAll('.animate-on-load');
        elementsInView.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, index * 100);
        });
    });

})();

// ===================================
// ADDITIONAL UTILITY FUNCTIONS
// ===================================

// Get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Smooth scroll to element
function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Copy to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Show notification
    console.log('Copied to clipboard:', text);
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.AAPUtils = {
        getQueryParam,
        scrollToElement,
        formatPhoneNumber,
        copyToClipboard
    };
}