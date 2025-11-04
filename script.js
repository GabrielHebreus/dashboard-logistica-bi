// Alternância de tema
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIconDark = document.querySelector(".theme-icon-dark");
    const themeIconLight = document.querySelector(".theme-icon-light");
    
    // Verificar se há uma preferência de tema salva
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeIcons(savedTheme);
    }
    
    themeToggle.addEventListener("click", function() {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        
        updateThemeIcons(newTheme);
    });
    
    function updateThemeIcons(theme) {
        if (theme === "light") {
            themeIconDark.style.display = "none";
            themeIconLight.style.display = "block";
        } else {
            themeIconDark.style.display = "block";
            themeIconLight.style.display = "none";
        }
    }
});

// Efeito de digitação
document.addEventListener("DOMContentLoaded", function () {
    const developerTextElement = document.querySelector(".developer-text");
    const textToType = "Desenvolvido Por G. Hebreus";
    let i = 0;
    const typingSpeed = 70;
    let isDeleting = false;
    let typeTimeout;

    function typeWriter() {
        const currentText = textToType.substring(0, i);
        developerTextElement.textContent = currentText;

        if (!isDeleting && i < textToType.length) {
            // Modo de digitação
            i++;
            typeTimeout = setTimeout(typeWriter, typingSpeed);
        } else if (isDeleting && i > 0) {
            // Modo de exclusão
            i--;
            typeTimeout = setTimeout(typeWriter, typingSpeed / 2);
        } else {
            // Alternar entre digitação e exclusão
            isDeleting = !isDeleting;
            typeTimeout = setTimeout(typeWriter, isDeleting ? 1000 : typingSpeed);
        }
    }

    typeWriter();

    // Limpar timeout quando a página for fechada
    window.addEventListener("beforeunload", () => {
        clearTimeout(typeTimeout);
    });
});

// Função para rolar suavemente até a seção de relatórios
function scrollToReports() {
    const relatoriosSection = document.getElementById("relatorios");
    if (relatoriosSection) {
        relatoriosSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Sistema de partículas melhorado
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("particles-background");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W, H;
    const particles = [];
    const maxParticles = 80;
    const colors = ["#00ff00", "#00cc00", "#99ff99", "#00ccaa"];
    let animationId;

    const mouse = {
        x: undefined,
        y: undefined,
        radius: 100,
    };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    function resizeCanvas() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = document.body.scrollHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.3 + 0.1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = Math.random() * 30 + 1;
        }

        update() {
            // Verificar colisão com mouse
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;

            // Força de repulsão máxima
            const maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;

            // Se a força for negativa (muito longe), definir como 0
            if (force < 0) force = 0;

            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                // Repelir partícula do mouse
                this.x -= directionX;
                this.y -= directionY;
            } else {
                // Movimento normal com bounce nas bordas
                if (this.x > W || this.x < 0) this.speedX *= -1;
                if (this.y > H || this.y < 0) this.speedY *= -1;

                this.x += this.speedX;
                this.y += this.speedY;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;

            // Efeito de brilho
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(
                this.x,
                this.y,
                this.size * 0.5,
                this.x,
                this.y,
                this.size * 2
            );
            gradient.addColorStop(0, `${this.color}20`);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    let opacity = 1 - distance / 120;
                    ctx.strokeStyle = `rgba(0, 255, 0, ${opacity * 0.1})`;
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
        particles.length = 0;

        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        connectParticles();

        animationId = requestAnimationFrame(animate);
    }

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            particles.forEach((p) => {
                p.x = Math.random() * W;
                p.y = Math.random() * H;
            });
        }, 250);
    });

    init();

    window.addEventListener("beforeunload", () => {
        cancelAnimationFrame(animationId);
    });
});

// ===== MODAL DO IFRAME POWER BI =====
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("iframeModal");
  const closeModal = document.querySelector(".close-modal");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const iframe = document.getElementById("powerbiFrame");

  // Selecionar o card específico
  const cardTV = Array.from(document.querySelectorAll(".report-card"))
    .find(card => card.querySelector("h3")?.textContent.includes("Produtividade - SE (TV)"));

  if (cardTV) {
    cardTV.addEventListener("click", (e) => {
      e.preventDefault(); // Evita redirecionar para Power BI
      modal.classList.add("active");
    });
  }

  // Fechar modal
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Fechar modal ao clicar fora
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });

  // Botão de tela cheia
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  });
});
