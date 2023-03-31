const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const data = { username, password };
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error(error));
});
