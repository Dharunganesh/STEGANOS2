const cards = document.querySelectorAll(".card");
let activeIndex = 0;
let lastScrollTop = 0;

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
    // Mobile: Sequential highlighting on scroll
    const container = document.querySelector('.container');
    let scrollTimeout;
    
    container.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const currentScrollTop = container.scrollTop;
            
            if (currentScrollTop > lastScrollTop) {
                // Scrolling down - move to next card
                if (activeIndex < cards.length - 1) {
                    setActive(activeIndex + 1);
                }
            } else if (currentScrollTop < lastScrollTop) {
                // Scrolling up - move to previous card
                if (activeIndex > 0) {
                    setActive(activeIndex - 1);
                }
            }
            
            lastScrollTop = currentScrollTop;
        }, 100);
    });
    
} else {
    // Desktop: Use hover
    cards.forEach((card, index) => {
        card.addEventListener("mouseenter", () => {
            setActive(index);
        });
    });
}

// Click/tap to scroll (both platforms)
cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        setActive(index);
        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});
