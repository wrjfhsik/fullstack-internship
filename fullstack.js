let token = '';

// Function to switch between sections
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
}

// Register Form Submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await response.json();
  token = data.token;
  alert('Registered successfully!');
  showSection('login-section');
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (data.token) {
    token = data.token;
    alert('Logged in successfully!');
    showSection('apparel-section');
  } else {
    alert('Invalid login credentials');
  }
});

// Apparel Submission Form
document.getElementById('apparelForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const condition = document.getElementById('condition').value;
  const preferences = document.getElementById('preferences').value;

  const response = await fetch('/api/apparel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
    body: JSON.stringify({ name, category, condition, preferences })
  });

  const data = await response.json();
  if (data._id) {
    alert('Apparel submitted successfully!');
  } else {
    alert('Failed to submit apparel');
  }
});
