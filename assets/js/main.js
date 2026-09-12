/* ========================================
   TECHNEXUS - MAIN JAVASCRIPT
   ======================================== */

(function() {
    'use strict';

    // ========================================
    // 1. NAVBAR - SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // 2. HAMBURGER MENU
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ========================================
    // 3. ACTIVE NAVIGATION LINK
    // ========================================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a:not(.btn-nav-cta)');
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === fileName || 
                (fileName === '' && linkHref === 'index.html') ||
                (fileName === '/' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setActiveNavLink);
    } else {
        setActiveNavLink();
    }

    // ========================================
    // 4. BACK TO TOP BUTTON
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ========================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.about-card, .blog-card, .project-card, .cta-wrapper'
        );

        if (revealElements.length === 0) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.classList.add('revealed');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(function(el) {
            el.classList.add('hidden');
            observer.observe(el);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveal);
    } else {
        initScrollReveal();
    }

    // ========================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 7. KEYBOARD ACCESSIBILITY
    // ========================================
    if (hamburger) {
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('tabindex', '0');
        
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // ========================================
    // 8. DYNAMIC YEAR IN FOOTER
    // ========================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
    }

    // ========================================
    // 9. CONSOLE WELCOME
    // ========================================
    console.log('%c🚀 TechNexus', 'font-size: 24px; font-weight: bold; color: #8B5CF6;');
    console.log('%cA tech blog by Aayansh Vaibhav', 'font-size: 16px; color: #06B6D4;');
    console.log('%cBuilt with ❤️', 'font-size: 14px; color: #A1A1AA;');

})();

// ========================================
// 10. CONTACT FORM VALIDATION
// ========================================
(function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('contactName');
            const email = document.getElementById('contactEmail');
            const message = document.getElementById('contactMessage');
            
            const errorMessages = [];
            
            if (!name || name.value.trim().length < 2) {
                isValid = false;
                errorMessages.push('Please enter your full name.');
                if (name) name.classList.add('error');
            } else if (name) {
                name.classList.remove('error');
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email.value.trim())) {
                isValid = false;
                errorMessages.push('Please enter a valid email address.');
                if (email) email.classList.add('error');
            } else if (email) {
                email.classList.remove('error');
            }
            
            if (!message || message.value.trim().length < 10) {
                isValid = false;
                errorMessages.push('Please enter a message (minimum 10 characters).');
                if (message) message.classList.add('error');
            } else if (message) {
                message.classList.remove('error');
            }
            
            const errorContainer = document.getElementById('formErrors');
            const successContainer = document.getElementById('formSuccess');
            
            if (!isValid) {
                if (errorContainer) {
                    errorContainer.innerHTML = errorMessages.map(msg => 
                        `<p style="color: #EF4444; margin: 4px 0;">⚠️ ${msg}</p>`
                    ).join('');
                    errorContainer.style.display = 'block';
                }
                if (successContainer) {
                    successContainer.style.display = 'none';
                }
            } else {
                if (errorContainer) {
                    errorContainer.style.display = 'none';
                }
                if (successContainer) {
                    successContainer.innerHTML = `
                        <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.3);">
                            <p style="color: #10B981; font-size: 1.1rem;">✅ Thanks for reaching out!</p>
                            <p style="color: #A1A1AA; margin-top: 8px;">I'll get back to you soon.</p>
                        </div>
                    `;
                    successContainer.style.display = 'block';
                }
                contactForm.reset();
            }
        });
        
        contactForm.querySelectorAll('input, textarea').forEach(function(field) {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                const errorContainer = document.getElementById('formErrors');
                if (errorContainer) {
                    errorContainer.style.display = 'none';
                }
            });
        });
    }
})();

console.log('TechNexus v1.0.0 loaded successfully ✅');
