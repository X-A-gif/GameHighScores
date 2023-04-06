const signUpFormHandler = async (event) => {
  event.preventDefault();
  alert("signup clicked")
  // Collect values from the login form
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (name && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      console.log("in response.ok true")
      document.location.replace('/game');
    } else {
      console.log(response.statusText)
      alert(response.statusText);
    }
  }
};
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signUpFormHandler);