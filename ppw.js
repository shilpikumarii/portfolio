AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-in-out'
});

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const body = document.body;

const themes = ['light', 'dark', 'dim'];
let currentThemeIndex = 0;

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentThemeIndex = themes.indexOf(savedTheme);
    if (currentThemeIndex === -1) currentThemeIndex = 0;
  } else {
    currentThemeIndex = window.matchMedia('(prefers-color-scheme: dark)').matches ? 1 : 0;
  }
  applyTheme();
}

function applyTheme() {
  body.classList.remove('light', 'dark', 'dim');
  
  body.classList.add(themes[currentThemeIndex]);

  updateThemeIcons();
  
  localStorage.setItem('theme', themes[currentThemeIndex]);
}

function updateThemeIcons() {
  const themeIcon = document.getElementById('theme-icon');
  const themeIconMobile = document.getElementById('theme-icon-mobile');
  
  themeIcon.innerHTML = '';
  themeIconMobile.innerHTML = '';
  
  const icons = {
    light: '<i class="fas fa-moon"></i>',
    dark: '<i class="fas fa-sun"></i>',
    dim: '<i class="fas fa-adjust"></i>'
  };
  
  themeIcon.innerHTML = icons[themes[currentThemeIndex]];
  themeIconMobile.innerHTML = icons[themes[currentThemeIndex]];
}

function toggleTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  applyTheme();
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

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

setTimeout(typeWriter, 2000);

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden') 
    ? '<i class="fas fa-bars text-xl"></i>' 
    : '<i class="fas fa-times text-xl"></i>';
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
  });
});

const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove('hidden');
  } else {
    backToTopButton.classList.add('hidden');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('load', () => {
  const spinner = document.getElementById('loading-spinner');
  spinner.style.opacity = '0';
  setTimeout(() => {
    spinner.style.display = 'none';
  }, 500);
});

document.getElementById('cert-toggle-btn').addEventListener('click', function() {
  const hiddenCerts = document.querySelectorAll('#certifications .more-cert');
  const btn = this;
  
  hiddenCerts.forEach(cert => {
    cert.classList.toggle('hidden');
  });
  
  btn.textContent = hiddenCerts[0].classList.contains('hidden') 
    ? 'View More Certificates' 
    : 'View Less Certificates';
  
  AOS.refresh();
});

document.getElementById('project-toggle-btn').addEventListener('click', function() {
  const hiddenProjects = document.querySelectorAll('#projects .more-project');
  const btn = this;
  
  hiddenProjects.forEach(project => {
    project.classList.toggle('hidden');
  });
  
  btn.textContent = hiddenProjects[0].classList.contains('hidden') 
    ? 'View More Projects' 
    : 'View Less Projects';
  
  AOS.refresh();
});
function toggleProjects() {
  const hiddenProjects = document.querySelectorAll('#projects .hidden');
  const btn = event.target;
  
  hiddenProjects.forEach(project => {
    project.classList.toggle('hidden');
  });
  
  btn.textContent = hiddenProjects[0].classList.contains('hidden') ? 'View More Projects' : 'View Less Projects';
  
  AOS.refresh();
}

function highlightActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-medium');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-medium');
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  highlightActiveNav();
});