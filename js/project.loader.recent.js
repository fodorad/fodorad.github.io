function getCyclicNumber(list, index) {
    const wrappedIndex = (index % list.length + list.length) % list.length;
    return list[wrappedIndex];
}


fetch('content/projects.json')
    .then(response => response.json())
    .then(data => {
        const projectContainer = document.getElementById('project-container-recent')
        const contentContainer = document.createElement('section');
        contentContainer.classList.add('tiles')
        const numbers = [1, 2, 3, 4, 5, 6];
        const breakAfterIndex = 3;

        data.forEach((item, index) => {

            if (index >= breakAfterIndex) {
                return;
            }

            const projectBox = document.createElement('article');
            projectBox.classList.add(`style${getCyclicNumber(numbers, index)}`);
            projectBox.innerHTML =
                `<span class="tile-image">
                     <img src="${item.image}" alt="" />
                 </span>
                 <a href="html/generic.html">
                     <h2>${item.title}</h2>
                     <div class="content">
                         <p>${item.content}</p>
                     </div>
                 </a>`;
            contentContainer.appendChild(projectBox);
        });

        projectContainer.appendChild(contentContainer)
    })
    .catch(error => console.error('Error:', error));