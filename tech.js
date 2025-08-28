// Mobile-optimized card interactions for STEGANOS events
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll(".card");
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    console.log('Found cards:', cards.length);
    console.log('Is mobile device:', isMobile);

    // Mobile-optimized card interactions
    cards.forEach((card, index) => {
        // Add click event to the entire card
        card.addEventListener("click", function(e) {
            console.log('Card clicked:', index);
            
            // Remove active class from all cards
            cards.forEach(c => c.classList.remove("active"));
            
            // Add active class to clicked card
            this.classList.add("active");
            
            // Mobile-optimized visual feedback
            if (isMobile) {
                // Simple feedback for mobile
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            } else {
                // Enhanced feedback for desktop
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            }
        });

        // Mobile-optimized touch events
        if (isMobile) {
            // Touch start - immediate feedback
            card.addEventListener("touchstart", function(e) {
                console.log('Card touched:', index);
                
                // Remove active class from all cards
                cards.forEach(c => c.classList.remove("active"));
                
                // Add active class to touched card
                this.classList.add("active");
                
                // Immediate visual feedback
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });

            // Touch end - reset
            card.addEventListener("touchend", function(e) {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.2s ease';
            }, { passive: true });

            // Touch cancel - reset
            card.addEventListener("touchcancel", function(e) {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.2s ease';
            }, { passive: true });
        } else {
            // Desktop hover effects
            card.addEventListener("mouseenter", function() {
                cards.forEach(c => c.classList.remove("active"));
                this.classList.add("active");
            });
        }

        // Ensure card content is visible
        card.style.overflow = 'visible';
        card.style.height = 'auto';
    });

    // Mobile-optimized entrance animation
    function animateCards() {
        if (isMobile) {
            // Simple animation for mobile
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)'; // Smaller movement for mobile
                
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease'; // Faster for mobile
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100); // Faster stagger for mobile
            });
        } else {
            // Enhanced animation for desktop
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    }

    // Initialize animations with mobile optimization
    if (isMobile) {
        // Faster initialization for mobile
        setTimeout(animateCards, 50);
    } else {
        // Standard initialization for desktop
        setTimeout(animateCards, 100);
    }

    // Always highlight first card on load
    if (cards.length > 0) {
        cards[0].classList.add("active");
    }

    // Mobile performance optimizations
    if (isMobile) {
        // Reduce scroll performance impact
        let scrollTimeout;
        const container = document.querySelector('.container');
        
        if (container) {
            container.addEventListener('scroll', function() {
                // Throttle scroll events on mobile
                if (scrollTimeout) return;
                
                scrollTimeout = setTimeout(() => {
                    // Simple scroll handling for mobile
                    scrollTimeout = null;
                }, 16); // ~60fps
            }, { passive: true });
        }
        
        // Disable complex effects on mobile
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Optimize for mobile battery life
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Defer non-critical operations
                console.log('Mobile optimizations applied');
            });
        }
    }

    console.log('STEGANOS tech.js loaded successfully!');
    console.log('Mobile optimizations:', isMobile ? 'Enabled' : 'Disabled');
});
