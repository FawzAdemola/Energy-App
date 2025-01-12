document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const messageDiv = document.getElementById('message');

    if (password !== confirmPassword) {
        messageDiv.textContent = "Passwords do not match.";
        messageDiv.style.color = "red"; // Optionally change color
        return; // Stop form submission
    }

    // If passwords match, proceed with sending data to the backend
    fetch('https://swecourseproject.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname: first, lastname: last, email: email, password: password })
    })
    .then(response =>{
        console.log("Response: ", response);
        response.json();})
    .then(data => {
        console.log("Data from server", data);
        messageDiv.textContent = data.message;
        if (data.success) {
            messageDiv.style.color = "green";
            document.getElementById('signupForm').reset();
        } else {
            messageDiv.style.color = "red";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        messageDiv.textContent = "An error occurred.";
        messageDiv.style.color = "red";
    });
});