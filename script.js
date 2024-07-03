document.getElementById('fetch-button').addEventListener('click', fetchUsers);

async function fetchUsers() {
  const profilesContainer = document.getElementById('profiles-container');
  const userTableBody = document.querySelector('#user-table tbody');

  // Clear previous profiles
  profilesContainer.innerHTML = '';
  userTableBody.innerHTML = '';

  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();

    data.results.forEach(user => {
      // Create profile card
      const profileCard = document.createElement('div');
      profileCard.className = 'user-profile';

      profileCard.innerHTML = `
        <img src="${user.picture.large}" alt="User Picture">
        <h2>${user.name.first} ${user.name.last}</h2>
        <p>${user.email}</p>
      `;

      profilesContainer.appendChild(profileCard);

      // Add to table
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${user.name.first} ${user.name.last}</td>
        <td>${user.email}</td>
      `;

      userTableBody.appendChild(tableRow);
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
