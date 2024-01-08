fetch('content/events.json')
    .then(response => response.json())
    .then(data => {
        const parentContainer = document.getElementById('events-container-recent')
        // create project box container
        const eventContainer = document.createElement('section');
        eventContainer.classList.add('tiles')
        const breakAfterIndex = 3;

        data.forEach((item, index) => {

            // show recent elements only
            if (index >= breakAfterIndex) {
                return;
            }

            // creates a project box
            const eventBox = document.createElement('article');
            eventBox.classList.add('event-box');

            eventBox.innerHTML =
                `<img src="${item.image}" alt="${item.alt}">
                 <h3>${item.title}</h3>
                 <h4>${item.date}</h4>
                 ${item.content.split('\n').map(sentence => `<p>${sentence}</p>`).join('')}`;

            eventContainer.appendChild(eventBox);
        });

        parentContainer.appendChild(eventContainer)
    })
    .catch(error => console.error('Error:', error));