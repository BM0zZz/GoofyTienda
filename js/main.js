
document.addEventListener('DOMContentLoaded', () => {

  /* --- Inicializar EmailJS --- */
  emailjs.init({
    publicKey: 'icrlMM_gYDjACYn9y'
  });


  /* --- Navbar: fondo sólido al hacer scroll --- */
  const nav = document.getElementById('mainNav');

  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  /* --- Cierra el menú móvil al pulsar un enlace --- */
  const navCollapse = document.getElementById('navMenu');

  if (navCollapse) {
    document
      .querySelectorAll('#navMenu .nav-link, #navMenu .btn')
      .forEach(link => {

        link.addEventListener('click', () => {

          if (navCollapse.classList.contains('show')) {
            bootstrap.Collapse
              .getOrCreateInstance(navCollapse)
              .hide();
          }

        });

      });
  }


  /* --- Revelado suave de secciones al hacer scroll --- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const delay =
            entry.target.getAttribute('data-reveal-delay') || 0;

          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, Number(delay));

          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.15
    });

    revealEls.forEach(el => observer.observe(el));

  } else {

    revealEls.forEach(el => {
      el.classList.add('is-visible');
    });

  }


  /* --- Formulario de contacto --- */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {

    form.addEventListener('submit', async (e) => {

      e.preventDefault();


      /* Validación */
      if (!form.checkValidity()) {

        form.classList.add('was-validated');

        feedback.textContent =
          'Revisa los campos marcados, falta algún dato.';

        feedback.style.color = '#C9822B';

        return;
      }


      /* Botón */
      const submitBtn =
        form.querySelector('button[type="submit"]');

      const originalText =
        submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      feedback.textContent = '';


      /* Datos del formulario */
      const name =
        document.getElementById('nombre').value.trim();

      const email =
        document.getElementById('email').value.trim();

      const negocio =
        document.getElementById('negocio').value.trim();

      const plan =
        document.getElementById('plan').value;

      const message =
        document.getElementById('mensaje').value.trim();


      /* --- Envío mediante EmailJS --- */

      try {

        await emailjs.send(
          'service_ekncljx',
          'template_satz3op',
          {
            name: name,
            email: email,
            negocio: negocio || 'No indicado',
            plan: plan || 'No indicado',
            message: message
          }
        );


        /* Éxito */
        feedback.textContent =
          '¡Mensaje enviado! Te responderemos en menos de 24h.';

        feedback.style.color = '#2557C7';


        form.reset();
        form.classList.remove('was-validated');


      } catch (error) {

        console.error(
          'Error enviando el formulario:',
          error
        );

        feedback.textContent =
          'No se ha podido enviar el mensaje. Inténtalo de nuevo.';

        feedback.style.color = '#C9822B';


      } finally {

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

      }

    });

  }

});
