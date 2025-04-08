// Since this is not a React project, we'll convert this to vanilla JS
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.createElement('button');
  themeToggleBtn.className = 'p-2 rounded-full bg-gray-200 dark:bg-gray-700';
  themeToggleBtn.id = 'vanilla-theme-toggle';
  
  // Check initial theme
  if (document.documentElement.classList.contains('dark')) {
    themeToggleBtn.textContent = '☀️ Light';
  } else {
    themeToggleBtn.textContent = '🌙 Dark';
  }
  
  themeToggleBtn.addEventListener('click', function() {
    const isDark = document.documentElement.classList.toggle('dark');
    this.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  
  const projectsData = [
    {
      name: "My Portfolio",
      description: "A responsive personal portfolio website",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "https://yourportfolio.link"
    }
  ];
  
});