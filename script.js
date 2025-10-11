
// This is for the typing animation in your "Home" section
var typed = new Typed(".text", {
    strings: ["IT  Engineer","Full Stack Developer", "ML Enthusiast", "Web Designer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


// This code makes your contact form work
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // This stops the page from reloading
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    result.innerHTML = "Sending...";
    result.style.display = 'block';
    result.style.marginTop = '10px';
    result.style.color = '#ededed';

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let jsonResponse = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Message sent successfully!";
                result.style.color = '#0ef'; // Greenish-blue for success
            } else {
                console.log(response);
                result.innerHTML = jsonResponse.message;
                result.style.color = '#ff4d4d'; // Red for error
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            result.style.color = '#ff4d4d'; // Red for error
        })
        .then(function() {
            form.reset(); // Clear the form fields after sending
            setTimeout(() => {
                result.style.display = 'none'; // Hide the message after 5 seconds
            }, 5000);
        });
});