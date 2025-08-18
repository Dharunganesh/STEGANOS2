const cards = document.querySelectorAll(".card");
cards.forEach(card => {
  card.addEventListener("click", handleHighlight);
  card.addEventListener("touchstart", handleHighlight);
});

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    card.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});


function handleHighlight(e) {
  cards.forEach(c => c.classList.remove("active"));
  e.currentTarget.classList.add("active");
}

function highlightMostVisibleCard() {
  let container = document.querySelector('.container');
  let containerRect = container.getBoundingClientRect();

  let maxVisibleHeight = 0;
  let mostVisibleCard = null;

  cards.forEach(card => {
    let rect = card.getBoundingClientRect();

    // calculate visible part of card inside container
    let visibleTop = Math.max(rect.top, containerRect.top);
    let visibleBottom = Math.min(rect.bottom, containerRect.bottom);
    let visibleHeight = Math.max(0, visibleBottom - visibleTop);

    if (visibleHeight > maxVisibleHeight) {
      maxVisibleHeight = visibleHeight;
      mostVisibleCard = card;
    }
  });

  cards.forEach(card => card.classList.remove("active"));
  if (mostVisibleCard) mostVisibleCard.classList.add("active");
}

document.querySelector('.container').addEventListener('scroll', highlightVisibleCard);
window.addEventListener('load', highlightVisibleCard);

