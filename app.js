/**
 * Khushi Kharvar — Portfolio JS
 * Navigation, skill bars, counters, form
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSkillBars();
  initScrollSpy();
  initScrollReveal();
  initProjectCarousel();
  initPremiumMotion();
});

// ---- Premium Motion Layer ----
function initPremiumMotion() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navbar = document.getElementById('navbar');

  const updateScrollState = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    document.documentElement.style.setProperty('--scroll-progress', progress);
    if (navbar) navbar.classList.toggle('is-scrolled', window.scrollY > 12);
    const hero = document.querySelector('.hero');
    if (hero && !reducedMotion) {
      hero.style.setProperty('--hero-shift', `${Math.min(window.scrollY * 0.08, 34)}px`);
    }
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  if (reducedMotion) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer) return;

  document.querySelectorAll('.btn, .social-link, .nav-logo').forEach((element) => {
    element.classList.add('magnetic');
    element.addEventListener('pointermove', (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    element.addEventListener('pointerleave', () => {
      element.style.transform = '';
    });
  });

  document.querySelectorAll('.project-card-large, .process-card-modern, .cert-card, .tool-chip').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateY = ((x / bounds.width) - 0.5) * 5;
      const rotateX = ((y / bounds.height) - 0.5) * -5;
      card.style.setProperty('--card-x', `${x}px`);
      card.style.setProperty('--card-y', `${y}px`);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

// ---- Scroll Reveal Animations ----
function initScrollReveal() {
  const targets = document.querySelectorAll('.section-header, .about-grid, .tools-grid, .carousel-container, .process-card-modern, .cert-card, .contact-grid');
  
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  targets.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

// ---- Project Carousel ----
function initProjectCarousel() {
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotBtns = document.querySelectorAll('.dot-btn');
  const container = document.querySelector('.carousel-container');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('active-slide');
      } else {
        slide.classList.remove('active-slide');
      }
    });

    dotBtns.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  // Initialize
  goToSlide(0);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  }

  dotBtns.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
    });
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
      return;
    }
    const rect = container ? container.getBoundingClientRect() : null;
    const isVisible = rect && rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1);
      }
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  if (container) {
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 40;
    if (touchEndX < touchStartX - threshold) {
      goToSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + threshold) {
      goToSlide(currentIndex - 1);
    }
  }
}

// ---- Mobile Nav ----
function initNav() {
  const toggle = document.getElementById('mobileToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.innerHTML = links.classList.contains('open') ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.innerHTML = '<i class="bi bi-list"></i>';
    });
  });
}

// ---- Scroll Spy ----
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + h) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });
}

// ---- Skill Bar Animation ----
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fills.forEach(bar => {
          const w = bar.getAttribute('data-width');
          bar.style.width = w + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const card = document.querySelector('.skills-bars-card');
  if (card) observer.observe(card);
}

// ---- Contact Form ----
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const subject = document.getElementById('fSubject').value.trim();
  const message = document.getElementById('fMsg').value.trim();
  const feedback = document.getElementById('formFeedback');
  const btn = document.getElementById('sendBtn');

  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Preparing…';

  const mailto = `mailto:k.kharvar513@gmail.com?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

  setTimeout(() => {
    feedback.className = 'form-feedback show';
    feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Opening your email client… <a href="${mailto}" style="color:var(--accent);text-decoration:underline;">Click here</a> if it didn't open.`;
    window.location.href = mailto;
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Sent!';
    document.getElementById('contactForm').reset();
  }, 500);
}
