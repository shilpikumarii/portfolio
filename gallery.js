document.addEventListener('DOMContentLoaded', function() {
  
  const images = document.querySelectorAll('.project-card img');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  `;
  
  const img = document.createElement('img');
  img.style.maxHeight = '80%';
  img.style.maxWidth = '80%';
  
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);
  
  images.forEach(image => {
    image.addEventListener('click', () => {
      img.src = image.src;
      lightbox.style.opacity = '1';
      lightbox.style.pointerEvents = 'auto';
    });
  });
  
  lightbox.addEventListener('click', () => {
    lightbox.style.opacity = '0';
    lightbox.style.pointerEvents = 'none';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      gsap.to(window, {
        scrollTo: {
          y: targetElement,
          offsetY: 80
        },
        duration: 1,
        ease: 'power2.inOut'
      });
    }
  });
});