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

    // Make particles follow mouse movement
    document.addEventListener('mousemove', (event) => {
        const particles = document.querySelector('#particles-js canvas');
        const rect = particles.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        particles.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
    });
});
