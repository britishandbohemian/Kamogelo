// Theme Toggle and Cursor Management
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  const cursor = document.querySelector('.custom-cursor');
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"]');
  
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let cursorVisible = false;
    
// Replace the cursor movement code in shared.js
const onMouseMove = (e) => {
  const posX = e.clientX;
  const posY = e.clientY;
  
  // Use requestAnimationFrame for smoother movement
  requestAnimationFrame(() => {
    cursor.style.left = `${posX}px`;
    cursor.style.top = `${posY}px`;
    cursor.style.transform = 'translate(-50%, -50%)';
  });
  
  if (!cursorVisible) {
    cursor.style.opacity = '1';
    cursorVisible = true;
  }
};

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
      cursorVisible = false;
    };

    const onMouseEnter = () => {
      cursor.style.opacity = '1';
      cursorVisible = true;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    // Handle cursor effects for interactive elements
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  } else if (cursor) {
    // Remove cursor element on touch devices
    cursor.remove();
  }

  // Add this inside the DOMContentLoaded event listener
// Menu active state management
const updateActiveMenuLink = () => {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.menu-link');
  
  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (currentPath === '/' && link.getAttribute('href') === './index.html') {
      link.classList.add('active');
    } else if (link.getAttribute('href') === `.${currentPath}`) {
      link.classList.add('active');
    }
  });
};

// Call it initially
updateActiveMenuLink();

// Update on page load
window.addEventListener('load', updateActiveMenuLink);


  // Slider functionality (if present)
  const slides = document.querySelectorAll('.slide'); 
  const indicators = document.querySelectorAll('.indicator');
  
  if (slides.length > 0 && indicators.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    // Auto-advance slides
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // Form handling (if present)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add your form submission logic here
      console.log('Form submitted');
    });
  }
}); 