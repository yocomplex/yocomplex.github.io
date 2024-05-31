document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    fetch('/submit_contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString()
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('responseMessage').innerText = result.message;
        this.reset();
    })
    .catch(error => {
        document.getElementById('responseMessage').innerText = 'There was an error submitting your message. Please try again.';
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    particlesJS.load('particles-js', 'static/js/particles.json', function() {
        console.log('Particles.js config loaded');
    });

    const texts = ['Builder.', 'Software Engineer.', 'Frontend Developer.'];
    let count = 0;
    const dynamicText = document.querySelector('.dynamic-text');

    setInterval(() => {
        dynamicText.textContent = texts[count];
        count = (count + 1) % texts.length;
    }, 2000);

    const contactButton = document.getElementById('contact-button');
    contactButton.addEventListener('click', () => {
        window.location.href = '#contact';
    });
});
