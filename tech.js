const cards = document.querySelectorAll(".card");
let activeCard = null;

function setActive(card) {
    if (activeCard === card) return;
    
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    activeCard = card;
}

// Set first card active on load
setActive(cards[0]);

// Desktop: hover events
cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        setActive(card);
    });
    
    card.addEventListener("click", () => {
        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});

// Mobile: touch events
cards.forEach(card => {
    // Touch start - highlight immediately
    card.addEventListener("touchstart", (e) => {
        setActive(card);
    }, { passive: true });
    
    // Touch end - scroll to center if it was a tap (not a scroll)
    card.addEventListener("touchend", (e) => {
        // Small delay to differentiate tap from scroll
        setTimeout(() => {
            if (activeCard === card) {
                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }, 100);
    }, { passive: true });
});

// Optional: scroll-based highlighting as fallback
let scrollTimeout;
const container = document.querySelector('.container');

function findCenterCard() {
    const containerRect = container.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;
    
    let closestCard = cards[0];
    let closestDistance = Infinity;
    
    cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const distance = Math.abs(centerY - cardCenterY);
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }
    });
    
    setActive(closestCard);
}

// Gentle scroll fallback (only when not hovering/touching)
container.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Only auto-highlight if no recent hover/touch activity
        if (!document.querySelector('.card:hover')) {
            findCenterCard();
        }
    }, 200);
});
