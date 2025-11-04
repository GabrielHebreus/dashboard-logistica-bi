// Alternância de tema e efeitos globais
document.addEventListener("DOMContentLoaded", function() {
    initializeTheme();
    initializeTypingEffect();
    initializeParticles();
    initializeModal();
    initializeSmoothScroll();
});

// Sistema de tema
function initializeTheme() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIconDark = document.querySelector(".theme-icon-dark");
    const themeIconLight = document.querySelector(".theme-icon-light");
    
    if (!themeToggle) return;
    
    // Verificar preferência de tema salva
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcons(savedTheme);
    
    themeToggle.addEventListener("click", function() {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcons(newTheme);
    });
    
    function updateThemeIcons(theme) {
        if (!themeIconDark || !themeIconLight) return;
        
        if (theme === "light") {
            themeIconDark.style.display = "none";
            themeIconLight.style.display = "block";
        } else {
            themeIconDark.style.display = "block";
            themeIconLight.style.display = "none";
        }
    }
}

// Efeito de digitação
function initializeTypingEffect() {
    const developerTextElement = document.querySelector(".developer-text");
    if (!developerTextElement) return;

    const textToType = "Desenvolvido Por G. Hebreus";
    let i = 0;
    const typingSpeed = 70;
    let isDeleting = false;
    let typeTimeout;

    function typeWriter() {
        const currentText = textToType.substring(0, i);
        developerTextElement.textContent = currentText;

        if (!isDeleting && i < textToType.length) {
            i++;
            typeTimeout = setTimeout(typeWriter, typingSpeed);
        } else if (isDeleting && i > 0) {
            i--;
            typeTimeout = setTimeout(typeWriter, typingSpeed / 2);
        } else {
            isDeleting = !isDeleting;
            typeTimeout = setTimeout(typeWriter, isDeleting ? 1000 : typingSpeed);
        }
    }

    typeWriter();

    // Limpar timeout quando a página for fechada
    window.addEventListener("beforeunload", () => {
        clearTimeout(typeTimeout);
    });
}

// Função para rolar suavemente
function initializeSmoothScroll() {
    window.scrollToReports = function() {
        const relatoriosSection = document.getElementById("relatorios");
        if (relatoriosSection) {
            relatoriosSection.scrollIntoView({ behavior: "smooth" });
        }
    };
}

// Sistema de partículas otimizado
function initializeParticles() {
    const canvas = document.getElementById("particles-background");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;
    let W, H;

    const mouse = {
        x: undefined,
        y: undefined,
        radius: 100
    };

    // Configurações de performance
    const config = {
        maxParticles: 60, // Reduzido para melhor performance
        colors: ["#00ff00", "#00cc00", "#99ff99", "#00ccaa"],
        connectionDistance: 120
    };

    // Otimização: evitar recálculos desnecessários
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    class Particle {
        constructor() {
            this.reset();
            this.density = Math.random() * 30 + 1;
        }

        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
            this.alpha = Math.random() * 0.3 + 0.1;
        }

        update() {
            // Movimento normal
            if (this.x > W || this.x < 0) this.speedX *= -1;
            if (this.y > H || this.y < 0) this.speedY *= -1;

            this.x += this.speedX;
            this.y += this.speedY;

            // Interação com mouse (se estiver definido)
            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const forceX = (dx / distance) * force * this.density;
                    const forceY = (dy / distance) * force * this.density;

                    this.x -= forceX;
                    this.y -= forceY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
        }
    }

    function resizeCanvas() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = document.body.scrollHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < config.maxParticles; i++) {
            particles.push(new Particle());
        }
    }

    // Conexões otimizadas (menos intensivas)
    function drawConnections() {
        ctx.strokeStyle = "rgba(0, 255, 0, 0.05)";
        ctx.lineWidth = 0.5;

        // Verificar menos partículas para melhor performance
        for (let i = 0; i < particles.length; i += 2) {
            for (let j = i + 1; j < particles.length; j += 2) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);

        for (const particle of particles) {
            particle.update();
            particle.draw();
        }

        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    function init() {
        resizeCanvas();
        createParticles();

        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        animate();
    }

    // Debounce no resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            particles.forEach(p => p.reset());
        }, 250);
    });

    init();

    // Cleanup
    window.addEventListener("beforeunload", () => {
        cancelAnimationFrame(animationId);
    });
}

// Modal do Power BI
function initializeModal() {
    const modal = document.getElementById("iframeModal");
    const closeModal = document.querySelector(".close-modal");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const iframe = document.getElementById("powerbiFrame");

    if (!modal || !closeModal) return;

    // Usar ID específico em vez de seleção por texto
    const cardTV = document.getElementById("tvReportCard");
    
    if (cardTV) {
        cardTV.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevenir scroll
        });
    }

    // Fechar modal
    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Restaurar scroll
    });

    // Fechar modal ao clicar fora
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // Tecla ESC para fechar modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // Tela cheia
    if (fullscreenBtn && iframe) {
        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                iframe.requestFullscreen().catch(err => console.error("Erro ao entrar em tela cheia:", err));
            } else {
                document.exitFullscreen();
            }
        });
    }
}