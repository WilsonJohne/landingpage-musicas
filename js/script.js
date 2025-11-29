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

    // --- New: Netlify-friendly AJAX submit + redirect with name in query ---
    const contactForm = document.querySelector('form[name="contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);

            // Build x-www-form-urlencoded body for Netlify
            const body = new URLSearchParams();
            for (const pair of data.entries()) {
                body.append(pair[0], pair[1]);
            }

            try {
                // POST to Netlify (root) so Netlify records the form
                await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: body.toString()
                });

                // Redirect to thank you page, including name in query string
                const name = data.get('name') || '';
                const redirect = 'obrigado.html' + (name ? '?name=' + encodeURIComponent(name) : '');
                window.location.href = redirect;
            } catch (err) {
                console.error('Form submit failed', err);
                alert('There was an error sending your message. Please try again.');
            }
        });
    }
})();