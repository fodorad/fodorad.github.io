document.addEventListener('DOMContentLoaded', function () {
    fetch('../content/publications.json')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('publications-tbody');

            data.forEach(entry => {
                const row = document.createElement('tr');

                const yearCell = document.createElement('td');
                yearCell.style.verticalAlign = 'middle';
                yearCell.textContent = entry['year'];
                row.appendChild(yearCell);

                const detailsCell = document.createElement('td');
                detailsCell.style.verticalAlign = 'middle';
                detailsCell.innerHTML = entry['authors']
                    .replace(/Fodor/gi, '<span style="font-weight: bold;">Fodor</span>')
                    .replace(/Adam/gi, '<span style="font-weight: bold;">Adam</span>')
                    .replace(/Ádám/g, '<span style="font-weight: bold;">Ádám</span>') +
                    ';</br>' +
                    entry['title'] +
                    ',</br>' +
                    entry['details'];
                row.appendChild(detailsCell);

                const linkCell = document.createElement('td');

                if (entry['link']) {
                    const pdfLink = document.createElement('a');
                    pdfLink.href = '../' + entry['link'].pdf;
                    pdfLink.textContent = 'PDF';
                    pdfLink.setAttribute('target', '_blank');
                    linkCell.appendChild(pdfLink);

                    if (entry['link'].webpage) {
                        const webpageLink = document.createElement('a');
                        webpageLink.href = entry['link'].webpage;
                        webpageLink.textContent = 'Webpage';
                        webpageLink.setAttribute('target', '_blank');
                        linkCell.appendChild(document.createTextNode(', '));
                        linkCell.appendChild(webpageLink);
                    }

                    if (entry['link'].project) {
                        const projectLink = document.createElement('a');
                        projectLink.href = entry['link'].project;
                        projectLink.textContent = 'Project';
                        projectLink.setAttribute('target', '_blank');
                        linkCell.appendChild(document.createTextNode(', '));
                        linkCell.appendChild(projectLink);
                    }
                }

                row.appendChild(linkCell);
                tbody.appendChild(row);
            });
        })
    .catch(error => console.error('Error fetching data:', error));
});
