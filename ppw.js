document.addEventListener('DOMContentLoaded', () => {
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
    
    const icons = {
      light: '<i class="fas fa-moon"></i>',
      dark: '<i class="fas fa-sun"></i>',
      dim: '<i class="fas fa-adjust"></i>'
    };
    
    if (themeIcon) themeIcon.innerHTML = icons[themes[currentThemeIndex]];
    if (themeIconMobile) themeIconMobile.innerHTML = icons[themes[currentThemeIndex]];
  }

  function toggleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    applyTheme();
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
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
  }

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

  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
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
  }

  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    window.addEventListener('load', () => {
      spinner.style.opacity = '0';
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 500);
    });
  }

  const certToggleBtn = document.getElementById('cert-toggle-btn');
  if (certToggleBtn) {
    certToggleBtn.addEventListener('click', function() {
      const hiddenCerts = document.querySelectorAll('#certifications .more-cert');
      
      hiddenCerts.forEach(cert => {
        cert.classList.toggle('hidden');
      });
      
      this.textContent = hiddenCerts[0].classList.contains('hidden') 
        ? 'View More Certificates' 
        : 'View Less Certificates';
      
      AOS.refresh();
    });
  }

  const projectToggleBtn = document.getElementById('project-toggle-btn');
  if (projectToggleBtn) {
    projectToggleBtn.addEventListener('click', function() {
      const hiddenProjects = document.querySelectorAll('#projects .more-project');
      
      hiddenProjects.forEach(project => {
        project.classList.toggle('hidden');
      });
      
      this.textContent = hiddenProjects[0].classList.contains('hidden') 
        ? 'View More Projects' 
        : 'View Less Projects';
      
      AOS.refresh();
    });
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
  const downloadResume = document.getElementById('download-resume');
  if (downloadResume) {
    downloadResume.addEventListener('click', function(e) {
      console.log('Resume downloaded');
      setTimeout(() => {
        alert('Thank you for downloading my resume! Feel free to reach out if you have any questions.');
      }, 1000);
    });
  }
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
      submitBtn.disabled = true;
      setTimeout(() => {
        const formStatus = document.getElementById('form-status');
        if (formStatus) {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.classList.remove('hidden', 'text-red-500');
          formStatus.classList.add('text-green-500');
        }
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        this.reset();
        setTimeout(() => {
          if (formStatus) formStatus.classList.add('hidden');
        }, 5000);
      }, 1500);
    });
  }
  initTheme();
  highlightActiveNav();
});
document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', function() {
    const blogCard = this.closest('.blog-card');
    blogCard.classList.toggle('expanded');
    
    this.textContent = blogCard.classList.contains('expanded') 
      ? 'Read Less' 
      : 'Read More';
  });
});
function toggleDetails(id, button) {
  const details = document.getElementById(id);
  const isExpanded = details.classList.toggle('hidden');
  if (isExpanded) {
    button.innerHTML = 'Read More <i class="fas fa-chevron-down ml-1 text-xs"></i>';
    button.setAttribute('aria-expanded', 'false');
  } else {
    button.innerHTML = 'Read Less <i class="fas fa-chevron-up ml-1 text-xs"></i>';
    button.setAttribute('aria-expanded', 'true');
  }
  if (!isExpanded) {
    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
document.querySelectorAll('.view-details-btn').forEach(button => {
  button.addEventListener('click', function() {
    const detailsContent = this.nextElementSibling;
    const isExpanded = detailsContent.classList.toggle('hidden');
    
    if (isExpanded) {
      this.innerHTML = 'View Details <i class="fas fa-chevron-down ml-1 text-xs"></i>';
    } else {
      this.innerHTML = 'View Less <i class="fas fa-chevron-up ml-1 text-xs"></i>';
      detailsContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', function() {
    const blogCard = this.closest('.blog-card');
    const blogContent = blogCard.querySelector('.blog-content');
    const isExpanded = blogContent.classList.toggle('hidden');
    if (isExpanded) {
      this.innerHTML = 'Read More <i class="fas fa-chevron-down ml-1 text-xs"></i>';
    } else {
      this.innerHTML = 'Read Less <i class="fas fa-chevron-up ml-1 text-xs"></i>';
      blogContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden') 
      ? '<i class="fas fa-bars text-xl"></i>' 
      : '<i class="fas fa-times text-xl"></i>';
    
    mobileMenu.classList.toggle('active');
  });

  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('active');
      mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    });
  });
}