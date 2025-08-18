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

function highlightVisibleCard() {
  let container = document.querySelector('.container');
  let mid = window.innerHeight / 2;
  let closest = null;
  let closestDist = Infinity;

  // edge case: top
  if (container.scrollTop === 0) {
    cards.forEach(c => c.classList.remove("active"));
    cards[0].classList.add("active");
    return;
  }

  // edge case: bottom
  if (container.scrollHeight - container.scrollTop === container.clientHeight) {
    cards.forEach(c => c.classList.remove("active"));
    cards[cards.length - 1].classList.add("active");
    return;
  }

  // normal middle case
  cards.forEach(card => {
    let rect = card.getBoundingClientRect();
    let cardCenter = rect.top + rect.height / 2;
    let dist = Math.abs(mid - cardCenter);

    if (dist < closestDist) {
      closest = card;
      closestDist = dist;
    }
  });

  cards.forEach(card => card.classList.remove("active"));
  if (closest) closest.classList.add("active");
}


document.querySelector('.container').addEventListener('scroll', highlightVisibleCard);
window.addEventListener('load', highlightVisibleCard);
