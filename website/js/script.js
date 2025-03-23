// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking on a link
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Testimonial slider
const dots = document.querySelectorAll('.dot');
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Initialize testimonials display
if (testimonials.length > 0 && dots.length > 0) {
    showTestimonial(currentTestimonial);
    
    // Add click event to dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentTestimonial = i;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-switch testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real scenario, you would send this data to a server
        // This is a simulated response for demonstration purposes
        
        // Simulating form submission with a delay
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';
        
        setTimeout(() => {
            // Simulated success response
            formStatus.textContent = 'Your message has been sent successfully! We will contact you soon.';
            formStatus.className = 'form-status success';
            
            // Reset form
            contactForm.reset();
            
            // In a real scenario, you would use fetch or XMLHttpRequest to send the data to your server
            console.log('Form submitted with:', { name, email, subject, message });
            
            // To implement actual email sending, you would need a server-side script
            // For example, using a service like EmailJS or your own backend
        }, 1500);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .team-member, .info-card, .value-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animation styles
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .team-member, .info-card, .value-card');
    
    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial animation check
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
}); 