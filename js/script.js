/**
 * Portfolio Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Revelation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Trigger counter if metric item
                if (entry.target.querySelector('[data-target]')) {
                    startCounter(entry.target.querySelector('[data-target]'));
                }

                // Trigger terminal if terminal section
                if (entry.target.id === 'terminal-body' || entry.target.closest('#terminal-body')) {
                    startTerminal();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos], .metric-item, #terminal-body').forEach(el => {
        observer.observe(el);
    });

    // 2. Metric Counters
    function startCounter(el) {
        if (el.dataset.started) return;
        el.dataset.started = "true";
        
        const target = parseInt(el.dataset.target);
        const duration = 2000; // 2 seconds
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target.toLocaleString() + (target === 95 ? "%" : "+");
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    // 3. Interactive Terminal Animation
    let terminalStarted = false;
    const terminalLines = [
        "Initializing core intelligence...",
        "Connecting to vector database (Pinecone)... DONE",
        "Loading RAG retrieval engine... DONE",
        "Booting LLM agent layer (GPT-4o)... DONE",
        "Configuring voice synthesis modules... DONE",
        "Systems status: ACTIVE & ONLINE",
        "",
        "> ready for autonomous execution."
    ];

    function startTerminal() {
        if (terminalStarted) return;
        terminalStarted = true;
        
        const terminalContent = document.querySelector('.terminal-content');
        let lineIndex = 0;
        let charIndex = 0;

        function typeLine() {
            if (lineIndex < terminalLines.length) {
                const currentLine = terminalLines[lineIndex];
                if (charIndex < currentLine.length) {
                    terminalContent.textContent += currentLine.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeLine, 30);
                } else {
                    terminalContent.textContent += '\n';
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, 500);
                }
            }
        }
        
        typeLine();
    }

    // 4. Parallax Effect for Cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });

    // 5. Architecture Node Pulse Effect
    const arrows = document.querySelectorAll('.diag-arrow');
    setInterval(() => {
        arrows.forEach((arrow, i) => {
            setTimeout(() => {
                arrow.style.opacity = '1';
                arrow.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    arrow.style.opacity = '0.3';
                    arrow.style.transform = 'scale(1)';
                }, 400);
            }, i * 200);
        });
    }, 2000);

    // 6. Mobile Navigation
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        const closeFunc = () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = 'auto';
        };

        closeMenuBtn.addEventListener('click', closeFunc);
        mobileLinks.forEach(link => link.addEventListener('click', closeFunc));
    }

});
