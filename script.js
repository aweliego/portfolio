import { projects } from './projects.js';

const nav = document.getElementById('navbar');

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

    // Create flip-cards
    const flipCardContainer = document.querySelector('.flip-card-container');
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card', 'animated-bg');
    flipCardContainer.append(flipCard);

    // Create innerFlipCards
    const innerFlipCard = document.createElement('div');
    innerFlipCard.classList.add('flip-card-inner');

    // Add event-listener
    innerFlipCard.addEventListener('click', (event) => {
      const card = event.currentTarget;
      card.classList.toggle('is-flipped');
    });

    // Show cards content after 1.5s
    setTimeout(() => {
      innerFlipCard.innerHTML = `<div class="flip-card-front">
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
      </div>`;

      flipCard.classList.remove('animated-bg');
    }, 1500);

    flipCard.append(innerFlipCard);
  });
}
