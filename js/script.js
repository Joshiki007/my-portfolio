// 1. Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Outline has a slight delay for a smooth effect
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// 2. Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progress-bar').style.width = (scrollTop / scrollHeight) * 100 + '%';
});

// 3. Fade-in Observer
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
sections.forEach(s => observer.observe(s));

// 4. Skill Hover with Percentage Count
const skills = document.querySelectorAll('.skill');
skills.forEach(skill => {
  const bar = document.createElement('div');
  bar.classList.add('skill-bar');
  skill.appendChild(bar);

  const count = document.createElement('span');
  count.classList.add('skill-count');
  count.innerText = '0%';
  skill.appendChild(count);

  skill.addEventListener('mouseenter', () => {
    const level = parseInt(skill.dataset.level);
    bar.style.width = level + '%';
    
    let start = 0;
    const counter = setInterval(() => {
      if (start >= level) {
        clearInterval(counter);
      } else {
        start++;
        count.innerText = start + '%';
      }
    }, 10);
  });

  skill.addEventListener('mouseleave', () => {
    bar.style.width = '0%';
    count.innerText = '0%';
  });
});

// 5. Modal Logic
const resumeBtn = document.getElementById('resume-btn');
const resumeModal = document.getElementById('resume-modal');
const closeBtn = document.querySelector('.close-btn');

const contactBtn = document.getElementById('contact-btn');
const contactModal = document.getElementById('contact-modal');
const contactClose = document.querySelector('.contact-close');

resumeBtn.onclick = (e) => { e.preventDefault(); resumeModal.style.display = 'block'; }
closeBtn.onclick = () => resumeModal.style.display = 'none';

contactBtn.onclick = (e) => { e.preventDefault(); contactModal.style.display = 'block'; }
contactClose.onclick = () => contactModal.style.display = 'none';

window.onclick = (e) => {
  if (e.target === resumeModal) resumeModal.style.display = 'none';
  if (e.target === contactModal) contactModal.style.display = 'none';
}