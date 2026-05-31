fetch('../content/events.json')
    .then(response => response.json())
    .then(data => {
        const parentContainer = document.getElementById('events-container')
        const eventContainer = document.createElement('section');
        eventContainer.classList.add('tiles')

        data.forEach((item, index) => {

            const eventBox = document.createElement('article');
            eventBox.classList.add('event-box');

            const pdfLink = item.pdf
                ? `<a href="${item.pdf}" class="event-pdf-link" target="_blank" rel="noopener">
                    <i class="fa-solid fa-file-pdf"></i>
                    <i class="fa-solid fa-arrow-up-right-from-square newtab-icon"></i>
                  </a>`
                : '';

            const galleryTagsLink = item.gallery_tags
                ? `gallery.html?${item.gallery_tags.map(tag => `tag=${tag}`).join('&')}`
                : '';

            const siteLink = item.links
                ? `${item.links.map(link => `<a href="${link}" target="_blank">[Link]</a>`).join(' ')}`
                : '';
            
            const originalDate = new Date(item.date);
            const formattedDate = `${originalDate.getUTCFullYear()}.${(originalDate.getUTCMonth() + 1).toString().padStart(2, '0')}.${originalDate.getUTCDate().toString().padStart(2, '0')}`;

            eventBox.innerHTML =
                `<img src="../${item.image}" alt="${item.alt}">
                 <h2>${item.title}</h2>
                 <h3>${formattedDate}</h3>
                 ${item.content.split('\n').map(sentence => `<p>${sentence}</p>`).join('')}
                 <p>
                 ${pdfLink? `${pdfLink}`: ''}
                 ${galleryTagsLink ? `<a href="${galleryTagsLink}">[Gallery]</a>` : ''}
                 ${siteLink? `${siteLink}`: ''}
                 </p>`;
 
            eventContainer.appendChild(eventBox);
        });

        parentContainer.appendChild(eventContainer)
    })
    .catch(error => console.error('Error:', error));