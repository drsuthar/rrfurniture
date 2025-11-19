// ===== Dark/Light Mode Toggle =====
const toggle = document.getElementById('theme-toggle');
const body = document.body;
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  header.classList.add('dark-mode');
  footer?.classList.add('dark-mode');
  if (toggle) toggle.textContent = '☀️'; // Sun for light mode
} else {
  if (toggle) toggle.textContent = '🌙'; // Moon for dark mode
}

// Toggle function
if (toggle) {
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    footer?.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      toggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      toggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}
