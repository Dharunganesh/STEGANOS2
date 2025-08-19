const cards = document.querySelectorAll(".card");
const container = document.querySelector('.container');

// Throttle function for better performance
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

// Enhanced smooth scrolling with easing
function smoothScrollToCard(targetCard) {
  const containerRect = container.getBoundingClientRect();
  const cardRect = targetCard.getBoundingClientRect();
  const containerCenter = containerRect.height / 2;
  const cardCenter = cardRect.top - containerRect.top + cardRect.height / 2;
  const scrollOffset = cardCenter - containerCenter;
  
  container.scrollBy({
    top: scrollOffset,
    behavior: "smooth"
  });
}

// Keyboard navigation for gaming-like controls
function handleKeyNavigation(e) {
  const activeCard = document.querySelector('.card.active');
  const cardArray = Array.from(cards);
  const currentIndex = cardArray.indexOf(activeCard);
  
  let targetIndex = currentIndex;
  
  switch(e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      e.preventDefault();
      targetIndex = Math.max(0, currentIndex - 1);
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      e.preventDefault();
      targetIndex = Math.min(cards.length - 1, currentIndex + 1);
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (activeCard) {
        activeCard.click(); // Trigger any existing click handlers
      }
      break;
  }
  
  if (targetIndex !== currentIndex) {
    setActiveCard(cardArray[targetIndex]);
    smoothScrollToCard(cardArray[targetIndex]);
  }
}

// Enhanced card activation with smooth transitions
function setActiveCard(targetCard) {
  cards.forEach(card => {
    card.classList.remove("active");
    // Add subtle scale/opacity effects to non-active cards
    card.style.transform = "scale(0.95)";
    card.style.opacity = "0.7";
    card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  });
  
  if (targetCard) {
    targetCard.classList.add("active");
    targetCard.style.transform = "scale(1.05)";
    targetCard.style.opacity = "1";
    targetCard.style.zIndex = "10";
  }
}

// Improved highlight function with better center detection
function highlightVisibleCard() {
  const containerRect = container.getBoundingClientRect();
  const centerY = containerRect.top + containerRect.height / 2;
  
  let closestCard = null;
  let closestDistance = Infinity;
  let centerThreshold = containerRect.height * 0.3; // 30% of container height
  
  cards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const distance = Math.abs(centerY - cardCenterY);
    
    // Only consider cards that are significantly visible
    const cardVisible = cardRect.bottom > containerRect.top && 
                       cardRect.top < containerRect.bottom;
    
    if (cardVisible && distance < closestDistance && distance < centerThreshold) {
      closestCard = card;
      closestDistance = distance;
    }
  });
  
  if (closestCard) {
    setActiveCard(closestCard);
  }
}

// Mouse wheel navigation for smooth scrolling
function handleWheelNavigation(e) {
  e.preventDefault();
  
  const activeCard = document.querySelector('.card.active');
  const cardArray = Array.from(cards);
  const currentIndex = cardArray.indexOf(activeCard);
  
  let targetIndex = currentIndex;
  
  if (e.deltaY > 0) {
    // Scroll down
    targetIndex = Math.min(cards.length - 1, currentIndex + 1);
  } else {
    // Scroll up
    targetIndex = Math.max(0, currentIndex - 1);
  }
  
  if (targetIndex !== currentIndex) {
    setActiveCard(cardArray[targetIndex]);
    smoothScrollToCard(cardArray[targetIndex]);
  }
}

// Enhanced click handler
function handleCardClick(e) {
  const clickedCard = e.currentTarget;
  setActiveCard(clickedCard);
  smoothScrollToCard(clickedCard);
}

// Event listeners
cards.forEach(card => {
  card.addEventListener("click", handleCardClick);
  card.addEventListener("touchstart", handleCardClick);
});

// Throttled scroll listener for better performance
container.addEventListener('scroll', throttle(highlightVisibleCard, 16)); // ~60fps

// Keyboard navigation
document.addEventListener('keydown', handleKeyNavigation);

// Optional: Mouse wheel navigation (comment out if you want regular scrolling)
// container.addEventListener('wheel', handleWheelNavigation, { passive: false });

// Initialize on load
window.addEventListener('load', () => {
  highlightVisibleCard();
  // Ensure container is focusable for keyboard events
  container.setAttribute('tabindex', '-1');
});

// Optional: Auto-scroll feature for demo purposes
function startAutoScroll(interval = 3000) {
  setInterval(() => {
    const activeCard = document.querySelector('.card.active');
    const cardArray = Array.from(cards);
    const currentIndex = cardArray.indexOf(activeCard);
    const nextIndex = (currentIndex + 1) % cards.length;
    
    setActiveCard(cardArray[nextIndex]);
    smoothScrollToCard(cardArray[nextIndex]);
  }, interval);
}

// Uncomment to enable auto-scroll
// startAutoScroll();
