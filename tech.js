// Cache DOM elements and variables
const cards = document.querySelectorAll(".card");
const container = document.querySelector('.container');

let activeIndex = -1;
let isUserScrolling = false;
let rafId = null;

// Single RAF-based scroll handler
function updateActiveCard() {
    const containerRect = container.getBoundingClientRect();
    const mid = containerRect.height / 2 + containerRect.top;
    
    let bestIndex = -1;
    let minDistance = Infinity;
    
    // Use for loop for better performance
    for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(mid - cardCenter);
        
        if (distance < minDistance) {
            minDistance = distance;
            bestIndex = i;
        }
    }
    
    // Only update if index changed
    if (bestIndex !== activeIndex && bestIndex !== -1) {
        // Remove active from previous
        if (activeIndex >= 0) {
            cards[activeIndex].classList.remove("active");
        }
        
        // Add active to current
        cards[bestIndex].classList.add("active");
        activeIndex = bestIndex;
    }
    
    rafId = null;
}

// Scroll event handler
function onScroll() {
    if (!isUserScrolling && !rafId) {
        rafId = requestAnimationFrame(updateActiveCard);
    }
}

// Click handler
function handleClick(index) {
    isUserScrolling = true;
    
    // Immediate visual update
    if (activeIndex >= 0) {
        cards[activeIndex].classList.remove("active");
    }
    cards[index].classList.add("active");
    activeIndex = index;
    
    // Smooth scroll
    cards[index].scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    
    // Reset flag after scroll animation
    setTimeout(() => {
        isUserScrolling = false;
    }, 600);
}

// Add event listeners efficiently
cards.forEach((card, index) => {
    card.addEventListener("click", () => handleClick(index), { passive: true });
    card.addEventListener("touchstart", () => handleClick(index), { passive: true });
});

container.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', () => {
    rafId = requestAnimationFrame(updateActiveCard);
});
