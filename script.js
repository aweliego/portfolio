// Flip card on click by toggling class

const cards = document.querySelectorAll('.flip-card-inner');

cards.forEach(function (card) {
  card.addEventListener('click', (event) => {
    const card = event.currentTarget;
    card.classList.toggle('is-flipped');
  });
});
