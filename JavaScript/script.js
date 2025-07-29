document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
    
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    const animateElements = document.querySelectorAll('.animate-from-left, .animate-from-right, .animate-from-bottom');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    checkScroll();
    
    window.addEventListener('scroll', checkScroll);
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.toggle('hover');
        });
    });

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
        
        galeriaItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.style.opacity = '1';
                lightbox.style.pointerEvents = 'auto';
                document.body.style.overflow = 'hidden';
            });
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                lightbox.style.opacity = '0';
                lightbox.style.pointerEvents = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
});