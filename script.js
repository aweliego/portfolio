import { projects } from './projects.js';
import { certificates } from './certificates.js';

const nav = document.getElementById('navbar');

const projectSection = document.getElementById('projects');
const bioSection = document.getElementById('bio');
const certificatesSection = document.getElementById('certificates');

const textIntro = document.querySelector('.intro h1');
//console.log(textIntro.innerText)
const text = "hey I'm Amélie";

let idx = 1;
let speed = 250;

window.addEventListener('scroll', fixNav);
window.addEventListener('scroll', fadeInBio);
// window.addEventListener('scroll', () => {
//   createProjectCard(projects);
// });

typeOutText();
createProjectCard(projects);
importCertificates(certificates);

// Sticky navbar on scroll
function fixNav() {
  window.scrollY > nav.offsetHeight + 50
    ? nav.classList.add('active')
    : nav.classList.remove('active');
}

// Auto text effect
function typeOutText() {
  textIntro.innerText = text.slice(0, idx);
  idx++;

  setTimeout(typeOutText, speed);

  // when if statement is commented out, the text will not restart, but the function keeps on being repeated
  // if (idx > text.length) {
  //   idx = 1;
  // }
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
