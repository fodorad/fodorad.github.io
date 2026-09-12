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


fetch('../content/projects.json')
    .then(response => response.json())
    .then(data => {
        const projectContainer = document.getElementById('project-container')
        if (!projectContainer) return;
        let currentContainer = null;
        let currentTheme = null;
        const numbers = [1, 2, 3, 4, 5, 6];

        /* Grouped by research theme rather than year: with one to three
           projects per year, year headers made a steady output look sparse. */
        data.forEach((item, index) => {

            if (item.theme !== currentTheme) {
                const themeSection = document.createElement('div');
                themeSection.classList.add('cyear')
                themeSection.innerHTML = `<h2 class="fyear">${item.theme}</h2>`;

                const contentContainer = document.createElement('section');
                contentContainer.classList.add('tiles')

                projectContainer.appendChild(themeSection);
                projectContainer.appendChild(contentContainer)

                currentContainer = contentContainer
                currentTheme = item.theme;
            }

            const projectBox = document.createElement('article');
            projectBox.classList.add(`style${getCyclicNumber(numbers, index)}`);
            projectBox.innerHTML =
                `<span class="tile-image">
                     <img src="../${item.image}" alt="${item.title}" />
                 </span>
                 <a href="${item.page}">
                     <h2>${item.title}</h2>
                     <div class="content">
                         <p>${item.content}</p>
                         ${renderProjectTags(item.tags)}
                         <div class="project-year">${item.year}</div>
                     </div>
                 </a>
                `;
            currentContainer.appendChild(projectBox);
        });
    })
    .catch(error => {
        console.error('Project loader error:', error);
        projectContainer.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
    });