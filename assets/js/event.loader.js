fetch('content/events.json')
    .then(response => response.json())
    .then(data => {
        const eventContainer = document.getElementById('event-container');
        data.forEach((item, index) => {
            const eventBox = document.createElement('article');
            eventBox.classList.add('event-box');

            eventBox.innerHTML =
                `<img src="${item.image}" alt="${item.alt}">
                 <h3>${item.title}</h3>
                 <h4>${item.date}</h4>
                 ${item.content.split('\n').map(sentence => `<p>${sentence}</p>`).join('')}`;

            eventContainer.appendChild(eventBox);
        });
    })
    .catch(error => console.error('Error:', error));