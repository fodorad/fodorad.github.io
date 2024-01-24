document.addEventListener('DOMContentLoaded', function () {
  fetch('../content/publications.json')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('publications-tbody');

      data.forEach(entry => {
        const row = document.createElement('tr');

        // Create a cell for the year
        const yearCell = document.createElement('td');
        yearCell.style.verticalAlign = 'middle';
        yearCell.textContent = entry['year'];

        // Append the year cell to the row
        row.appendChild(yearCell);

        // Create a cell for authors, title, and details
        const detailsCell = document.createElement('td');
        detailsCell.style.verticalAlign = 'middle';

        // Concatenate authors, title, and details with separators
        detailsCell.innerHTML = entry['authors']
          .replace(/Fodor/gi, '<span style="font-weight: bold;">Fodor</span>')
          .replace(/Adam/gi, '<span style="font-weight: bold;">Adam</span>')
          .replace(/Ádám/g, '<span style="font-weight: bold;">Ádám</span>') +
          ';</br>' +
          entry['title'] +
          ',</br>' +
          entry['details'];

        // Append the details cell to the row
        row.appendChild(detailsCell);

        // Create a cell for links
        const linkCell = document.createElement('td');

        // If links exist, create and append them
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
        }

        // Append the link cell to the row
        row.appendChild(linkCell);

        // Append the row to the tbody
        tbody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
