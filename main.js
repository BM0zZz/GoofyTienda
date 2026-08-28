document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar: fondo sólido al hacer scroll --- */
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Cierra el menú móvil al pulsar un enlace --- */
  const navCollapse = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link, #navMenu .btn').forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  /* --- Revelado suave de secciones al hacer scroll --- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay') || 0;
          setTimeout(() => entry.target.classList.add('is-visible'), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* --- Formulario de contacto: validación y feedback --- */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        feedback.textContent = 'Revisa los campos marcados, falta algún dato.';
        feedback.style.color = '#C9822B';
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      // Aquí se conectaría con un backend, formulario (Formspree, etc.) o servicio de email real.
      setTimeout(() => {
        feedback.textContent = '¡Mensaje enviado! Te responderemos en menos de 24h.';
        feedback.style.color = '#2557C7';
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        form.reset();
        form.classList.remove('was-validated');
      }, 900);
    });
  }

});
