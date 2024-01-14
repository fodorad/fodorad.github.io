fetch('content/events.json')
    .then(response => response.json())
    .then(data => {
        const eventContainer = document.getElementById('event-container');
        data.forEach((item, index) => {
            const eventBox = document.createElement('article');
            eventBox.classList.add('event-box');

            const galleryTagsLink = item.gallery_tags
                ? `gallery.html?${item.gallery_tags.map(tag => `tag=${tag}`).join('&')}`
                : '';

            eventBox.innerHTML =
                `<img src="${item.image}" alt="${item.alt}">
                 <h3>${item.title}</h3>
                 <h4>${item.date}</h4>
                 ${item.content.split('\n').map(sentence => `<p>${sentence}</p>`).join('')}
                 ${galleryTagsLink ? `<p><a href="${galleryTagsLink}">[gallery]</a></p>` : ''}`;

            eventContainer.appendChild(eventBox);
        });
    })
    .catch(error => console.error('Error:', error));
