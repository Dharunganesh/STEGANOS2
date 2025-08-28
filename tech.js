// Mobile-optimized card interactions for STEGANOS events
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll(".card");
    let isAutoScrolling = false;

    // 🔹 Add click + touch events with subtle gaming carousel feel
    cards.forEach(card => {
      card.addEventListener("click", () => {
        isAutoScrolling = true; // lock during auto-scroll
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        
        // Subtle smooth scroll
        card.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        // Subtle pop animation (less bouncy)
        card.style.transform = 'scale(1.03)';
        card.style.transition = 'all 0.2s ease';
        
        setTimeout(() => {
          card.style.transform = 'scale(1.05)';
          card.style.transition = 'all 0.15s ease';
        }, 200);

        // unlock after scroll settles
        setTimeout(() => { isAutoScrolling = false; }, 600);
      });

      card.addEventListener("touchstart", handleHighlight);
    });

    // 🔹 Subtle highlight function
    function handleHighlight(e) {
      cards.forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      
      // Subtle touch effect
      e.currentTarget.style.transform = 'scale(1.02)';
      e.currentTarget.style.transition = 'all 0.15s ease';
      
      setTimeout(() => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.transition = 'all 0.2s ease';
      }, 150);
    }

    // 🔹 Optimized scroll highlighting (less lag)
    function highlightVisibleCard() {
      if (isAutoScrolling) return;

      let mid = window.innerHeight / 2;
      let closest = null;
      let closestDist = Infinity;
      
      cards.forEach(card => {
        let rect = card.getBoundingClientRect();
        let cardCenter = rect.top + rect.height / 2;
        let dist = Math.abs(mid - cardCenter);
        
        if (dist < closestDist) {
          closest = card;
          closestDist = dist;
        }
      });
      
      if (closest) {
        cards.forEach(card => {
          card.classList.remove("active");
          // Subtle scale down
          card.style.transform = 'scale(0.95)';
          card.style.transition = 'all 0.3s ease';
        });
        
        closest.classList.add("active");
        // Subtle scale up
        closest.style.transform = 'scale(1.05)';
        closest.style.transition = 'all 0.3s ease';
      }
    }

    // Add scroll event listener with throttling for better performance
    let scrollTimeout;
    document.querySelector('.container').addEventListener('scroll', () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        highlightVisibleCard();
        scrollTimeout = null;
      }, 16); // ~60fps throttling
    });

    // 🔹 Simple entrance animation (less lag)
    window.addEventListener('load', () => {
      cards.forEach(c => {
        c.classList.remove("active");
        c.style.transform = 'scale(0.95)';
        c.style.transition = 'all 0.4s ease';
      });
      
      if (cards.length > 0) {
        setTimeout(() => {
          cards[0].classList.add("active");
          cards[0].style.transform = 'scale(1.05)';
        }, 100);
      }
      
      // Simple staggered entrance (less complex)
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.transform = 'scale(0.95)';
        }, index * 100); // Faster stagger
      });
    });

    // 🔹 Subtle hover effects
    if (window.matchMedia('(hover: hover)').matches) {
      cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
          cards.forEach(c => {
            c.classList.remove("active");
            c.style.transform = 'scale(0.95)';
            c.style.transition = 'all 0.25s ease';
          });
          
          card.classList.add("active");
          // Subtle hover effect
          card.style.transform = 'scale(1.03)';
          card.style.transition = 'all 0.25s ease';
        });
        
        card.addEventListener("mouseleave", () => {
          // Smooth return to active state
          card.style.transform = 'scale(1.05)';
          card.style.transition = 'all 0.25s ease';
        });
      });
    }

    // Ensure card content is visible
    cards.forEach(card => {
        card.style.overflow = 'visible';
        card.style.height = 'auto';
    });

    // Mobile performance optimizations
    if (window.matchMedia('(max-width: 768px)').matches) { // Assuming a breakpoint for mobile
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
    console.log('Mobile optimizations:', window.matchMedia('(max-width: 768px)').matches ? 'Enabled' : 'Disabled');
});
