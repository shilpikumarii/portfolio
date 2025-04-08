// Initialize AOS for Scroll Animations
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-in-out'
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeIcon.textContent = '☀️';
} else {
  body.classList.remove('dark');
  themeIcon.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
});

// [Rest of your ppw.js code remains the same]

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
      
     
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    }
  });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    
    console.log({ name, email, message });
    
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

gsap.from(".hero-title", {
  duration: 1.5,
  y: -50,
  opacity: 0,
  ease: "power3.out"
});

gsap.from(".hero-subtitle", {
  duration: 1.5,
  y: 50,
  opacity: 0,
  delay: 0.3,
  ease: "power3.out"
});
// Typing animation in ppw.js (add at the bottom)
const typingText = document.getElementById('typing-text');
const professions = ["Web Developer", "Frontend Engineer", "UI/UX Enthusiast", "Problem Solver"];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
  const currentProfession = professions[professionIndex];
  
  if (isDeleting) {
    typingText.textContent = currentProfession.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentProfession.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentProfession.length) {
    isEnd = true;
    isDeleting = true;
    setTimeout(typeWriter, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    professionIndex = (professionIndex + 1) % professions.length;
    setTimeout(typeWriter, 500);
  } else {
    const speed = isDeleting ? 100 : 150;
    setTimeout(typeWriter, speed);
  }
}

// Start the typing animation after the initial animations
setTimeout(typeWriter, 2000);
// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const navMenu = document.querySelector('nav ul');

mobileMenuButton.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
// Project Modals
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function() {
    const title = this.querySelector('h3').textContent;
    const description = this.querySelector('p').textContent;
    
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').innerHTML = `
      <p>${description}</p>
      <h4>Technologies Used:</h4>
      <ul>
        <li>React</li>
        <li>Node.js</li>
        <li>MongoDB</li>
      </ul>
      <h4>Key Features:</h4>
      <ul>
        <li>Real-time updates</li>
        <li>Responsive design</li>
      </ul>
    `;
    document.getElementById('project-modal').classList.remove('hidden');
  });
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('project-modal').classList.add('hidden');
});