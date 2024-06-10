document.addEventListener('DOMContentLoaded', () => {
    particlesJS.load('particles-js', 'static/js/particles.min.json', function() {
        console.log('Particles.js config loaded');
    });

    const texts = JSON.parse(document.querySelector('.typewrite').getAttribute('data-type'));
    let count = 0;
    const dynamicText = document.querySelector('.typewrite .wrap');

    function typeWriter() {
        let i = 0;
        let currentText = texts[count];
        function typing() {
            if (i < currentText.length) {
                dynamicText.innerHTML = currentText.substring(0, i + 1);
                i++;
                setTimeout(typing, 100);
            } else {
                setTimeout(deleting, 1000);
            }
        }
        function deleting() {
            if (i > 0) {
                dynamicText.innerHTML = currentText.substring(0, i - 1);
                i--;
                setTimeout(deleting, 100);
            } else {
                count = (count + 1) % texts.length;
                setTimeout(typeWriter, 500);
            }
        }
        typing();
    }
    typeWriter();

    // Modal logic
    const modal = document.getElementById('contactModal');
    const btn = document.getElementById('contactButton');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Google Sheets submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxDZkLLVTKSoOkijfqimjiJKbimOGEWB9yAjWchFKSyP8e2LfP3NLur0acW2SJit1b8pg/exec';
    const form = document.forms['contactForm'];

    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        fetch(scriptURL, { method: 'POST', body: new URLSearchParams(formData) })
            .then(response => response.json())
            .then(response => {
                const responseMessage = document.getElementById('responseMessage');
                if (response.result === 'success') {
                    responseMessage.innerText = 'Thank you for your message!';
                    responseMessage.style.color = 'green';
                    form.reset();
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 2000);
                } else {
                    responseMessage.innerText = 'There was an error submitting your message. Please try again.';
                    responseMessage.style.color = 'red';
                }
            })
            .catch(error => {
                const responseMessage = document.getElementById('responseMessage');
                responseMessage.innerText = 'There was an error submitting your message. Please try again.';
                responseMessage.style.color = 'red';
                console.error('Error:', error);
            });
    });

    // GSAP ScrollTrigger animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-content', {
        duration: 1,
        opacity: 0,
        y: -50,
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: '.hero-content',
            start: 'top center',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.about-section', {
        duration: 1,
        opacity: 0,
        x: -50,
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        }
    });

    // GSAP animation for project cards
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.project-card',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.3
    });
});
