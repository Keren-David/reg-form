const form = document.getElementById('registrationForm');
const usersTableBody = document.getElementById('usersTableBody');

function calculateAge(dobStr) {
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function loadUsers() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  usersTableBody.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${user.dob}</td>
      <td>${user.acceptedTerms}</td>
    `;
    usersTableBody.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const dob = form.dob.value;
  const acceptedTerms = form.terms.checked;

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert('Date of birth must correspond to age between 18 and 55.');
    return;
  }

  // Load existing users
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Add new user
  users.push({ name, email, password, dob, acceptedTerms });

  // Save back to localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Refresh table
  loadUsers();

  // Reset form
  form.reset();
});

window.onload = () => {
  loadUsers();
};
