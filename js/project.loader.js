function getCyclicNumber(list, index) {
    const wrappedIndex = (index % list.length + list.length) % list.length;
    return list[wrappedIndex];
}


fetch('../content/projects.json')
    .then(response => response.json())
    .then(data => {
        const projectContainer = document.getElementById('project-container')
        let currentContainer = null;
        let currentYear = null;
        const numbers = [1, 2, 3, 4, 5, 6];

        data.forEach((item, index) => {

            if (item.year !== currentYear) {
                const yearSection = document.createElement('div');
                yearSection.classList.add('cyear')
                yearSection.innerHTML = `<h2 class="fyear">${item.year}</h2>`;
    
                const contentContainer = document.createElement('section');
                contentContainer.classList.add('tiles')

                projectContainer.appendChild(yearSection);
                projectContainer.appendChild(contentContainer)
                
                currentContainer = contentContainer
                currentYear = item.year;
            }

            const projectBox = document.createElement('article');
            projectBox.classList.add(`style${getCyclicNumber(numbers, index)}`);
            projectBox.innerHTML =
                `<span class="image">
                     <img src="../${item.image}" alt="" />
                 </span>
                 <a href="generic.html">
                     <h2>${item.title}</h2>
                     <div class="content">
                         <p>${item.content}</p>
                     </div>
                 </a>
                `;
            currentContainer.appendChild(projectBox);
        });
    })
    .catch(error => console.error('Error:', error));