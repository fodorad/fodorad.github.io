document.addEventListener('DOMContentLoaded', function () {
    fetch('../content/publications.json')
      .then(response => response.json())
      .then(data => {
        const tbody = document.getElementById('publications-tbody');
  
        data.forEach(entry => {
          const row = document.createElement('tr');
  
          Object.keys(entry).forEach(key => {
            const cell = document.createElement('td');
  
            if (key === 'link') {
              const pdfLink = document.createElement('a');
              pdfLink.href = entry[key].pdf;
              pdfLink.textContent = 'PDF';
              pdfLink.setAttribute('target', '_blank');
  
              const webpageLink = document.createElement('a');
              webpageLink.href = entry[key].webpage;
              webpageLink.textContent = 'Webpage';
              webpageLink.setAttribute('target', '_blank');
  
              cell.appendChild(pdfLink);
              cell.appendChild(document.createTextNode(', '));
              cell.appendChild(webpageLink);
            } else {
              cell.textContent = entry[key];
            }
  
            row.appendChild(cell);
          });
  
          tbody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  