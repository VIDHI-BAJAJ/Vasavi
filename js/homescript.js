// header scroll
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
// end header scroll

// hamburger menu toggle
 
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu function
        function closeMobileMenu() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }

     

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
   //   end hamburger menu toggle


   //Why Choose Us Section
   
        // Smooth entrance animations
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.video-card, .network-card');
            
            elements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200 + 300);
            });
            
            // Add subtle hover effects
            elements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-4px)';
                    this.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
                });
                
                element.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
            });
        });

        // End Why Choose Us Section

        // testimonial swiper

  const swiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

     class TestimonialCarousel {
            constructor() {
                this.carousel = document.getElementById('carousel');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.cards = document.querySelectorAll('.testimonial-card');
                this.currentIndex = 0;
                this.cardsPerView = this.getCardsPerView();
                this.maxIndex = this.cards.length - this.cardsPerView;
                
                this.init();
                this.setupEventListeners();
                this.updateButtons();
            }

            init() {
                // Set initial position
                this.updateCarousel();
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    const newCardsPerView = this.getCardsPerView();
                    if (newCardsPerView !== this.cardsPerView) {
                        this.cardsPerView = newCardsPerView;
                        this.maxIndex = this.cards.length - this.cardsPerView;
                        this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                        this.updateCarousel();
                        this.updateButtons();
                    }
                });
            }

            getCardsPerView() {
                const width = window.innerWidth;
                if (width <= 768) return 1;
                if (width <= 1024) return 2;
                return 3;
            }

            setupEventListeners() {
                this.prevBtn.addEventListener('click', () => this.prev());
                this.nextBtn.addEventListener('click', () => this.next());

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prev();
                    if (e.key === 'ArrowRight') this.next();
                });

                // Touch/swipe support
                let startX = 0;
                let currentX = 0;
                let isDragging = false;

                this.carousel.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                });

                this.carousel.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    currentX = e.touches[0].clientX;
                    e.preventDefault();
                });

                this.carousel.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    const diffX = startX - currentX;
                    const threshold = 50;

                    if (Math.abs(diffX) > threshold) {
                        if (diffX > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                });

                // Mouse drag support for desktop
                let mouseStartX = 0;
                let mouseCurrentX = 0;
                let isMouseDragging = false;

                this.carousel.addEventListener('mousedown', (e) => {
                    mouseStartX = e.clientX;
                    isMouseDragging = true;
                    this.carousel.style.cursor = 'grabbing';
                    e.preventDefault();
                });

                document.addEventListener('mousemove', (e) => {
                    if (!isMouseDragging) return;
                    mouseCurrentX = e.clientX;
                });

                document.addEventListener('mouseup', (e) => {
                    if (!isMouseDragging) return;
                    isMouseDragging = false;
                    this.carousel.style.cursor = 'grab';
                    
                    const diffX = mouseStartX - mouseCurrentX;
                    const threshold = 50;

                    if (Math.abs(diffX) > threshold) {
                        if (diffX > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                });
            }

            prev() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.updateCarousel();
                    this.updateButtons();
                    this.announceChange('Previous testimonials');
                }
            }

            next() {
                if (this.currentIndex < this.maxIndex) {
                    this.currentIndex++;
                    this.updateCarousel();
                    this.updateButtons();
                    this.announceChange('Next testimonials');
                }
            }

            updateCarousel() {
                const cardWidth = this.cards[0].offsetWidth;
                const gap = 24; // Gap between cards
                const translateX = -(this.currentIndex * (cardWidth + gap));
                
                this.carousel.style.transform = `translateX(${translateX}px)`;
            }

            updateButtons() {
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex === this.maxIndex;
            }

            announceChange(message) {
                // For screen readers
                const announcement = document.createElement('div');
                announcement.textContent = message;
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.style.position = 'absolute';
                announcement.style.left = '-10000px';
                announcement.style.width = '1px';
                announcement.style.height = '1px';
                announcement.style.overflow = 'hidden';
                
                document.body.appendChild(announcement);
                
                setTimeout(() => {
                    document.body.removeChild(announcement);
                }, 1000);
            }
        }

        // Auto-play functionality (optional)
        class AutoPlay {
            constructor(carousel, interval = 5000) {
                this.carousel = carousel;
                this.interval = interval;
                this.timer = null;
                this.isPlaying = false;
                
                this.start();
                this.setupEventListeners();
            }

            start() {
                if (this.isPlaying) return;
                
                this.timer = setInterval(() => {
                    if (this.carousel.currentIndex >= this.carousel.maxIndex) {
                        this.carousel.currentIndex = -1; // Will be incremented to 0
                    }
                    this.carousel.next();
                }, this.interval);
                
                this.isPlaying = true;
            }

            stop() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                this.isPlaying = false;
            }

            setupEventListeners() {
                const section = document.querySelector('.testimonials-section');
                
                // Pause on hover
                section.addEventListener('mouseenter', () => this.stop());
                section.addEventListener('mouseleave', () => this.start());
                
                // Pause on focus (for accessibility)
                section.addEventListener('focusin', () => this.stop());
                section.addEventListener('focusout', () => this.start());
                
                // Pause when page is not visible
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        this.stop();
                    } else {
                        this.start();
                    }
                });
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const carousel = new TestimonialCarousel();
            
            // Optional: Enable auto-play (uncomment the line below)
            // const autoPlay = new AutoPlay(carousel, 4000);
        });

        // Performance optimization
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Trigger any resize-dependent updates
                window.dispatchEvent(new Event('optimizedResize'));
            }, 250);
        });

        // Intersection Observer for animations
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

        document.querySelectorAll('.testimonial-card').forEach(card => {
            observer.observe(card);
        });
   

  
// end testimonial swiper