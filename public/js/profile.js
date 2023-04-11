const profileFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value.trim();
    const max_score = document.querySelector('#max_score').value.trim();

    const response = await fetch (`/api/users/profile`, {
        method: 'POST',
        body: JSON.stringyfy({
            id,
            name,
            max_score,
        }),
        headers: {
            'Content-Type' : 'application/json',
        },
    })



if(response.ok){
    document.location.replace('/');

} else {alert('there was an error !!')};

  document
    .querySelector('.profile')
    .addEventListener('submit', profileFormHandler);
  
  };
  