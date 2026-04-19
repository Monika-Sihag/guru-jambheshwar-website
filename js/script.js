// name=js/script.js url=https://github.com/Monika-Sihag/guru-mandir-website/blob/main/js/script.js
// ========== IMAGE SLIDER FUNCTIONALITY ==========
let slideIndex = 1;
let slideInterval;

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    startAutoSlide();
    setupHamburgerMenu();
    setActiveNavLink();
});

// Auto slide every 5 seconds
function startAutoSlide() {
    slideInterval = setInterval(function() {
        changeSlide(1);
    }, 5000);
}

// Clear interval and restart on user interaction
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Next/Previous slide
function changeSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex += n);
    resetAutoSlide();
}

// Current slide based on dot click
function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    resetAutoSlide();
}

// Show slides
function showSlides(n) {
    let slides = document.getElementsByClassName('slide');
    let dots = document.getElementsByClassName('dot');

    // Wrap around if n is out of range
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('fade');
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    // Show current slide and highlight dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('fade');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// ========== HAMBURGER MENU FUNCTIONALITY ==========
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// ========== SET ACTIVE NAV LINK ==========
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========== SMOOTH SCROLL BEHAVIOR ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== LAZY LOADING FOR IMAGES ==========
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
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

    images.forEach(img => imageObserver.observe(img));
}

// ========== PREVENT ACCIDENTAL PAGE EXITS ==========
let pageModified = false;

window.addEventListener('beforeunload', function(e) {
    if (pageModified) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// ========== KEYBOARD NAVIGATION FOR SLIDER ==========
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (event.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// ========== MOBILE TOUCH SWIPE FOR SLIDER ==========
let touchStartX = 0;
let touchEndX = 0;

const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left - next slide
        changeSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swiped right - previous slide
        changeSlide(-1);
    }
}

// ========== CONSOLE WELCOME MESSAGE ==========
console.log('%c🏛️ Welcome to Guru Jambheshwar Mandir Parta', 'color: #C41E3A; font-size: 20px; font-weight: bold;');
console.log('%cA Sacred Place of Divine Blessings', 'color: #FFD700; font-size: 14px;');
console.log('%cFor more information, visit our website!', 'color: #333333; font-size: 12px;');