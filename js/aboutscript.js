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


document.addEventListener('DOMContentLoaded', function() {
            // Animate benefit items on load
            const benefitItems = document.querySelectorAll('.benefit-item');
            
            setTimeout(() => {
                benefitItems.forEach((item, index) => {
                    const delay = parseInt(item.getAttribute('data-delay'));
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, delay);
                });
            }, 300);
            
            // Story button interaction with ripple effect
            const storyBtn = document.querySelector('.story-btn');
            storyBtn.addEventListener('click', function(e) {
                // Button press animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // You can add your navigation logic here
                console.log('Our Story clicked!');
            });
            
            // Parallax effect for floating decorations
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const decorations = document.querySelectorAll('.floating-decoration');
                
                decorations.forEach((decoration, index) => {
                    const speed = 0.1 + (index * 0.05);
                    decoration.style.transform += ` translateY(${scrolled * speed}px)`;
                });
            });
            
            // Add smooth hover effects
            const benefitItems2 = document.querySelectorAll('.benefit-item');
            benefitItems2.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
            
            // Image loading enhancement
            const mainImage = document.querySelector('.main-image');
            const placeholder = document.querySelector('.image-placeholder');
            
            if (mainImage) {
                mainImage.addEventListener('load', function() {
                    this.style.opacity = '0';
                    setTimeout(() => {
                        this.style.transition = 'opacity 0.5s ease';
                        this.style.opacity = '1';
                    }, 100);
                });
            }
        });

// Enhanced hover effects for product cards
document.addEventListener('DOMContentLoaded', function() {
            const faqItems = document.querySelectorAll('.faq-item');
            const faqBtn = document.querySelector('.faq-btn');
            
            // FAQ Button interaction with ripple effect
            faqBtn.addEventListener('click', function(e) {
                // Button press animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });

            // FAQ accordion functionality
            faqItems.forEach((item, index) => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const answerContent = item.querySelector('.faq-answer-content');
                
                // Open first FAQ item by default
                if (index === 0) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
                
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            otherAnswer.style.maxHeight = '0';
                        }
                    });
                    
                    // Toggle current item
                    if (isActive) {
                        item.classList.remove('active');
                        answer.style.maxHeight = '0';
                    } else {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
                
                // Add hover effect
                question.addEventListener('mouseenter', function() {
                    if (!item.classList.contains('active')) {
                        this.style.backgroundColor = '#fafafa';
                    }
                });
                
                question.addEventListener('mouseleave', function() {
                    if (!item.classList.contains('active')) {
                        this.style.backgroundColor = 'transparent';
                    }
                });
            });
            
            // Smooth scroll to FAQ section when FAQ button is clicked
            faqBtn.addEventListener('click', function() {
                const faqContainer = document.querySelector('.faq-container');
                faqContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
            
            // Add intersection observer for animation on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observe FAQ items for scroll animations
            faqItems.forEach(item => {
                observer.observe(item);
            });
            
            // Add keyboard accessibility
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.setAttribute('tabindex', '0');
                question.setAttribute('role', 'button');
                question.setAttribute('aria-expanded', item.classList.contains('active'));
                
                question.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
            
            // Update aria-expanded when items are toggled
            const updateAriaExpanded = () => {
                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-question');
                    question.setAttribute('aria-expanded', item.classList.contains('active'));
                });
            };
            
            // Call update function whenever FAQ items change
            const originalClick = HTMLElement.prototype.click;
            faqItems.forEach(item => {
                item.querySelector('.faq-question').addEventListener('click', updateAriaExpanded);
            });
        });
    