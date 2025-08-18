const cards = document.querySelectorAll(".card");
const container = document.querySelector('.container');
let activeCard = null;

// Set active card
function setActive(card) {
    if (activeCard) {
        activeCard.classList.remove("active");
    }
    card.classList.add("active");
    activeCard = card;
}

// Initialize with first card
setActive(cards[0]);

// Simple IntersectionObserver - let it do its job
const observer = new IntersectionObserver((entries) => {
    let bestCard = null;
    let bestRatio = 0;
    
    // Find the card with highest intersection ratio
    entries.forEach(entry => {
        if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestCard = entry.target;
        }
    });
    
    // Only update if we have a visible card and it's different
    if (bestCard && bestCard !== activeCard && bestRatio > 0.3) {
        setActive(bestCard);
    }
}, {
    root: container,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
});

// Observe all cards
cards.forEach(card => observer.observe(card));

// Click handler
cards.forEach(card => {
    card.addEventListener("click", () => {
        setActive(card);
        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});
