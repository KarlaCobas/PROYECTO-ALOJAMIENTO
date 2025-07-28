document.addEventListener('DOMContentLoaded', function() {

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
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
            }
        });
    });
    
    const animateElements = function() {
        const elements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('load', animateElements);
    window.addEventListener('scroll', animateElements);
    
    const contactForm = document.querySelector('.contacto-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';
                submitBtn.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    this.reset();
                    
                    const formGroups = this.querySelectorAll('.form-group');
                    formGroups.forEach(group => {
                        const input = group.querySelector('input, select, textarea');
                        const label = group.querySelector('label');
                        
                        if (input.value === '' || (input.tagName === 'SELECT' && input.value === '')) {
                            label.style.top = '1.2rem';
                            label.style.left = '1.2rem';
                            label.style.fontSize = '1rem';
                        }
                    });
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = 'var(--primary-color)';
                    
                    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                }, 2000);
            }, 1500);
        });
    }
    
    const galeriaItems = document.querySelectorAll('.galeria-item');
    if (galeriaItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
        lightbox.style.zIndex = '1000';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.opacity = '0';
        lightbox.style.pointerEvents = 'none';
        lightbox.style.transition = 'opacity 0.3s ease';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.borderRadius = '8px';
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Abrir lightbox al hacer clic
        galeriaItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.style.opacity = '1';
                lightbox.style.pointerEvents = 'auto';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Cerrar lightbox
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                lightbox.style.opacity = '0';
                lightbox.style.pointerEvents = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Efecto hover para cards de servicios
    const serviceCards = document.querySelectorAll('.servicio-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--box-shadow)';
            }
        });
    });
    
    // Efecto hover para testimonios
    const testimonioCards = document.querySelectorAll('.testimonio-card');
    testimonioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                this.style.borderColor = 'rgba(74, 111, 165, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--box-shadow)';
                this.style.borderColor = 'rgba(74, 111, 165, 0.1)';
            }
        });
    });
    
    // Efecto hover para ofertas
    const ofertaCards = document.querySelectorAll('.oferta-card');
    ofertaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--box-shadow)';
            }
        });
    });
    
    // Efecto hover para métodos de pago
    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                this.style.borderColor = 'var(--accent-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--box-shadow)';
                this.style.borderColor = '#e9ecef';
            }
        });
    });
    
    // Cerrar menú al redimensionar a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            closeMenu();
        }
    });
});