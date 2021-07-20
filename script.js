// Sticky navbar on scroll

const nav = document.getElementById('navbar');

window.addEventListener('scroll', fixNav);

function fixNav() {
  if (window.scrollY > nav.offsetHeight + 50) {
    nav.classList.add('active');
  } else {
    nav.classList.remove('active');
  }
}

// Flip card on click by toggling class

const cards = document.querySelectorAll('.flip-card-inner');

cards.forEach(function (card) {
  card.addEventListener('click', (event) => {
    const card = event.currentTarget;
    card.classList.toggle('is-flipped');
  });
});
