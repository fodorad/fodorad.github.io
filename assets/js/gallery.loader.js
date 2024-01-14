const metadataFilePath = 'content/image_metadata.json';
let allTags = [];
let activeTags = [];

function collectTags() {
    fetch(metadataFilePath)
        .then(response => response.json())
        .then(metadataData => {
            const dataArray = Array.isArray(metadataData) ? metadataData : [metadataData];
            const tagsArray = dataArray.flatMap(item => item.tags);
            allTags = [...new Set([...allTags, ...tagsArray])];

            // Check for active tags in URL parameters
            const urlSearchParams = new URLSearchParams(window.location.search);
            activeTags = urlSearchParams.getAll('tag');

            populateTagContainer();
        })
        .catch(error => {
            console.error('Error collecting tags:', error);
        });
}

function populateTagContainer() {
    const tagYearContainer = document.getElementById('tag-year-container');
    const tagInfoContainer = document.getElementById('tag-info-container');

    allTags.forEach(tag => {
        const tagElement = document.createElement('li');
        tagElement.textContent = tag;
        tagElement.classList.add('gallery_tag');
        tagElement.addEventListener('click', () => filterByTag(tag));
        if (/^\d{4}$/.test(tag)) {
            tagYearContainer.appendChild(tagElement);
        } else {
            tagInfoContainer.appendChild(tagElement);
        }

        // Highlight active tags in the container
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
    // Fetch metadata.json content only once on page load
    fetch(metadataFilePath)
        .then(response => response.json())
        .then(metadata => {
            if (!activeTags.length) {
                // No active tags, display all images
                populateGallery(metadata);
            } else {
                // Active tags present, filter images based on active tags
                const filteredImages = metadata.filter(image => activeTags.some(tag => image.tags.includes(tag)));
                populateGallery(filteredImages);
            }
        })
        .catch(error => {
            console.error('Error fetching metadata JSON:', error);
        });
}


function populateGallery(images) {
    console.log("called.")
    const galleryBox = document.getElementById('gallery-box');
    galleryBox.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.title;
        imgElement.title = image.caption;
        galleryBox.appendChild(imgElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    collectTags();
    repopulateGallery(); // Call repopulateGallery on page load to handle initial tags

    // Add event listener to handle changes in URL parameters
    window.addEventListener('popstate', () => {
        collectTags();
        repopulateGallery();
    });
});