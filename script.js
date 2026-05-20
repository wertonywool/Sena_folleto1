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

    // --- State ---
    let currentPage = 1;
    const totalPages = 3;
    const images = [
        'parte 1.png',
        'parte 2.png',
        'parte 3.png'
    ];

    // --- Clock Logic ---
    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${h}:${m}:${s}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Cursor Glow Effect ---
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // --- Navigation Logic ---
    const updateUI = () => {
        // Reset scroll to top of the brochure frame
        const frame = document.querySelector('.brochure-frame');
        if (frame) frame.scrollTop = 0;

        // Update Image directly to avoid delays
        brochureImg.src = images[currentPage - 1];
        brochureImg.style.opacity = '1';
        brochureImg.style.transform = 'scale(1)';

        // Update HUD & Progress
        pageNumDisplay.textContent = String(currentPage).padStart(2, '0');
        const progress = (currentPage / totalPages) * 100;
        progressFill.style.width = `${progress}%`;

        // Buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.textContent = currentPage === totalPages ? 'FINALIZE' : 'NEXT';
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
            setTimeout(() => s.classList.add('hidden'), 500);
        });

        // Show target
        const target = targetId === 'page-display' ? pageDisplay : document.getElementById(targetId);
        setTimeout(() => {
            target.classList.remove('hidden');
            setTimeout(() => target.classList.add('active'), 50);
        }, 600);
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

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (pageDisplay.classList.contains('active')) {
            if (e.key === 'ArrowRight') navigate('next');
            if (e.key === 'ArrowLeft') navigate('prev');
        }
    });

    // Initial State
    document.body.classList.remove('loading');
});
