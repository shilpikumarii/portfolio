AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-in-out'
});

// Theme Toggle
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
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

// Mobile menu toggle
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

// Back to top button
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

// Loading spinner
window.addEventListener('load', () => {
  const spinner = document.getElementById('loading-spinner');
  spinner.style.opacity = '0';
  setTimeout(() => {
    spinner.style.display = 'none';
  }, 500);
});

// Certifications toggle
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

// Projects toggle
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

// Active nav highlighting
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

// Resume download
document.getElementById('download-resume').addEventListener('click', function(e) {
  console.log('Resume downloaded');
  setTimeout(() => {
    alert('Thank you for downloading my resume! Feel free to reach out if you have any questions.');
  }, 1000);
});

// Project Modal
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalContent = document.getElementById('project-modal-content');
const closeProjectModal = document.getElementById('close-project-modal');

const projectsData = {
    "project-1": {
        title: "Project 1 Title",
        description: `
            <p>This project used HTML, CSS, and JavaScript to create a responsive website.</p>
            <p>Key technologies: 
                <ul>
                    <li>HTML5</li>
                    <li>CSS3</li>
                    <li>JavaScript</li>
                </ul>
            </p>
            <img src="IMAGE/project1-screenshot.png" alt="Project 1 Screenshot">
        `,
    },
    "project-2": {
        title: "Project 2 Title",
        description: "<p>A Java application for managing user data...</p>",
    }
};

projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const projectId = `project-${index + 1}`;
        if (projectsData[projectId]) {
            projectModalTitle.textContent = projectsData[projectId].title;
            projectModalContent.innerHTML = projectsData[projectId].description;
            projectModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    });
});

closeProjectModal.addEventListener('click', () => {
    projectModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Blog Modal
const blogPosts = {
  octanet: {
    title: "Web Development Internship at OCTANET SERVICES PVT LTD",
    content: `
      <p class="mb-4">Contributed to real projects using HTML, CSS, and JavaScript.</p>
      <h4 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Key Responsibilities</h4>
      <ul class="list-disc pl-6 mb-4">
        <li>Developed responsive UIs</li>
        <li>Debugged layout issues</li>
        <li>Collaborated in feature implementation</li>
      </ul>
    `
  },
  motioncut: {
    title: "Python Programming Internship at MotionCut",
    content: `
      <p class="mb-4">Enhanced problem-solving by writing Python scripts and mini tools.</p>
      <h4 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Key Learnings</h4>
      <ul class="list-disc pl-6 mb-4">
        <li>Data manipulation with Pandas</li>
        <li>Code optimization techniques</li>
        <li>Automation using Python</li>
      </ul>
    `
  },
  prasunet: {
    title: "Web Development Intern at Prasunet Pvt. Ltd.",
    content: `
      <p class="mb-4">Built and enhanced a professional portfolio website. Integrated dark mode, animations, and responsive design.</p>
      <h4 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Key Achievements</h4>
      <ul class="list-disc pl-6 mb-4">
        <li>Mobile responsive design</li>
        <li>Dark mode toggle with animation</li>
        <li>Stipend earned on successful completion</li>
      </ul>
    `
  }
};

const blogModal = document.getElementById('blog-modal');
const blogModalTitle = document.getElementById('blog-modal-title');
const blogModalContent = document.getElementById('blog-modal-content');
const closeBlogModal = document.getElementById('close-blog-modal');

document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const blogId = btn.dataset.blogId;
    const post = blogPosts[blogId];

    if (post) {
      blogModalTitle.textContent = post.title;
      blogModalContent.innerHTML = post.content;
      blogModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });
});

closeBlogModal.addEventListener('click', () => {
  blogModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
});

blogModal.addEventListener('click', e => {
  if (e.target === blogModal) {
    blogModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!blogModal.classList.contains('hidden')) {
      blogModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
    if (!projectModal.classList.contains('hidden')) {
      projectModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const formStatus = document.getElementById('form-status');
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
      formStatus.classList.add('text-green-500');
      formStatus.classList.remove('text-red-500', 'hidden');
      form.reset();
      
      setTimeout(() => {
        formStatus.classList.add('hidden');
      }, 5000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again.';
    formStatus.classList.add('text-red-500');
    formStatus.classList.remove('text-green-500', 'hidden');
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  highlightActiveNav();
});