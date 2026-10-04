/**
 * DCS Jayawickrama - Portfolio JavaScript
 * Modern, Interactive, & Performance Focused
 * 100% Vanilla JS - Ready for GitHub Pages
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomPointer();
  initCursorSpotlight();
  initTypingEffect();
  initNavbarBehavior();
  initScrollReveal();
  initContactFeatures();
  initScrollTop();
  updateCopyrightYear();
});

/* -------------------------------------------------------------
 * 1. Custom Interactive Mouse Pointer (Dot & Follower Ring)
 * ----------------------------------------------------------- */
function initCustomPointer() {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  if (!dot || !outline) return;

  // Only run custom cursor on fine pointer (desktop) devices
  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
        isVisible = true;
      }

      // Dot follows cursor immediately
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    window.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      outline.style.opacity = '0';
      isVisible = false;
    });

    // Smooth animation loop for the trailing outline ring
    const renderLoop = () => {
      outlineX += (mouseX - outlineX) * 0.16;
      outlineY += (mouseY - outlineY) * 0.16;

      outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderLoop);
    };

    requestAnimationFrame(renderLoop);

    // Expand cursor ring when hovering clickable / interactive items
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .card, .result-item, .social-link, .nav-brand');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  } else {
    dot.style.display = 'none';
    outline.style.display = 'none';
  }
}

/* -------------------------------------------------------------
 * 2. Ambient Cursor Spotlight (Soft background aura)
 * ----------------------------------------------------------- */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateSpotlight = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      spotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateSpotlight);
    };

    requestAnimationFrame(animateSpotlight);
  } else {
    spotlight.style.display = 'none';
  }
}

/* -------------------------------------------------------------
 * 3. Dynamic Typing Text Effect
 * ----------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'IT Specialist & Developer',
    'Fleet Telemetry Specialist',
    'Data Analyst',
    'HNDIT Merit Graduate (GPA 3.56)',
    'Founder of TITSA'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* -------------------------------------------------------------
 * 4. Navbar Scrolling & Mobile Menu
 * ----------------------------------------------------------- */
function initNavbarBehavior() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentSection = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinkItems.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'ri-close-line';
      } else {
        icon.className = 'ri-menu-4-line';
      }
    });

    navLinkItems.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-4-line';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navbar.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-4-line';
      }
    });
  }
}

/* -------------------------------------------------------------
 * 5. Scroll-Reveal Animations (Smooth Entrance)
 * ----------------------------------------------------------- */
function initScrollReveal() {
  const revealTargets = document.querySelectorAll('.card, .edu-step-card, .timeline-item, .section-header');

  revealTargets.forEach((el) => {
    el.classList.add('reveal-element');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach((el) => {
    observer.observe(el);
  });
}

/* -------------------------------------------------------------
 * 6. Contact Actions (Copy Email & Message Feedback)
 * ----------------------------------------------------------- */
function initContactFeatures() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailVal = document.getElementById('emailVal');

  if (copyBtn && emailVal) {
    copyBtn.addEventListener('click', () => {
      const email = emailVal.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="ri-check-line"></i> <span>Copied!</span>';
        copyBtn.style.borderColor = 'var(--cyan-primary)';

        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
          copyBtn.style.borderColor = '';
        }, 2200);
      });
    });
  }
}

window.handleContactSubmit = function () {
  const submitBtn = document.getElementById('formSubmitBtn');
  const feedback = document.getElementById('formFeedback');
  const form = document.getElementById('contactForm');

  if (!submitBtn || !feedback) return;

  const originalContent = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending...</span>';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalContent;

    feedback.removeAttribute('style');
    feedback.className = 'form-feedback-msg success';
    feedback.innerHTML = '<i class="ri-checkbox-circle-line"></i> Thank you! Your message inquiry has been recorded. You can also reach out directly to <a href="mailto:dinujachamod13@gmail.com" style="color:var(--cyan-primary);text-decoration:underline;font-weight:600;">dinujachamod13@gmail.com</a>.';
    form.reset();

    setTimeout(() => {
      feedback.textContent = '';
      feedback.className = 'form-feedback-msg';
      feedback.removeAttribute('style');
    }, 5500);
  }, 600);
};

/* -------------------------------------------------------------
 * 7. Scroll-to-Top Button
 * ----------------------------------------------------------- */
function initScrollTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* -------------------------------------------------------------
 * 8. Copyright Year
 * ----------------------------------------------------------- */
function updateCopyrightYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
