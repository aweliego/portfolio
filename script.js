import { projects } from './projects.js';
import { certificates } from './certificates.js';

const nav = document.getElementById('navbar');

const projectSection = document.getElementById('projects');
const bioSection = document.getElementById('bio');
const certificatesSection = document.getElementById('certificates');

window.addEventListener('scroll', fixNav);
window.addEventListener('scroll', fadeInBio);
// window.addEventListener('scroll', () => {
//   createProjectCard(projects);
// });

createProjectCard(projects);
importCertificates(certificates);

// Sticky navbar on scroll
function fixNav() {
  window.scrollY > nav.offsetHeight + 50
    ? nav.classList.add('active')
    : nav.classList.remove('active');
}

// Import projects dynamically and create flipcards
function createProjectCard(projects) {
  const triggerBottom = (window.innerHeight / 7) * 4; // the higher the number we divide the window.height by, the lower we need to scroll to see the animation
  const projectSectionTop = projectSection.getBoundingClientRect().top;
  const bioSectionTop = bioSection.getBoundingClientRect().top;

  //if (projectSectionTop < triggerBottom && bioSectionTop > triggerBottom) {
  //console.log('touched triggerBottom');
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
  //}
}

// Fade in bio text on scroll
function fadeInBio() {
  const bioContent = document.querySelector('.content');
  const triggerBottom = (window.innerHeight / 5) * 4;
  const bioSectionTop = bioSection.getBoundingClientRect().top;

  if (bioSectionTop < triggerBottom) {
    bioContent.style.opacity = '1';
  }
}

// Import certificates dynamically
function importCertificates(certificates) {
  const certificateGrid = document.createElement('div');
  certificateGrid.classList.add('certificates-grid');

  certificates.forEach((certificate) => {
    const { link, imgSrc } = certificate;

    const certificateEl = document.createElement('div');
    certificateGrid.append(certificateEl);
    certificatesSection.append(certificateGrid);

    certificateEl.innerHTML = `<a
    href="${link}"
    target="_blank"
    class="certificate-card"
  >
    <img
      src="${imgSrc}"
      alt="certificate"
      class="certificate-img"
    />
  </a>`;
  });
}
