// 1. Cursor
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
window.addEventListener("mousemove", (e) => {
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
  cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
});

// 2. Scroll Progress
window.addEventListener('scroll', () => {
  const scroll = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('progress-bar').style.width = scroll + '%';
});

// 3. Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      if(entry.target.id === 'skills') {
        document.querySelectorAll('.skill-item').forEach(item => {
          const level = item.getAttribute('data-level');
          const fill = item.querySelector('.fill');
          const pctText = item.querySelector('.pct');
          fill.style.width = level + '%';
          let start = 0;
          const interval = setInterval(() => {
            if(start >= level) clearInterval(interval);
            else { start++; pctText.innerText = start + '%'; }
          }, 20);
        });
      }
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.section').forEach(s => observer.observe(s));

// 4. Modals
const setupModal = (btnId, modalId, closeClass) => {
  const btn = document.getElementById(btnId);
  const modal = document.getElementById(modalId);
  const close = document.querySelector(closeClass);
  if(btn) btn.onclick = (e) => { e.preventDefault(); modal.style.display = 'block'; }
  if(close) close.onclick = () => modal.style.display = 'none';
  window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });
}
setupModal('resume-btn', 'resume-modal', '.close-btn');
setupModal('contact-btn', 'contact-modal', '.contact-close');

// ---- Generate PDF for Resume (jsPDF) ----
document.getElementById('resume-btn').addEventListener('click', (e) => {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(138, 43, 226); // purple
  doc.text("Aditya Joshi", 20, 30);

  // Subtitle
  doc.setFont("times", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Computer Engineering Student", 20, 40);
  doc.text("Email: adityajoshi200210@gmail.com | Phone: +977-9818273442 | Nepal", 20, 48);

  // Education
  doc.setFont("times", "bold");
  doc.setTextColor(75, 0, 130); // indigo
  doc.text("Education:", 20, 62);
  doc.setFont("times", "normal");
  doc.text("- BE in Computer Engineering, Advanced College of Engineering and Management, Kalanki, Kathmandu (2022–present)", 20, 72);
  doc.text("- +2, Prasadi Academy, Kumaripati, Lalitpur (2020–2021)", 20, 80);
  doc.text("- SEE, DAVSKVB, Jawalakhel, Lalitpur (2019)", 20, 88);

  // Skills
  doc.setFont("times", "bold");
  doc.text("Technical Skills:", 20, 104);
  doc.setFont("times", "normal");
  doc.text("- Frontend: HTML, CSS, JavaScript", 20, 114);
  doc.text("- Backend: C, C++, Python", 20, 122);
  doc.text("- Tools & Tech: Unity (AR/VR), Blender, Machine Learning & AI", 20, 130);

  // Professional Skills
  doc.setFont("times", "bold");
  doc.text("Professional Skills:", 20, 146);
  doc.setFont("times", "normal");
  doc.text("- Problem Solving", 20, 156);
  doc.text("- Communication", 20, 164);
  doc.text("- Time Management", 20, 172);

  // Projects
  doc.setFont("times", "bold");
  doc.text("Projects:", 20, 188);
  doc.setFont("times", "normal");
  doc.text("- Decentralized Inventory Management using Blockchain", 20, 198);
  doc.text("- AR Learning Concept Project", 20, 206);

  // Interests
  doc.setFont("times", "bold");
  doc.text("Interests:", 20, 222);
  doc.setFont("times", "normal");
  doc.text("- Augmented Reality (AR/VR)", 20, 232);
  doc.text("- Web & Mobile Apps", 20, 240);
  doc.text("- Data Science & Emerging Tech", 20, 248);

  // Save the PDF
  doc.save("Aditya_Joshi_Resume.pdf");
});
