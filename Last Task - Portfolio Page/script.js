// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Animate skill bars on scroll with a more expressive animation
const skillBars = document.querySelectorAll('.skill-progress');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('style').split(':')[1];
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                entry.target.style.width = width;
            }, 100);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    observer.observe(bar);
});

// Form submission handling with artistic feedback
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create a canvas effect for the success message
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 100;
    
    // Draw a dynamic background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#00ff9d');
    gradient.addColorStop(1, '#ff00ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text
    ctx.fillStyle = '#000';
    ctx.font = 'bold 20px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Message Sent!', canvas.width/2, canvas.height/2);
    
    // Convert canvas to image
    const successImage = canvas.toDataURL();
    
    // Show success message with the canvas image
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
        background-image: url(${successImage});
        background-size: cover;
        color: white;
        padding: 2rem;
        border-radius: 0;
        margin-top: 1rem;
        text-align: center;
        position: relative;
        overflow: hidden;
    `;
    
    // Add a brush stroke effect
    const brushStroke = document.createElement('div');
    brushStroke.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        animation: brushStroke 1s ease-out forwards;
    `;
    
    successMessage.appendChild(brushStroke);
    contactForm.appendChild(successMessage);
    contactForm.reset();
    
    // Remove success message after 5 seconds with a fade out
    setTimeout(() => {
        successMessage.style.transition = 'opacity 0.5s ease-out';
        successMessage.style.opacity = '0';
        setTimeout(() => successMessage.remove(), 500);
    }, 5000);
});

// Add active class to nav links based on scroll position with a smooth transition
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add expressive scroll reveal animation
const revealElements = document.querySelectorAll('.skill-card, .project-card');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a random rotation for a more artistic feel
            const rotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
            entry.target.style.transform = `translateY(0) rotate(${rotation}deg)`;
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px) rotate(0deg)';
    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealOnScroll.observe(element);
});

// Add brush stroke animation
const brushStrokeAnimation = document.createElement('style');
brushStrokeAnimation.textContent = `
    @keyframes brushStroke {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(200%);
        }
    }
`;
document.head.appendChild(brushStrokeAnimation);

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const randomHue = Math.random() * 360;
        card.style.borderColor = `hsl(${randomHue}, 100%, 50%)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'var(--border-color)';
    });
}); 