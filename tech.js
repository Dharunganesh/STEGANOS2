const cards = document.querySelectorAll(".card");
const container = document.querySelector('.container');

let isScrolling = false;
let scrollTimeout;
let currentActiveIndex = 0;

// Debounce function for scroll events
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

// Simple and smooth card activation
function activateCard(index) {
  if (index < 0 || index >= cards.length) return;
  
  currentActiveIndex = index;
  
  cards.forEach((card, i) => {
    card.classList.remove("active");
    
    // Smooth visual transitions without transform conflicts
    if (i === index) {
      card.style.opacity = "1";
      card.style.filter = "brightness(1.1) saturate(1.2)";
    } else {
      card.style.opacity = "0.6";
      card.style.filter = "brightness(0.8) saturate(0.8)";
    }
  });
  
  cards[index].classList.add("active");
}

// Find which card is closest to center without fighting scroll
function findCenterCard() {
  const containerRect = container.getBoundingClientRect();
  const centerY = containerRect.top + containerRect.height / 2;
  
  let closestIndex = 0;
  let closestDistance = Infinity;
  
  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const distance = Math.abs(centerY - cardCenterY);
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
  
  return closestIndex;
}

// Gentle scroll to center a card
function centerCard(index, smooth = true) {
  if (index < 0 || index >= cards.length) return;
  
  const card = cards[index];
  const containerRect = container.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  
  const containerCenter = containerRect.height / 2;
  const cardRelativeTop = cardRect.top - containerRect.top;
  const cardCenter = cardRelativeTop + cardRect.height / 2;
  const scrollAdjustment = cardCenter - containerCenter;
  
  container.scrollBy({
    top: scrollAdjustment,
    behavior: smooth ? "smooth" : "instant"
  });
}

// Handle natural scroll events
const handleScroll = debounce(() => {
  if (!isScrolling) {
    const centerIndex = findCenterCard();
    if (centerIndex !== currentActiveIndex) {
      activateCard(centerIndex);
    }
  }
}, 50);

// Keyboard navigation
function handleKeyPress(e) {
  let targetIndex = currentActiveIndex;
  
  switch(e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      e.preventDefault();
      targetIndex = Math.max(0, currentActiveIndex - 1);
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      e.preventDefault();
      targetIndex = Math.min(cards.length - 1, currentActiveIndex + 1);
      break;
    default:
      return;
  }
  
  if (targetIndex !== currentActiveIndex) {
    isScrolling = true;
    activateCard(targetIndex);
    centerCard(targetIndex);
    
    // Allow natural scrolling again after animation
    setTimeout(() => {
      isScrolling = false;
    }, 500);
  }
}

// Click handler
function handleCardClick(e) {
  const clickedCard = e.currentTarget;
  const cardIndex = Array.from(cards).indexOf(clickedCard);
  
  if (cardIndex !== currentActiveIndex) {
    isScrolling = true;
    activateCard(cardIndex);
    centerCard(cardIndex);
    
    setTimeout(() => {
      isScrolling = false;
    }, 500);
  }
}

// Initialize
function init() {
  // Set up smooth transitions
  cards.forEach((card, index) => {
    card.style.transition = "opacity 0.3s ease, filter 0.3s ease";
    card.addEventListener("click", handleCardClick);
  });
  
  // Find initial center card
  const initialCenter = findCenterCard();
  activateCard(initialCenter);
  
  // Event listeners
  container.addEventListener('scroll', handleScroll);
  document.addEventListener('keydown', handleKeyPress);
}

// Start when loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
