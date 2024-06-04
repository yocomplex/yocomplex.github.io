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
            'name': formData.get('name'),
            'email': formData.get('email'),
            'message': formData.get('message')
        };

        fetch('https://script.google.com/macros/s/AKfycbxDZkLLVTKSoOkijfqimjiJKbimOGEWB9yAjWchFKSyP8e2LfP3NLur0acW2SJit1b8pg/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data).toString()
        })
        .then(response => response.json())
        .then(response => {
            document.getElementById('responseMessage').innerText = response.result === 'success' ? 'Thank you for your message!' : 'There was an error submitting your message. Please try again.';
            if (response.result === 'success') {
                this.reset();
            }
        })
        .catch(error => {
            document.getElementById('responseMessage').innerText = 'There was an error submitting your message. Please try again.';
            console.error('Error:', error);
        });
    });
});
