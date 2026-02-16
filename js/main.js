/**
 * Wedding Invitation - Rached & Nourchene
 * Interactive JavaScript for seal animation, countdown, and scroll effects
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initSealAnimation();
    initCountdown();
    initScrollReveal();
});

/**
 * Seal Opening Animation
 * Handles the wax seal click to reveal the invitation content
 */
function initSealAnimation() {
    const waxSeal = document.getElementById('wax-seal');
    const envelopeSection = document.getElementById('envelope-section');
    const mainContent = document.getElementById('main-content');
    const bgVideo = document.getElementById('bg-video');

    if (!waxSeal || !envelopeSection || !mainContent) return;

    waxSeal.addEventListener('click', function() {
        // Add opening class to trigger animations
        envelopeSection.classList.add('opening');

        // After seal breaks, fade out envelope and show content
        setTimeout(function() {
            envelopeSection.classList.add('opened');

            // Show main content
            mainContent.classList.remove('hidden');
            mainContent.classList.add('fade-in');

            // Play background video
            if (bgVideo) {
                bgVideo.play().catch(function(error) {
                    console.log('Video autoplay failed:', error);
                });
            }

            // Enable scrolling
            document.body.style.overflow = 'auto';

            // Trigger reveal animations for visible sections
            setTimeout(function() {
                checkReveal();
            }, 500);
        }, 800);
    });

    // Prevent scrolling while envelope is visible
    document.body.style.overflow = 'hidden';
}

/**
 * Countdown Timer
 * Counts down to the wedding date: March 29, 2026
 */
function initCountdown() {
    // Wedding date: March 29, 2026 at 16:00 (4 PM)
    const weddingDate = new Date('March 29, 2026 16:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // If countdown is finished
        if (distance < 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update with animation
        updateWithAnimation(daysEl, days.toString());
        updateWithAnimation(hoursEl, hours.toString().padStart(2, '0'));
        updateWithAnimation(minutesEl, minutes.toString().padStart(2, '0'));
        updateWithAnimation(secondsEl, seconds.toString().padStart(2, '0'));
    }

    function updateWithAnimation(element, newValue) {
        if (element.textContent !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.textContent = newValue;
            setTimeout(function() {
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Initial update
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
}

/**
 * Scroll Reveal Animation
 * Adds reveal animations to sections as they come into view
 */
function initScrollReveal() {
    // Add reveal class to sections
    const sections = document.querySelectorAll('.countdown-section, .details-section, .program-section, .gallery-section');

    sections.forEach(function(section) {
        section.classList.add('reveal');
    });

    // Add reveal class to individual items for staggered animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const detailCards = document.querySelectorAll('.detail-card');

    timelineItems.forEach(function(item, index) {
        item.classList.add('reveal');
        item.style.transitionDelay = (index * 0.1) + 's';
    });

    galleryItems.forEach(function(item, index) {
        item.classList.add('reveal');
        item.style.transitionDelay = (index * 0.1) + 's';
    });

    detailCards.forEach(function(item, index) {
        item.classList.add('reveal');
        item.style.transitionDelay = (index * 0.15) + 's';
    });

    // Listen for scroll events
    window.addEventListener('scroll', checkReveal);

    // Initial check
    checkReveal();
}

/**
 * Check which elements should be revealed based on scroll position
 */
function checkReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

/**
 * Smooth scroll for navigation (if needed in future)
 */
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Parallax effect for hero section (optional enhancement)
 */
function initParallax() {
    const hero = document.querySelector('.welcome-section');

    if (!hero) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = rate + 'px';
        }
    });
}

// Initialize parallax (optional - uncomment to enable)
// initParallax();

/**
 * Add touch support for mobile devices
 */
document.addEventListener('touchstart', function() {
    // Enable touch for seal
}, { passive: true });

/**
 * Preload critical images for better UX
 */
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80',
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80'
    ];

    images.forEach(function(src) {
        const img = new Image();
        img.src = src;
    });
}

// Preload images on load
window.addEventListener('load', preloadImages);
