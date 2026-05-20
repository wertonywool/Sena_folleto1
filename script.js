document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const sections = document.querySelectorAll('section');
    const bg = document.getElementById('bg-animation');

    const showSection = (id) => {
        // Find current active section to apply transition effects
        const current = document.querySelector('section.active');
        
        sections.forEach(s => {
            s.classList.remove('active');
            s.classList.add('hidden');
        });

        const target = document.getElementById(id);
        target.classList.remove('hidden');
        setTimeout(() => {
            target.classList.add('active');
        }, 50);

        // Change background theme with smooth transition
        bg.className = ''; // reset
        if (id === 'page-1') bg.classList.add('bg-p1');
        else if (id === 'page-2') bg.classList.add('bg-p2');
        else if (id === 'page-3') bg.classList.add('bg-p3');
        else if (id === 'final') bg.classList.add('bg-final');
    };

    startBtn.addEventListener('click', () => {
        showSection('page-1');
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextId = btn.getAttribute('data-next');
            showSection(nextId);
        });
    });

    restartBtn.addEventListener('click', () => {
        showSection('intro');
    });

    // Optional: Mouse movement effect on background
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        bg.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });
});
