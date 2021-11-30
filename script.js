import { projects } from './projects.js';

const nav = document.getElementById('navbar');
const scrollElement = document.getElementById('projects');
const scrollOffset = 100;

window.addEventListener('scroll', fixNav);
window.addEventListener('scroll', handleScrollAnimation);

// Sticky navbar on scroll
function fixNav() {
  window.scrollY > nav.offsetHeight + 50
    ? nav.classList.add('active')
    : nav.classList.remove('active');
}

// Create projects cards on scroll
function elementInView(el, offset = 0) {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - offset
  );
}

function handleScrollAnimation() {
  if (elementInView(scrollElement, scrollOffset)) {
    createProjectCard(projects);
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
