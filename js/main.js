/**
 * URBAN WEB · Desarrollo Web Profesional
 */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // SCROLL SUAVE
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var target = this.getAttribute('href');
            if (target !== '#') {
                e.preventDefault();
                var el = document.querySelector(target);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ============================================
    // ANIMACION DE ENTRADA
    // ============================================
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 100);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.service-card, .plan-card, .proceso-item, .why-item, .riesgo-box').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });

    // ============================================
    // FORMULARIO
    // ============================================
    var form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Te responderemos lo antes posible.');
            this.reset();
        });
    }

    // ============================================
    // LOG EN CONSOLA
    // ============================================
    console.log('URBAN WEB · Desarrollo Web Profesional');
    console.log('Disponibilidad limitada · 3 proyectos por semana');
    console.log('Codigo revisado · Sin IA generativa sin control');

});