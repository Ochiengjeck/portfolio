// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const skillBars = document.querySelectorAll('.skill-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialWrapper = document.querySelector('.testimonial-wrapper');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevTestimonialBtn = document.querySelector('.prev-testimonial');
const nextTestimonialBtn = document.querySelector('.next-testimonial');
const testimonialDots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contact-form');

// Background Animation
function createBgAnimation() {
    const bgAnimation = document.querySelector('.bg-animation');
    for (let i = 0; i < 20; i++) {
        const span = document.createElement('span');
        const size = Math.random() * 30 + 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 10;

        span.style.width = size + 'px';
        span.style.height = size + 'px';
        span.style.top = top + '%';
        span.style.left = left + '%';
        span.style.animationDelay = delay + 's';
        span.style.animationDuration = duration + 's';

        bgAnimation.appendChild(span);
    }
}
createBgAnimation();

// Header Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
        backToTop.classList.add('active');
    } else {
        header.classList.remove('header-scrolled');
        backToTop.classList.remove('active');
    }

    // Activate Nav Links on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Animate Skill Bars on Scroll
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;

        if (window.scrollY > sectionTop - window.innerHeight + sectionHeight / 2) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Portfolio Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonialCount = testimonialItems.length;

function showTestimonial(index) {
    if (index < 0) {
        currentTestimonial = testimonialCount - 1;
    } else if (index >= testimonialCount) {
        currentTestimonial = 0;
    } else {
        currentTestimonial = index;
    }

    testimonialWrapper.style.transform = `translateX(-${currentTestimonial * 100}%)`;

    // Update dots
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonial);
    });
}

prevTestimonialBtn.addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
});

nextTestimonialBtn.addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
});

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto slide testimonials
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Get form values
            const formData = new FormData(contactForm);

            try {
                // Send form data to Formspree
                const response = await fetch("https://formspree.io/f/xwplpnbj", {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    alert("Thank you for your message! I will get back to you soon.");
                    contactForm.reset(); // Clear the form
                } else {
                    alert("Oops! Something went wrong. Please try again.");
                }
            } catch (error) {
                alert("Error submitting form. Please check your connection and try again.");
            }
        });
    }
});


// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Typewriter Effect for Hero Section
function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

const heroJob = document.querySelector('.hero-job');
const originalText = heroJob.textContent;
heroJob.textContent = '';

setTimeout(() => {
    typeWriter(heroJob, originalText);
}, 1000);

// Portfolio Lightbox (Simple Implementation)
document.querySelectorAll('.portfolio-lightbox').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = item.getAttribute('href');

        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '1000';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.border = '5px solid white';
        img.style.borderRadius = '5px';

        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '30px';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.cursor = 'pointer';

        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);

        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = newsletterForm.querySelector('.newsletter-input').value;
        console.log({ email });

        alert('Thank you for subscribing to my newsletter!');
        newsletterForm.reset();
    });
}
