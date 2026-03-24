// Project data
let projects = [
    {
        name: 'Prism AI Reviewer',
        language: 'JavaScript',
        description: 'A GitHub webhook-based application that uses AI to automatically review pull requests. Integrates with GitHub webhooks and OpenAI API for AI-powered code reviews.',
        url: 'https://github.com/Arochio/prism-ai-reviewer'
    },
    {
        name: 'TFT Tracker',
        language: 'PHP',
        description: 'A comprehensive TFT (Teamfight Tactics) tracker application created to learn API usage and deepen knowledge in PHP development. Monitor statistics and gameplay improvements.',
        url: 'https://github.com/Arochio/TFT-Tracker'
    },
    {
        name: 'Associate Capstone',
        language: 'PHP',
        description: 'Capstone project showcasing web development skills with PHP. A full-featured application demonstrating best practices in backend development.',
        url: 'https://github.com/Arochio/ASCapstone'
    },
    {
        name: 'SE407',
        language: 'C#',
        description: 'C# project exploring object-oriented programming principles and software architecture. Part of coursework in advanced software engineering.',
        url: 'https://github.com/Arochio/SE407'
    },
    {
        name: 'SE256',
        language: 'JavaScript',
        description: 'Advanced JavaScript project with substantial codebase (215MB). Demonstrates complex frontend development techniques and interactive applications.',
        url: 'https://github.com/Arochio/SE256'
    },
    {
        name: 'SE251',
        language: 'JavaScript',
        description: 'JavaScript coursework project focusing on DOM manipulation, event handling, and modern JavaScript practices.',
        url: 'https://github.com/Arochio/SE251'
    },
    {
        name: 'SE373',
        language: 'JavaScript',
        description: 'Collection of JavaScript assignments covering various programming concepts and practical applications in web development.',
        url: 'https://github.com/Arochio/SE373-Assignments'
    },
    {
        name: 'SE-135 Final Project',
        language: 'Python',
        description: 'Final project for SE-135 coursework. Demonstrates Python programming skills and software development methodology.',
        url: 'https://github.com/Arochio/SE-135-Final'
    },
    {
        name: 'SE135 Case Study',
        language: 'Python',
        description: 'In-depth case study project analyzing and implementing solutions to software engineering problems using Python.',
        url: 'https://github.com/Arochio/SE135-Case-Study'
    },
    {
        name: 'SE126',
        language: 'Python',
        description: 'SE126 coursework repository with comprehensive notes and Python projects exploring various programming concepts.',
        url: 'https://github.com/Arochio/SE126'
    },
    {
        name: 'SE111',
        language: 'HTML',
        description: 'Foundation course materials and projects. Covers core web development concepts including HTML, CSS, and basic interactivity.',
        url: 'https://github.com/Arochio/SE111'
    },
    {
        name: 'SE251 Final Project',
        language: 'HTML',
        description: 'Final project for introductory web development course showcasing HTML and responsive design principles.',
        url: 'https://github.com/Arochio/SE251-Final'
    },
    {
        name: 'ATM-9',
        language: 'JavaScript',
        description: 'Fork of ATM-9 circuit tag fix project. Contributing to open source and learning from existing codebases.',
        url: 'https://github.com/Arochio/ATM-9'
    },
    {
        name: 'Portfolio Website',
        language: 'HTML',
        description: 'This portfolio website showcasing all my GitHub projects. Built with vanilla HTML, CSS, and JavaScript.',
        url: 'https://github.com/Arochio/arochio.github.io'
    }
];

// Fetch latest commit date from GitHub
async function getLatestCommitDate(repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/Arochio/${repo}/commits?per_page=1`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        return new Date(data[0].commit.committer.date);
    } catch (error) {
        console.error(`Error fetching ${repo}:`, error);
        return new Date(0); // Return old date if error
    }
}

// Load projects with commit dates and sort by most recent
async function loadProjects() {
    const projectsWithDates = await Promise.all(projects.map(async (project) => {
        const repo = project.url.split('/').pop();
        const lastCommit = await getLatestCommitDate(repo);
        return { ...project, lastCommit };
    }));
    projectsWithDates.sort((a, b) => b.lastCommit - a.lastCommit);
    return projectsWithDates;
}

// Render projects
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? projects : projects.filter(p => p.language === filter);

    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
                    <div class="project-header">
                        <div class="project-name">${project.name}</div>
                        <span class="project-language">${project.language}</span>
                    </div>
                    <div class="project-description">
                        ${project.description}
                    </div>
                    <div class="project-footer">
                        <div class="project-link">
                            <a href="${project.url}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
                        </div>
                    </div>
                `;
        grid.appendChild(card);
    });
}

// Render recent projects
function renderRecentProjects() {
    const grid = document.getElementById('recentGrid');
    grid.innerHTML = '';

    const recent = projects.slice(0, 3);

    recent.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
                    <div class="project-header">
                        <div class="project-name">${project.name}</div>
                        <span class="project-language">${project.language}</span>
                    </div>
                    <div class="project-description">
                        ${project.description}
                    </div>
                    <div class="project-footer">
                        <div class="project-link">
                            <a href="${project.url}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
                        </div>
                    </div>
                `;
        grid.appendChild(card);
    });
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProjects(this.dataset.filter);
    });
});

// Initial render
async function init() {
    projects = await loadProjects();
    renderRecentProjects();
    renderProjects();
}

init();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

