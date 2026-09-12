/* Renders the engineering-evidence band on the Projects page from
   content/software.json: live demos, published packages, and the
   engineering practices grid. Follows the same fetch-and-inject pattern as
   the other loaders in this directory. */

function renderSoftwareTags(tags) {
    if (!Array.isArray(tags) || tags.length === 0) return '';
    const chips = tags.map(tag => `<span class="software-tag">${tag}</span>`).join('');
    return `<div class="software-tags">${chips}</div>`;
}

function renderDemos(demos, container) {
    if (!container || !Array.isArray(demos)) return;

    const grid = document.createElement('div');
    grid.classList.add('demo-grid');

    demos.forEach(demo => {
        const card = document.createElement('article');
        card.classList.add('demo-card');
        card.innerHTML =
            `<img class="demo-card-image" src="../${demo.image}" alt="${demo.title} demo" />
             <div class="demo-card-body">
                 <h3>${demo.title}</h3>
                 <div class="demo-card-subtitle">${demo.subtitle}</div>
                 <p>${demo.content}</p>
                 ${renderSoftwareTags(demo.tags)}
                 <a class="button primary" href="${demo.url}" target="_blank" rel="noopener">
                     ${demo.cta || 'Try it live'}
                 </a>
             </div>`;
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

function renderPackages(packages, container) {
    if (!container || !Array.isArray(packages)) return;

    const grid = document.createElement('div');
    grid.classList.add('package-grid');

    packages.filter(pkg => pkg.status !== 'earlier').forEach(pkg => {
        const links = Object.entries(pkg.links || {})
            .map(([label, url]) =>
                `<a href="${url}" target="_blank" rel="noopener">${label}</a>`)
            .join('');

        const card = document.createElement('article');
        card.classList.add('package-card');
        const coverage = pkg.coverage
            ? `<span class="package-coverage">${pkg.coverage}% coverage</span>`
            : '';

        card.innerHTML =
            `<div class="package-head">
                 <span class="package-name">${pkg.name}</span>
                 <span class="package-version">v${pkg.version}</span>
                 ${coverage}
             </div>
             <p>${pkg.content}</p>
             <code class="package-install">${pkg.install}</code>
             <div class="package-links">${links}</div>`;
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

/* Early Access packages are still published, but a 0.1.0 should not carry the
   same visual weight as a maintained 3.0.0 - so they get a compact list. */
function renderEarlierPackages(packages, container) {
    if (!container || !Array.isArray(packages)) return;

    const earlier = packages.filter(pkg => pkg.status === 'earlier');
    if (earlier.length === 0) return;

    const list = document.createElement('ul');
    list.classList.add('package-list');

    earlier.forEach(pkg => {
        const links = Object.entries(pkg.links || {})
            .map(([label, url]) =>
                `<a href="${url}" target="_blank" rel="noopener">${label}</a>`)
            .join('');

        const item = document.createElement('li');
        item.innerHTML =
            `<span class="package-name">${pkg.name}</span>
             <span class="package-version">v${pkg.version}</span>
             <span class="package-desc">${pkg.content}</span>
             <span class="package-links">${links}</span>`;
        list.appendChild(item);
    });

    container.appendChild(list);
}

function renderPractices(practices, container) {
    if (!container || !Array.isArray(practices)) return;

    const grid = document.createElement('div');
    grid.classList.add('practice-grid');

    practices.forEach(practice => {
        const points = practice.points
            .map(point => `<li>${point}</li>`)
            .join('');

        const card = document.createElement('article');
        card.classList.add('practice-card');
        card.innerHTML =
            `<h3><i class="fa-solid ${practice.icon}"></i>${practice.title}</h3>
             <ul>${points}</ul>`;
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

fetch('../content/software.json')
    .then(response => response.json())
    .then(data => {
        renderDemos(data.demos_hosted, document.getElementById('demo-container-hosted'));
        renderDemos(data.demos_showcase, document.getElementById('demo-container-showcase'));
        renderPackages(data.packages, document.getElementById('package-container'));
        renderEarlierPackages(data.packages, document.getElementById('earlier-container'));
        renderPractices(data.practices, document.getElementById('practice-container'));
    })
    .catch(error => {
        console.error('Software loader error:', error);
        const containers = [
            'demo-container-hosted',
            'demo-container-showcase',
            'package-container',
            'earlier-container',
            'practice-container'
        ];
        containers.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '<p class="error">Failed to load software data.</p>';
        });
    });
