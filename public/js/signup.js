const signUpFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (name && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/game');
    } else {
      document.getElementById('errorMSG').textContent = "Inproper email or password"
    }
  }
};
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signUpFormHandler);