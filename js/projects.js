// Projects JavaScript - Project Gallery and Portfolio Management

// Sample project data
const projectsData = [
    {
        id: 1,
        title: "CloudSync Pro",
        category: "web",
        tags: ["React", "Node.js", "AWS", "MongoDB"],
        description: "Enterprise-grade cloud synchronization platform handling 1M+ daily active users",
        image: "project1.jpg",
        featured: true,
        price: "Enterprise",
        discount: 0,
        rating: 4.9,
        reviews: 234,
        status: "completed",
        year: 2024,
        client: "TechCorp Solutions",
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        id: 2,
        title: "DataViz Dashboard",
        category: "web",
        tags: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
        description: "Real-time data visualization dashboard for analytics",
        image: "project2.jpg",
        featured: false,
        price: 199,
        discount: 75,
        rating: 4.7,
        reviews: 89,
        status: "completed",
        year: 2024,
        client: "Analytics Pro",
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        id: 3,
        title: "AI Assistant Bot",
        category: "ai",
        tags: ["Python", "TensorFlow", "NLP", "Docker"],
        description: "Intelligent chatbot with natural language processing",
        image: "project3.jpg",
        featured: false,
        price: 0,
        discount: 0,
        rating: 4.8,
        reviews: 156,
        status: "opensource",
        year: 2023,
        client: "Open Source",
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        id: 4,
        title: "Mobile Banking App",
        category: "mobile",
        tags: ["React Native", "Firebase", "Redux", "TypeScript"],
        description: "Secure mobile banking application with biometric authentication",
        image: "project4.jpg",
        featured: true,
        price: "Custom",
        discount: 0,
        rating: 5.0,
        reviews: 412,
        status: "completed",
        year: 2024,
        client: "FinTech Innovations",
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        id: 5,
        title: "E-Commerce Platform",
        category: "web",
        tags: ["Next.js", "Stripe", "Prisma", "Tailwind"],
        description: "Full-stack e-commerce solution with payment processing",
        image: "project5.jpg",
        featured: false,
        price: 299,
        discount: 50,
        rating: 4.6,
        reviews: 67,
        status: "completed",
        year: 2023,
        client: "ShopMaster Inc",
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        id: 6,
        title: "Game Engine Tools",
        category: "gamedev",
        tags: ["C++", "OpenGL", "Vulkan", "ImGui"],
        description: "Custom game engine development tools and editor",
        image: "project6.jpg",
        featured: true,
        price: "License",
        discount: 0,
        rating: 4.9,
        reviews: 45,
        status: "in-development",
        year: 2024,
        client: "GameStudio Pro",
        githubUrl: "#",
        liveUrl: "#"
    }
];

// Initialize projects functionality
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.projects-grid')) {
        renderProjects(projectsData);
        initProjectFilters();
        initProjectSearch();
        initProjectSort();
        initProjectModal();
    }
});

// Render projects to the grid
function renderProjects(projects) {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const card = createProjectCard(project);
        card.style.animationDelay = `${index * 0.1}s`;
        grid.appendChild(card);
    });
}

// Create individual project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card-extended';
    card.dataset.projectId = project.id;
    card.dataset.category = project.category;
    
    const priceDisplay = getProjectPrice(project);
    const statusBadge = getStatusBadge(project.status);
    
    card.innerHTML = `
        <div class="project-card-header">
            ${project.featured ? '<span class="featured-badge">FEATURED</span>' : ''}
            ${statusBadge}
        </div>
        <div class="project-card-image">
            <div class="project-placeholder-image">
                <span class="project-icon">${getProjectIcon(project.category)}</span>
            </div>
            <div class="project-overlay">
                <button class="btn-quick-view" data-project-id="${project.id}">
                    QUICK VIEW
                </button>
            </div>
        </div>
        <div class="project-card-content">
            <h3 class="project-name">${project.title}</h3>
            <p class="project-client">${project.client} • ${project.year}</p>
            <div class="project-tags-container">
                ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
            <p class="project-desc">${project.description}</p>
            <div class="project-rating">
                ${generateStars(project.rating)}
                <span class="rating-number">${project.rating}</span>
                <span class="review-count">(${project.reviews} reviews)</span>
            </div>
            <div class="project-card-footer">
                <div class="project-price-info">
                    ${priceDisplay}
                </div>
                <div class="project-actions">
                    <button class="btn-view-project" data-project-id="${project.id}">
                        VIEW
                    </button>
                    <button class="btn-github" onclick="window.open('${project.githubUrl}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Get project icon based on category
function getProjectIcon(category) {
    const icons = {
        web: '🌐',
        mobile: '📱',
        ai: '🤖',
        gamedev: '🎮',
        backend: '⚙️',
        frontend: '🎨',
        fullstack: '💻',
        opensource: '📂'
    };
    return icons[category] || '📦';
}

// Get status badge HTML
function getStatusBadge(status) {
    const badges = {
        completed: '<span class="status-badge completed">COMPLETED</span>',
        'in-development': '<span class="status-badge in-progress">IN PROGRESS</span>',
        opensource: '<span class="status-badge opensource">OPEN SOURCE</span>'
    };
    return badges[status] || '';
}

// Get project price display
function getProjectPrice(project) {
    if (project.price === 0) {
        return '<span class="price-free">FREE</span>';
    } else if (typeof project.price === 'string') {
        return `<span class="price-custom">${project.price}</span>`;
    } else if (project.discount > 0) {
        const discountedPrice = project.price * (1 - project.discount / 100);
        return `
            <span class="discount-badge">-${project.discount}%</span>
            <span class="price-original">$${project.price}</span>
            <span class="price-current">$${discountedPrice.toFixed(0)}</span>
        `;
    } else {
        return `<span class="price-current">$${project.price}</span>`;
    }
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '✨';
    }
    
    return stars;
}

// Initialize project filtering
function initProjectFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active state
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            if (category === 'all') {
                renderProjects(projectsData);
            } else {
                const filtered = projectsData.filter(p => p.category === category);
                renderProjects(filtered);
            }
        });
    });
}

// Initialize project search
function initProjectSearch() {
    const searchInput = document.querySelector('.project-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filtered = projectsData.filter(project => {
            return project.title.toLowerCase().includes(query) ||
                   project.description.toLowerCase().includes(query) ||
                   project.tags.some(tag => tag.toLowerCase().includes(query));
        });
        renderProjects(filtered);
    });
}

// Initialize project sorting
function initProjectSort() {
    const sortSelect = document.querySelector('.project-sort');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        let sorted = [...projectsData];
        
        switch(sortBy) {
            case 'newest':
                sorted.sort((a, b) => b.year - a.year);
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'price-low':
                sorted.sort((a, b) => {
                    const priceA = typeof a.price === 'number' ? a.price : Infinity;
                    const priceB = typeof b.price === 'number' ? b.price : Infinity;
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                sorted.sort((a, b) => {
                    const priceA = typeof a.price === 'number' ? a.price : -Infinity;
                    const priceB = typeof b.price === 'number' ? b.price : -Infinity;
                    return priceB - priceA;
                });
                break;
            default:
                sorted = projectsData;
        }
        
        renderProjects(sorted);
    });
}

// Initialize project modal
function initProjectModal() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-quick-view') || 
            e.target.classList.contains('btn-view-project')) {
            e.preventDefault();
            const projectId = parseInt(e.target.dataset.projectId);
            const project = projectsData.find(p => p.id === projectId);
            if (project) {
                showProjectModal(project);
            }
        }
    });
}

// Show project modal
function showProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close">×</button>
            <div class="modal-header">
                <h2>${project.title}</h2>
                <p class="modal-client">${project.client} • ${project.year}</p>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <div class="project-placeholder-large">
                        ${getProjectIcon(project.category)}
                    </div>
                </div>
                <div class="modal-info">
                    <h3>Project Overview</h3>
                    <p>${project.description}</p>
                    <h3>Technologies Used</h3>
                    <div class="modal-tags">
                        ${project.tags.map(tag => `<span class="tech-tag-large">${tag}</span>`).join('')}
                    </div>
                    <h3>Project Details</h3>
                    <ul class="project-details">
                        <li>Status: ${project.status}</li>
                        <li>Rating: ${project.rating} ⭐ (${project.reviews} reviews)</li>
                        <li>Category: ${project.category}</li>
                    </ul>
                    <div class="modal-actions">
                        <button class="btn-primary">View Live Demo</button>
                        <button class="btn-secondary">View on GitHub</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal entrance
    setTimeout(() => {
        modal.classList.add('modal-show');
    }, 10);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('modal-show');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.modal-backdrop').addEventListener('click', () => {
        modal.classList.remove('modal-show');
        setTimeout(() => modal.remove(), 300);
    });
}

// Export for use in other files
window.projectsManager = {
    projectsData,
    renderProjects,
    showProjectModal
};