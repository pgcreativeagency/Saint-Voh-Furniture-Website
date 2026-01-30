/**
* Saint Voh Furniture
* Main JavaScript File
*/

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. MOBILE NAVIGATION
    // =========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        // Toggle Menu
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Icon animation switch (optional polish)
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // =========================================
    // 2. HEADER SCROLL EFFECT
    // =========================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        } else {
            header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
        }
    });

    // =========================================
    // 3. PRODUCT CATEGORY FILTERING (Gallery)
    // =========================================
    const tabs = document.querySelectorAll('.tab');
    const productCards = document.querySelectorAll('.product-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const filterValue = tab.textContent.trim();

            productCards.forEach(card => {
                const categoryElement = card.querySelector('.category');
                const category = categoryElement.textContent.trim();

                if (filterValue === 'All' || category === filterValue) {
                    card.style.display = 'block';
                    // subtle fade in animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // =========================================
    // 4. SCROLL ANIMATIONS (Intersection Observer)
    // =========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add fade-up animation class if not present on load
                if (!entry.target.classList.contains('animate-fade-up')) {
                    entry.target.style.animation = "fadeUp 0.8s ease forwards";
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.product-card, .section-title, .section-desc, .contact-info, .contact-map');

    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Hide initially
        el.style.transform = 'translateY(20px)'; // Init position
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        // Override style for intersection observer handling
        observer.observe(el);
    });

    // Add logic for 'visible' class
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // =========================================
    // 5. WHATSAPP BUTTON TRACKING (Optional Polish)
    // =========================================
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');

    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Visual feedback
            const originalText = btn.innerHTML;

            // Just a console log for "professional tracking" simulation
            console.log(`Order initiated for: ${btn.parentElement.querySelector('.product-name').textContent}`);
        });
    });

});
