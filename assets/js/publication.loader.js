// tableGenerator.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the JSON file
    fetch('content/publications.json')
      .then(response => response.json())
      .then(data => {
        // Reference to the tbody element
        const tbody = document.getElementById('publications-tbody');
  
        // Iterate over each entry in the JSON
        data.forEach(entry => {
          // Create a new row
          const row = document.createElement('tr');
  
          // Create and append cells for each property
          Object.keys(entry).forEach(key => {
            const cell = document.createElement('td');
  
            // Special handling for the "Link" column
            if (key === 'link') {
              const pdfLink = document.createElement('a');
              pdfLink.href = entry[key].pdf;
              pdfLink.textContent = 'PDF';
              pdfLink.setAttribute('target', '_blank'); // Open link in a new tab
  
              const webpageLink = document.createElement('a');
              webpageLink.href = entry[key].webpage;
              webpageLink.textContent = 'Webpage';
              webpageLink.setAttribute('target', '_blank'); // Open link in a new tab
  
              // Append both links to the cell
              cell.appendChild(pdfLink);
              cell.appendChild(document.createTextNode(', ')); // Separator
              cell.appendChild(webpageLink);
            } else {
              // For other columns, simply set the text content
              cell.textContent = entry[key];
            }
  
            // Append the cell to the row
            row.appendChild(cell);
          });
  
          // Append the row to the tbody
          tbody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  