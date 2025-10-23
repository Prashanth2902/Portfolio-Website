// Steam Portfolio JavaScript - Game-like animations and interactions

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Counter Animation for Stats
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const speed = 200;
        
        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target');
                const data = +counter.innerText;
                const time = value / speed;
                
                if(data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 10);
                } else {
                    // Handle different types of counters
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
        });
    }

    // Glitch effect on name hover (Home page)
    const glitchName = document.querySelector('.name.glitch');
    if (glitchName) {
        glitchName.addEventListener('mouseenter', function() {
            this.classList.add('glitch-active');
            setTimeout(() => {
                this.classList.remove('glitch-active');
            }, 500);
        });
    }

    // Achievement hover animations (Home page)
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

    // Animate social links on load (Social page)
    if (window.location.pathname.includes('social.html')) {
        const links = document.querySelectorAll('.social-link');
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-50px)';
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // Glitch effect on all page titles
    const pageTitles = document.querySelectorAll('.page-title.glitch');
    pageTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.classList.add('glitch-active');
            setTimeout(() => {
                this.classList.remove('glitch-active');
            }, 500);
        });
    });

    // Project filters (Projects and Experience pages)
    if (window.location.pathname.includes('projects.html') || window.location.pathname.includes('experience.html')) {
        const filters = document.querySelectorAll('.filter-tag');
        const projects = document.querySelectorAll('.project-card');

        filters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Update active filter
                filters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.textContent.toLowerCase().replace('/', '');
                
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
                            // Handle AI/ML and other special categories
                            const normalizedCategory = category ? category.toLowerCase().replace(/[\s\/]/g, '') : '';
                            const normalizedFilter = filterValue.replace(/[\s\/]/g, '');
                            
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
        projects.forEach(project => {
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
    }

    // Add parallax effect to particles
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelector('.particles');
        if (particles) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            particles.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }
    });

    // Add sound effect simulation on button clicks (visual feedback)
    const buttons = document.querySelectorAll('.steam-btn, .project-link, .back-btn');
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

    // Loading animation for page transitions
    const pageLinks = document.querySelectorAll('a[href*=".html"]');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Add fade out effect
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
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

    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add typing effect to bio (optional)
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
});

// Fix scrolling for long content pages
if (document.body.classList.contains('has-long-content')) {
    // Ensure page is scrollable
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.height = 'auto';
    document.body.style.overflowY = 'auto';
    
    // Reset any conflicting styles
    const container = document.querySelector('.container');
    if (container) {
        container.style.height = 'auto';
        container.style.overflow = 'visible';
    }
    
    const steamCard = document.querySelector('.steam-card');
    if (steamCard) {
        steamCard.style.height = 'auto';
        steamCard.style.maxHeight = 'none';
        steamCard.style.overflow = 'visible';
    }
}

// Console Easter Egg
console.log('%c🎮 Welcome to the Steam Portfolio! 🎮', 
    'font-size: 20px; font-weight: bold; color: #66c0f4; text-shadow: 0 0 10px #66c0f4;');
console.log('%cPress ↑ ↑ ↓ ↓ ← → ← → B A for a surprise!', 
    'font-size: 12px; color: #a4d007;');