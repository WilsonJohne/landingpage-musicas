(() => {
    // Menu mobile toggle
    const menuBtn = document.getElementById('menuToggle');
    let navOpen = false;
    menuBtn && menuBtn.addEventListener('click', () => {
        navOpen = !navOpen;
        const nav = document.querySelector('.nav');
        if (!nav) return;
        if (navOpen) {
            nav.style.display = 'flex';
            nav.style.position = 'absolute';
            nav.style.right = '18px';
            nav.style.top = '72px';
            nav.style.background = 'var(--glass)';
            nav.style.padding = '12px';
            nav.style.borderRadius = '12px';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
        } else {
            nav.style.display = '';
            nav.style.position = '';
            nav.style.top = '';
            nav.style.right = '';
            nav.style.background = '';
            nav.style.padding = '';
            nav.style.borderRadius = '';
            nav.style.boxShadow = '';
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // close mobile nav if open
                if (navOpen) menuBtn.click();
            }
        });
    });

    // Footer year
    const y = new Date().getFullYear();
    document.getElementById('year').textContent = y;
})();