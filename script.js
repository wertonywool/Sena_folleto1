document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    const introSection = document.getElementById('intro');
    const pageDisplay = document.getElementById('page-display');
    const finalSection = document.getElementById('final');
    
    const brochureImg = document.getElementById('brochure-img');
    const pageNumDisplay = document.getElementById('current-page-num');
    const progressFill = document.getElementById('progress-fill');
    const cursorGlow = document.getElementById('cursor-glow');
    const clockElement = document.getElementById('clock');
    const vocaloidTypeDisplay = document.getElementById('vocaloid-type');
    const particlesContainer = document.getElementById('particles');

    // --- State ---
    let currentPage = 1;
    const totalPages = 3;
    const images = [
        'page1.png',
        'page2.png',
        'page3.png'
    ];

    const pageThemes = {
        1: { theme: 'theme-miku', name: 'MIKU' },
        2: { theme: 'theme-meiko', name: 'MEIKO' },
        3: { theme: 'theme-rin', name: 'RIN' }
    };

    // --- Performance: Image Preloading ---
    const preloadImages = () => {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    preloadImages();

    // --- Clock System ---
    const updateClock = () => {
        const now = new Date();
        const time = now.toTimeString().split(' ')[0];
        if (clockElement) clockElement.textContent = time;
    };
    setInterval(updateClock, 1000);
    updateClock();

    // --- Cursor Glow System ---
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
    });

    // --- Particles System ---
    const createParticles = () => {
        if (!particlesContainer) return;
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 3 + 1;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.opacity = Math.random();
            p.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
            particlesContainer.appendChild(p);
        }
    };
    createParticles();

    // --- Navigation Logic ---
    const updateUI = () => {
        // Reset scroll to top
        const frame = document.querySelector('.brochure-frame');
        if (frame) {
            frame.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update Image directly with smooth fade
        brochureImg.style.transition = 'opacity 0.3s ease';
        brochureImg.style.opacity = '0';
        
        setTimeout(() => {
            brochureImg.src = images[currentPage - 1];
            brochureImg.onload = () => {
                brochureImg.style.opacity = '1';
            };
        }, 300);

        // Update HUD & Progress
        pageNumDisplay.textContent = String(currentPage).padStart(2, '0');
        const progress = (currentPage / totalPages) * 100;
        progressFill.style.width = `${progress}%`;

        // Update Theme
        const currentTheme = pageThemes[currentPage];
        if (currentTheme) {
            // Remove previous themes
            Object.values(pageThemes).forEach(t => document.body.classList.remove(t.theme));
            // Add new theme
            document.body.classList.add(currentTheme.theme);
            // Update HUD text
            if (vocaloidTypeDisplay) {
                vocaloidTypeDisplay.textContent = `VOCALOID_TYPE: ${currentTheme.name}`;
            }
        }

        // Buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.textContent = currentPage === totalPages ? 'FINALIZAR' : 'SIGUIENTE';
    };

    const navigate = (direction) => {
        if (direction === 'next') {
            if (currentPage < totalPages) {
                currentPage++;
                updateUI();
            } else {
                showSection('final');
            }
        } else if (direction === 'prev') {
            if (currentPage > 1) {
                currentPage--;
                updateUI();
            }
        }
    };

    const showSection = (targetId) => {
        // Hide all
        [introSection, pageDisplay, finalSection].forEach(s => {
            s.classList.remove('active');
            s.classList.add('hidden');
        });

        // Show target
        const target = targetId === 'page-display' ? pageDisplay : document.getElementById(targetId);
        target.classList.remove('hidden');
        setTimeout(() => {
            target.classList.add('active');
        }, 50);
    };

    // --- Listeners ---
    startBtn.addEventListener('click', () => {
        showSection('page-display');
        currentPage = 1;
        updateUI();
    });

    nextBtn.addEventListener('click', () => navigate('next'));
    prevBtn.addEventListener('click', () => navigate('prev'));

    restartBtn.addEventListener('click', () => {
        showSection('intro');
    });

    document.addEventListener('keydown', (e) => {
        if (pageDisplay.classList.contains('active')) {
            if (e.key === 'ArrowRight' || e.key === ' ') navigate('next');
            if (e.key === 'ArrowLeft') navigate('prev');
        }
    });

    // Initial State
    document.body.classList.remove('loading');
});

