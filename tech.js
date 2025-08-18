const container = document.querySelector('.container');
const cards = document.querySelectorAll('.card');

function setActive(card) {
  cards.forEach(c => c.classList.remove('active'));
  if (card) card.classList.add('active');
}

function highlightMostVisibleCard() {
  if (!container) return;

  // If we're at the very top, keep the first card active.
  if (container.scrollTop <= 0) {
    setActive(cards[0]);
    return;
  }

  const containerRect = container.getBoundingClientRect();
  let maxVisibleHeight = 0;
  let mostVisibleCard = null;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, containerRect.top);
    const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    if (visibleHeight > maxVisibleHeight) {
      maxVisibleHeight = visibleHeight;
      mostVisibleCard = card;
    }
  });

  setActive(mostVisibleCard);
}

// Click/touch selects and centers the card.
function onCardSelect(e) {
  const card = e.currentTarget;
  setActive(card);
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

cards.forEach(card => {
  card.addEventListener('click', onCardSelect);
  card.addEventListener('touchstart', onCardSelect, { passive: true });
});

// Highlight on scroll (rAF to keep it smooth).
container.addEventListener('scroll', () => {
  requestAnimationFrame(highlightMostVisibleCard);
});

// On load: show the first card as active.
window.addEventListener('load', () => {
  setActive(cards[0]);
});
