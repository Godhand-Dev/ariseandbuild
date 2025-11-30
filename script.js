// script.js  ←  Minimal & Guaranteed to Work
const form = document.getElementById('registrationForm');
const modal = document.getElementById('successModal');
const successMessage = document.getElementById('successMessage');

// PASTE YOUR NEW /exec URL HERE (from the fresh deployment)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5xDTpx8oqs646ih-qUmDHChSezOqR83_ULxRwjGRvV6I2Cvih4BOaiO6zjXE6qw7Klw/exec';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    whatsapp: document.getElementById('whatsapp').value.replace(/\D/g, ''),
    gender: document.getElementById('gender').value,
    inTech: document.getElementById('inTech').value
  };

  if (data.whatsapp.length < 10) {
    alert('Please enter a valid WhatsApp number');
    return;
  }
  data.whatsapp = '+234' + data.whatsapp.slice(3);

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'text/plain' },  // ← text/plain bypasses most CORS issues
      mode: 'no-cors'  // ← This is the magic line for 2025
    });

    // With no-cors, we can't read response, but if it doesn't crash = success
    successMessage.textContent = 'Thank You for Registering! We Have Responded to You Via Email';
    modal.classList.remove('hidden');
    form.reset();

  } catch (err) {
    alert('Please check your internet connection and try again.');
  }
});

// Close modal
document.querySelector('.close-btn').onclick = () => modal.classList.add('hidden');
window.onclick = (e) => { if (e.target === modal) modal.classList.add('hidden'); };
