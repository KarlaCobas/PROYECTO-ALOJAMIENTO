document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-links a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';

        const icon = hamburger.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    hamburger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#')) {
                e.preventDefault();

                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    document.addEventListener('touchstart', function () { }, true);

    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const animateElements = document.querySelectorAll('.animate-from-left, .animate-from-right, .animate-from-bottom');
    if (animateElements.length > 0) {
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
    }

    const items = document.querySelectorAll('.gallery-item');
    if (items.length > 0) {
        function checkVisibility() {
            items.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (itemTop < windowHeight - 100) {
                    item.classList.add('visible');
                }
            });
        }

        checkVisibility();
        window.addEventListener('scroll', checkVisibility);

        items.forEach(item => {
            item.addEventListener('click', function () {
                items.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                item.classList.toggle('active');
            });
        });

        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 480) {
                if (!e.target.closest('.gallery-item')) {
                    items.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            }
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.offer-card, .special-card').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
    });

    document.querySelectorAll('.offer-btn, .special-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    function updateScrollbarWidth() {
        document.documentElement.style.setProperty(
            '--scrollbar-width',
            `${getScrollbarWidth()}px`
        );
    }

});