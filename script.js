import { projects } from './projects.js';

const nav = document.getElementById('navbar');
const innerFlipCards = document.querySelectorAll('.flip-card-inner');

window.addEventListener('scroll', fixNav);
createProjectCard(projects);

// Sticky navbar on scroll
function fixNav() {
  if (window.scrollY > nav.offsetHeight + 50) {
    nav.classList.add('active');
  } else {
    nav.classList.remove('active');
  }
}

// Import projects dynamically and create flipcards
function createProjectCard(projects) {
  projects.forEach((project) => {
    const { title, imgSrc, description, tags, link } = project;
    const flipCardContainer = document.querySelector('.flip-card-container');
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card', 'animated-bg');
    flipCard.innerHTML = `<div class="flip-card-inner">
            <div class="flip-card-front">
              <img
                src="${imgSrc}"
                alt="Preview project"
                class="project-img"
              />
            </div>
            <div class="flip-card-back">
              <h3>${title}</h3>
              <p>${description}</p>
              <p>${tags}</p>
              <a
                href="${link}"
                target="_blank"
                class="btn"
                >Check it out
              </a>
            </div>
          </div>`;

    flipCardContainer.append(flipCard);
  });
}

// Flip card on click by toggling class
innerFlipCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    const card = event.currentTarget;
    card.classList.toggle('is-flipped');
  });
});
