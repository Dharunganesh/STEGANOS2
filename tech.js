// Performance optimized card interactions
const cards = document.querySelectorAll(".card");
let isAutoScrolling = false;
let scrollTimeout;

// Debounced scroll handler for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add click + touch events with performance optimization
cards.forEach(card => {
    card.addEventListener("click", () => {
        isAutoScrolling = true;
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        
        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Clear existing timeout
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        // Unlock after scroll settles
        scrollTimeout = setTimeout(() => { 
            isAutoScrolling = false; 
        }, 600);
    });

    card.addEventListener("touchstart", handleHighlight, { passive: true });
});

// Highlight function
function handleHighlight(e) {
    cards.forEach(c => c.classList.remove("active"));
    e.currentTarget.classList.add("active");
}

// Optimized highlight function with intersection observer
const observerOptions = {
    root: document.querySelector('.container'),
    rootMargin: '0px',
    threshold: 0.5
};

const cardObserver = new IntersectionObserver((entries) => {
    if (isAutoScrolling) return;
    
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            cards.forEach(card => card.classList.remove("active"));
            entry.target.classList.add("active");
        }
    });
}, observerOptions);

// Observe all cards
cards.forEach(card => cardObserver.observe(card));

// Highlight closest card on scroll (fallback)
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
        cards.forEach(card => card.classList.remove("active"));
        closest.classList.add("active");
    }
}

// Debounced scroll handler
const debouncedHighlight = debounce(highlightVisibleCard, 100);
document.querySelector('.container').addEventListener('scroll', debouncedHighlight, { passive: true });

// Always highlight first card on entry
window.addEventListener('load', () => {
    cards.forEach(c => c.classList.remove("active"));
    if (cards.length > 0) {
        cards[0].classList.add("active");
    }
});

// Enable hover highlight ONLY if device has mouse
if (window.matchMedia('(hover: hover)').matches) {
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
        });
    });
}

// Add smooth entrance animation
window.addEventListener('load', () => {
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
});
