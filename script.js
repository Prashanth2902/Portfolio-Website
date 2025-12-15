// Steam Portfolio JavaScript - Single Page Version with Separated Sections

// Performance-optimized IntersectionObserver for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Navigation active state observer - More reliable approach
let scrollTimeout;
function updateNavOnScroll() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        const sections = document.querySelectorAll('.section-card');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = 'home'; // default
        const scrollPos = window.scrollY + window.innerHeight / 3; // Check at 1/3 from top
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Set up scroll spy for navigation
    window.addEventListener('scroll', updateNavOnScroll);
    updateNavOnScroll(); // Run once on load
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Counter Animation for Stats
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const speed = 200;
        
        // Create an observer for counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const animate = () => {
                        const value = +counter.getAttribute('data-target');
                        const data = +counter.innerText;
                        const time = value / speed;
                        
                        if(data < value) {
                            counter.innerText = Math.ceil(data + time);
                            setTimeout(animate, 10);
                        } else {
                            if (counter.parentElement.querySelector('.stat-label').textContent.includes('K+')) {
                                counter.innerText = value + 'K+';
                            } else if (counter.parentElement.querySelector('.stat-label').textContent.includes('%')) {
                                counter.innerText = value + '%';
                            } else {
                                counter.innerText = value + '+';
                            }
                        }
                    }
                    
                    setTimeout(animate, 500);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Glitch effect on name and section titles
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('glitch-active');
            setTimeout(() => {
                this.classList.remove('glitch-active');
            }, 500);
        });
    });

    // Achievement hover animations
    const achievements = document.querySelectorAll('.achievement');
    achievements.forEach(ach => {
        ach.addEventListener('mouseenter', function() {
            if(!this.classList.contains('locked')) {
                this.style.transform = 'scale(1.2) rotate(5deg)';
                setTimeout(() => {
                    this.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
            }
        });
    });

    // Project filters
    const filters = document.querySelectorAll('.filter-tag');
    const projects = document.querySelectorAll('#projects .project-card');

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Animate filter change
            projects.forEach(project => {
                project.style.transform = 'scale(0.9)';
                project.style.opacity = '0.5';
                
                setTimeout(() => {
                    // Filter logic
                    if (filterValue === 'all') {
                        project.style.display = 'block';
                    } else {
                        const category = project.getAttribute('data-category');
                        const normalizedCategory = category ? category.toLowerCase().replace(/[\s\/]/g, '') : '';
                        const normalizedFilter = filterValue.toLowerCase().replace(/[\s\/]/g, '');
                        
                        if (normalizedCategory.includes(normalizedFilter)) {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    }
                    
                    project.style.transform = 'scale(1)';
                    project.style.opacity = '1';
                }, 300);
            });
        });
    });

    // Project card hover effects
    const allProjectCards = document.querySelectorAll('.project-card');
    allProjectCards.forEach(project => {
        project.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.animation = 'icon-bounce 0.5s ease';
                setTimeout(() => {
                    icon.style.animation = 'project-icon-glow 2s ease-in-out infinite';
                }, 500);
            }
        });
    });

    // Add parallax effect to particles with throttling for better performance
    let ticking = false;
    document.addEventListener('mousemove', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const particles = document.querySelector('.particles');
                if (particles) {
                    const x = e.clientX / window.innerWidth;
                    const y = e.clientY / window.innerHeight;
                    particles.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add sound effect simulation on button clicks (visual feedback)
    const buttons = document.querySelectorAll('.steam-btn, .project-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('click-ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add Easter egg - Konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Create achievement notification
        const notification = document.createElement('div');
        notification.className = 'easter-egg-notification';
        notification.innerHTML = `
            <span class="achievement-icon">🎮</span>
            <span>Secret Achievement Unlocked: Konami Master!</span>
        `;
        document.body.appendChild(notification);

        // Trigger rainbow effect
        document.body.classList.add('rainbow-mode');

        setTimeout(() => {
            notification.remove();
            document.body.classList.remove('rainbow-mode');
        }, 5000);
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.project-card, .skill-category, .social-link');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Add typing effect to bio (only on first visit to home section)
    const bio = document.querySelector('.bio');
    if (bio && !sessionStorage.getItem('bioAnimated')) {
        const text = bio.textContent;
        bio.textContent = '';
        bio.style.visibility = 'visible';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                bio.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 20);
            }
        }
        
        setTimeout(typeWriter, 1000);
        sessionStorage.setItem('bioAnimated', 'true');
    }

    // Keyboard navigation for sections
    document.addEventListener('keydown', function(e) {
        // Ignore if typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        const sections = ['home', 'experience', 'education', 'projects', 'skills', 'connect'];
        const currentActive = document.querySelector('.nav-link.active');
        
        if (!currentActive) return;
        
        const currentHref = currentActive.getAttribute('href').substring(1);
        const currentIndex = sections.indexOf(currentHref);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            const nextSection = document.getElementById(sections[currentIndex + 1]);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            const prevSection = document.getElementById(sections[currentIndex - 1]);
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Console Easter Egg
console.log('%c🎮 Welcome to the Steam Portfolio! 🎮', 
    'font-size: 20px; font-weight: bold; color: #66c0f4; text-shadow: 0 0 10px #66c0f4;');
console.log('%cPress ↑ ↑ ↓ ↓ ← → ← → B A for a surprise!', 
    'font-size: 12px; color: #a4d007;');
console.log('%cUse ↑ and ↓ arrow keys to navigate between sections', 
    'font-size: 11px; color: #8f98a0;');
