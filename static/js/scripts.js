document.addEventListener('DOMContentLoaded', () => {
    particlesJS.load('particles-js', 'static/js/particles.json', function() {
        console.log('Particles.js config loaded');
    });

    const texts = ['Builder.', 'Software Engineer.', 'Frontend Developer.'];
    let count = 0;
    const dynamicText = document.querySelector('.typewrite .wrap');

    setInterval(() => {
        dynamicText.textContent = texts[count];
        count = (count + 1) % texts.length;
    }, 2000);

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);
        const data = {
            'entry.786412705': formData.get('name'),
            'entry.1433627596': formData.get('email'), 
            'entry.1493723441': formData.get('message') 
        };

        fetch('https://docs.google.com/forms/d/e/1FAIpQLSf1oGAqW84VysTW4zM7c0CmCmiVv3q2v5_at4jjT5TgoFR1lA/formResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data).toString()
        })
        .then(response => {
            document.getElementById('responseMessage').innerText = 'Thank you for your message!';
            this.reset();
        })
        .catch(error => {
            document.getElementById('responseMessage').innerText = 'There was an error submitting your message. Please try again.';
            console.error('Error:', error);
        });
    });
});
