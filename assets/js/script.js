    document.addEventListener('DOMContentLoaded', () => {
        // --- Mobile Menu ---
        const menuToggle = document.getElementById('menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const overlay = document.getElementById('overlay');
        const navLinks = mobileNav.querySelectorAll('a');

        const closeMenu = () => {
            mobileNav.classList.remove('open');
            overlay.classList.remove('open');
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('open');
            mobileNav.classList.toggle('open');
            overlay.classList.toggle('open');
            if (isOpen) {
                menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
            } else {
                menuToggle.setAttribute('aria-label', 'Fechar menu de navegação');
            }
        });

        overlay.addEventListener('click', closeMenu);
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // --- Scroll Reveal Animation ---
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

        // --- Contact Form Handler ---
        const contactForm = document.getElementById('lunna-contact-form');
        const formStatus = document.getElementById('form-status');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = contactForm.name.value;
            const email = contactForm.email.value;
            const message = contactForm.message.value;
            const submitButton = contactForm.querySelector('button[type="submit"]');

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            try {
                const response = await fetch('http://localhost:3000/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                });

                const result = await response.json();

                formStatus.textContent = result.message;
                formStatus.style.display = 'block';

                if (response.ok) {
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    formStatus.className = 'error';
                }

            } catch (error) {
                formStatus.className = 'error';
                formStatus.style.display = 'block';
                formStatus.textContent = 'Erro ao conectar com o servidor. Tente novamente mais tarde.';
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Mensagem';
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = '';
                }, 6000);
            }
        });
    });
