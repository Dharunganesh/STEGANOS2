const cards = document.querySelectorAll(".card");
let activeIndex = 0;

function setActive(index) {
    if (index === activeIndex) return;
    
    cards.forEach(c => c.classList.remove("active"));
    cards[index].classList.add("active");
    activeIndex = index;
}

// Set first card active on load
setActive(0);

// Check if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (isMobile) {
    // Mobile: Only tap to highlight
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            setActive(index);
        });
    });
    
} else {
    // Desktop: Hover to highlight + click to scroll
    cards.forEach((card, index) => {
        card.addEventListener("mouseenter", () => {
            setActive(index);
        });
        
        card.addEventListener("click", () => {
            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    });
}
