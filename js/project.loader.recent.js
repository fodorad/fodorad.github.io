function getCyclicNumber(list, index) {
    const wrappedIndex = (index % list.length + list.length) % list.length;
    return list[wrappedIndex];
}

/* Render a project's tech/topic tags as a chip row, so the stack a project
   uses is readable straight from the card without opening it. */
function renderProjectTags(tags) {
    if (!Array.isArray(tags) || tags.length === 0) return '';
    const chips = tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
    return `<div class="project-tags">${chips}</div>`;
}

/* Renders a set of project tiles into a container, shared by the featured
   band and the recent strip. */
function renderTiles(items, container, styles) {
    if (!container) return;

    const contentContainer = document.createElement('section');
    contentContainer.classList.add('tiles');
    const numbers = styles || [1, 2, 3, 4, 5, 6];

    items.forEach((item, index) => {
        const projectBox = document.createElement('article');
        projectBox.classList.add(`style${getCyclicNumber(numbers, index)}`);
        projectBox.innerHTML =
            `<span class="tile-image">
                 <img src="${item.image}" alt="" />
             </span>
             <a href="html/${item.page}">
                 <h2>${item.title}</h2>
                 <div class="content">
                     <p>${item.content}</p>
                     ${renderProjectTags(item.tags)}
                 </div>
             </a>`;
        contentContainer.appendChild(projectBox);
    });

    container.appendChild(contentContainer);
}

fetch('content/projects.json')
    .then(response => response.json())
    .then(data => {
        /* "Recent" is chronological, which is not the same as "best", so the
           featured band carries the flagship work regardless of its date. */
        /* Featured uses its own warm ramp (styleF1-F3) so the two strips are
           immediately distinguishable from one another. */
        renderTiles(
            data.filter(item => item.featured),
            document.getElementById('project-container-featured'),
            ['F1', 'F2', 'F3']
        );

        const newestFirst = [...data].sort((a, b) => b.year - a.year);
        renderTiles(
            newestFirst.slice(0, 3),
            document.getElementById('project-container-recent')
        );
    })
    .catch(error => {
        console.error('Recent projects loader error:', error);
        const featuredContainer = document.getElementById('project-container-featured');
        const recentContainer = document.getElementById('project-container-recent');
        if (featuredContainer) featuredContainer.innerHTML = '<p class="error">Failed to load featured projects.</p>';
        if (recentContainer) recentContainer.innerHTML = '<p class="error">Failed to load recent projects.</p>';
    });
