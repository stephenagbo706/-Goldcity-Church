// ============================================================
// SLIDESHOW
// ============================================================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const currentNum = document.getElementById('currentSlideNum');
const totalNum = document.getElementById('totalSlidesNum');
const heroSlider = document.getElementById('home');
let currentSlide = 0;
let slideInterval;
let isTransitioning = false;

totalNum.textContent = String(slides.length).padStart(2, '0');

function showSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    currentNum.textContent = String(currentSlide + 1).padStart(2, '0');

    setTimeout(() => {
        isTransitioning = false;
    }, 1200);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5500);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

// Dot click navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index === currentSlide) return;
        stopSlideshow();
        showSlide(index);
        startSlideshow();
    });
});

// Arrow navigation
nextBtn.addEventListener('click', () => {
    stopSlideshow();
    nextSlide();
    startSlideshow();
});

prevBtn.addEventListener('click', () => {
    stopSlideshow();
    prevSlide();
    startSlideshow();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    }
    if (e.key === 'ArrowLeft') {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    }
});

// Pause on hover
heroSlider.addEventListener('mouseenter', stopSlideshow);
heroSlider.addEventListener('mouseleave', startSlideshow);

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;
heroSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

heroSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        stopSlideshow();
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        startSlideshow();
    }
}, { passive: true });

// Start the slideshow
startSlideshow();

// ============================================================
// MOBILE MENU
// ============================================================
const menuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    menuBtn.setAttribute('aria-expanded', isExpanded);
    menuBtn.textContent = isExpanded ? '✕' : '☰';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
    });
});

// ============================================================
// SMOOTH SCROLL WITH HEADER OFFSET
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================
// HEADER SHADOW ON SCROLL
// ============================================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }
});