const cards = document.querySelectorAll(".card");
const container = document.querySelector('.container');
let activeCard = null;
let isScrolling = false;

function setActive(card) {
    if (activeCard === card) return;
    
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    activeCard = card;
}

function findCenterCard() {
    const containerRect = container.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;
    
    let closestCard = null;
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
    
    if (closestCard && !isScrolling) {
        setActive(closestCard);
    }
}

// Set first card active on load
setActive(cards[0]);

// Throttled scroll handler
let scrollTimeout;
container.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(findCenterCard, 10);
});

// Click handlers
cards.forEach(card => {
    card.addEventListener("click", () => {
        isScrolling = true;
        setActive(card);
        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    });
});

// Initial check
findCenterCard();
