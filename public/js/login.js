const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log("")
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/game');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);









// const form = document.querySelector('form');

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const username = document.querySelector('#name').value;
//   const password = document.querySelector('#password').value;
//   const data = { username, password };
//   fetch('/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => console.error(error));
// });
