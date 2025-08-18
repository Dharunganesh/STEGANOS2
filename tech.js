// Get cards once and cache them
const cards = document.querySelectorAll(".card");
const container = document.querySelector('.container');

let activeCard = null;
let isScrolling = false;

// Throttle function to limit scroll event frequency
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized highlight function with better edge handling
function highlightVisibleCard() {
    const containerRect = container.getBoundingClientRect();
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const mid = containerHeight / 2;
    
    let closest = null;
    let closestDist = Infinity;
    let hasVisibleCard = false;

    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const containerTop = containerRect.top;
        
        // Check if card is at least partially visible
        const isVisible = rect.bottom > containerTop && rect.top < containerTop + containerHeight;
        
        if (isVisible) {
            hasVisibleCard = true;
            const cardCenter = rect.top - containerTop + rect.height / 2;
            const dist = Math.abs(mid - cardCenter);
            
            if (dist < closestDist) {
                closest = card;
                closestDist = dist;
            }
        }
    });
    
    // If no card is properly centered, check for edge cases
    if (!closest || closestDist > containerHeight * 0.4) {
        // Handle first card edge case
        const firstCard = cards[0];
        const firstRect = firstCard.getBoundingClientRect();
        const containerTop = containerRect.top;
        
        if (firstRect.top <= containerTop + 50 && scrollTop < 100) {
            closest = firstCard;
        }
        
        // Handle last card edge case
        const lastCard = cards[cards.length - 1];
        const lastRect = lastCard.getBoundingClientRect();
        const containerBottom = containerTop + containerHeight;
        
        if (lastRect.bottom >= containerBottom - 50 && 
            scrollTop + containerHeight >= container.scrollHeight - 100) {
            closest = lastCard;
        }
    }

    // Only update if the active card has changed
    if (closest !== activeCard) {
        if (activeCard) {
            activeCard.classList.remove("active");
        }
        if (closest) {
            closest.classList.add("active");
        }
        activeCard = closest;
    }
}

// Handle card clicks
function handleCardClick(card) {
    // Prevent scroll highlighting during programmatic scroll
    isScrolling = true;
    
    // Update active card immediately
    if (activeCard) {
        activeCard.classList.remove("active");
    }
    card.classList.add("active");
    activeCard = card;
    
    // Smooth scroll to card
    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    
    // Re-enable scroll highlighting after scroll completes
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// Add event listeners
cards.forEach(card => {
    card.addEventListener("click", () => handleCardClick(card));
    card.addEventListener("touchstart", () => handleCardClick(card));
});

// Throttled scroll event
const throttledHighlight = throttle(() => {
    if (!isScrolling) {
        highlightVisibleCard();
    }
}, 16); // ~60fps

container.addEventListener('scroll', throttledHighlight);
window.addEventListener('load', highlightVisibleCard);
window.addEventListener('resize', throttle(highlightVisibleCard, 100));
