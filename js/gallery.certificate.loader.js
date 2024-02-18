const certificatesFilePath = '../content/certificates.json';
let allTags = [];
let activeTags = [];

function collectTags() {
    fetch(certificatesFilePath)
        .then(response => response.json())
        .then(metadataData => {
            const dataArray = Array.isArray(metadataData) ? metadataData : [metadataData];
            const tagsArray = dataArray.flatMap(item => item.tags);
            allTags = [...new Set([...allTags, ...tagsArray])];
            const urlSearchParams = new URLSearchParams(window.location.search);
            activeTags = urlSearchParams.getAll('tag');

            populateTagContainer();
        })
        .catch(error => {
            console.error('Error collecting tags:', error);
        });
}

function populateTagContainer() {
    const tagInfoContainer = document.getElementById('tag-info-container');

    allTags.forEach(tag => {
        const tagElement = document.createElement('li');
        tagElement.textContent = tag;
        tagElement.classList.add('gallery_tag');
        tagElement.addEventListener('click', () => filterByTag(tag));
        tagInfoContainer.appendChild(tagElement);

        if (activeTags.includes(tag)) {
            tagElement.classList.add('active');
        }
    });
}

function filterByTag(tag) {
    if (activeTags.includes(tag)) {
        activeTags = activeTags.filter(activeTag => activeTag !== tag);
    } else {
        activeTags.push(tag);
    }
    updateTagContainer();
    updateUrlParameters();
    repopulateGallery();
}

function updateTagContainer() {
    const tagContainer = document.querySelectorAll('.gallery_tag');
    tagContainer.forEach(tagElement => {
        const tag = tagElement.textContent;
        if (activeTags.includes(tag)) {
            tagElement.classList.add('active');
        } else {
            tagElement.classList.remove('active');
        }
    });
}

function updateUrlParameters() {
    const urlSearchParams = new URLSearchParams();
    activeTags.forEach(tag => urlSearchParams.append('tag', tag));
    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
}

function repopulateGallery() {
    fetch(certificatesFilePath)
        .then(response => response.json())
        .then(metadata => {
            if (!activeTags.length) {
                populateGallery(metadata);
            } else {
                const filteredImages = metadata.filter(image => activeTags.some(tag => image.tags.includes(tag)));
                populateGallery(filteredImages);
            }
        })
        .catch(error => {
            console.error('Error fetching metadata JSON:', error);
        });
}

function populateGallery(images) {
    console.log(images);
  
    const galleryBox = document.getElementById('cert-container');
    galleryBox.innerHTML = '';
  
    images.forEach(image => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-12 col-sm-6 col-md-3 mb-4 cert-box';
  
      const imgElement = document.createElement('img');
      imgElement.className = 'img-fluid';
      imgElement.src = '../' + image.thumbnail;
      imgElement.src_original = '../' + image.src;
      imgElement.alt = image.caption;
      imgElement.title = image.caption;
      imgElement.loading = 'lazy';
  
      colDiv.appendChild(imgElement);
      galleryBox.appendChild(colDiv);
    });
  }

document.addEventListener('DOMContentLoaded', () => {
    collectTags();
    repopulateGallery();

    window.addEventListener('popstate', () => {
        collectTags();
        repopulateGallery();
    });
});