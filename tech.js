const cards = document.querySelectorAll(".card");
const container = document.querySelector('.container');
let activeCard = null;

// Set first card as active on load
function setActive(card) {
    if (activeCard) {
        activeCard.classList.remove("active");
    }
    card.classList.add("active");
    activeCard = card;
}

// Initialize with first card
setActive(cards[0]);

// IntersectionObserver with better thresholds
const observer = new IntersectionObserver((entries) => {
    const visibleCards = entries
        .filter(entry => entry.intersectionRatio > 0)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    
    if (visibleCards.length > 0) {
        const mostVisible = visibleCards[0].target;
        
        // Special handling for first and last cards
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const containerHeight = container.clientHeight;
        
        let targetCard = mostVisible;
        
        // Force first card when near top
        if (scrollTop < 100) {
            targetCard = cards[0];
        }
        // Force last card when near bottom
        else if (scrollTop + containerHeight > scrollHeight - 100) {
            targetCard = cards[cards.length - 1];
        }
        
        if (targetCard !== activeCard) {
            setActive(targetCard);
        }
    }
}, {
    root: container,
    threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
    rootMargin: "-10% 0px -10% 0px"
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
