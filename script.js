document.addEventListener('DOMContentLoaded', function() {
    const developerTextElement = document.querySelector('.developer-text');
    const textToType = "Desenvolvido por G. Hebreus";
    let i = 0;
    const typingSpeed = 70; // velocidade da digitação em milissegundos

    function typeWriter() {
        if (i < textToType.length) {
            developerTextElement.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    typeWriter();
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-background');
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    const maxParticles = 100;
    
    // Define o tamanho do canvas para cobrir a janela
    function resizeCanvas() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = document.body.scrollHeight; // Altura total da página
    }

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.size = Math.random() * 2 + 1;
            this.color = 'rgba(0, 255, 0, 0.8)';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > W || this.x < 0) this.speedX *= -1;
            if (this.y > H || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let distance = ((particles[a].x - particles[b].x) ** 2 + (particles[a].y - particles[b].y) ** 2) ** 0.5;
                if (distance < 120) {
                    let opacity = 1 - (distance / 120);
                    ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function init() {
        resizeCanvas();
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        connectParticles();
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        particles.forEach(p => {
            p.x = Math.random() * W;
            p.y = Math.random() * H;
        });
    });
    init();
});