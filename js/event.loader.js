fetch('../content/events.json')
    .then(response => response.json())
    .then(data => {
        const parentContainer = document.getElementById('events-container')
        const eventContainer = document.createElement('section');
        eventContainer.classList.add('tiles')

        data.forEach((item, index) => {

            const eventBox = document.createElement('article');
            eventBox.classList.add('event-box');

            const galleryTagsLink = item.gallery_tags
                ? `gallery.html?${item.gallery_tags.map(tag => `tag=${tag}`).join('&')}`
                : '';

            const siteLink = item.links
                ? `${item.links.map(link => `<a href="${link}" target="_blank">[Link]</a>`).join(', ')}`
                : '';

            const originalDate = new Date(item.date);
            const formattedDate = `${originalDate.getUTCFullYear()}.${(originalDate.getUTCMonth() + 1).toString().padStart(2, '0')}.${originalDate.getUTCDate().toString().padStart(2, '0')}`;

            eventBox.innerHTML =
                `<img src="../${item.thumbnail_rectangle}" alt="${item.alt}">
                 <h2>${item.title}</h2>
                 <h3>${formattedDate}</h3>
                 ${item.content.split('\n').map(sentence => `<p>${sentence}</p>`).join('')}
                 ${galleryTagsLink ? `<p><a href="${galleryTagsLink}">[Gallery]</a></p>` : ''}
                 ${siteLink? `<p>${siteLink}</p>`: ''}`;
            
            eventContainer.appendChild(eventBox);
        });

        parentContainer.appendChild(eventContainer)
    })
    .catch(error => console.error('Error:', error));