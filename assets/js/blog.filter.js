document.addEventListener('DOMContentLoaded', function () {
    const tagsContainer = document.getElementById('blog-post-container');
    const filterRow = document.getElementById('filter-row');

    // Function to update the filter row
    function updateFilterRow(activeFilter) {
        filterRow.innerHTML = ''; // Clear existing content

        // Add filtered text or "Remove Filter" link
        const filteredText = document.createElement('p');
        filteredText.innerHTML = activeFilter === 'all'
            ? 'All posts are visible.'
            : `Posts filtered by tag: ${activeFilter}. Click here to <span class="remove-filter">[remove the filter].</span>`;
        filterRow.appendChild(filteredText);

        if (activeFilter !== 'all') {
            const removeFilterLink = filterRow.querySelector('.remove-filter');
            removeFilterLink.addEventListener('click', function () {
                // Apply transition-out class to all posts simultaneously
                const posts = document.querySelectorAll('.blog-post');
                posts.forEach(post => {
                    post.classList.remove('filter-transition-out', 'filter-transition-in');
                    post.classList.add('filter-transition-out');
                });
            
                // Set a timeout to hide posts after transition out
                setTimeout(() => {
                    // Reset the active filter to 'all'
                    updateFilterRow('all');
            
                    // Apply transition-in class to all posts
                    posts.forEach(post => {
                        post.classList.remove('filter-transition-out');
                        post.classList.add('filter-transition-in');
                        post.style.display = 'block';
                    });
                }, 500); // Adjust the delay as needed
            });
            
        }
    }

    tagsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('tag')) {
            const filter = event.target.dataset.filter;
            const posts = document.querySelectorAll('.blog-post');

            // Apply transition-out class to all posts simultaneously
            posts.forEach(post => {
                post.classList.remove('filter-transition-out', 'filter-transition-in');
                post.classList.add('filter-transition-out');
            });

            // Set a timeout to hide posts after transition out
            setTimeout(() => {
                posts.forEach(post => {
                    const postTags = post.getAttribute('data-tags');
                    const isFiltered = postTags.includes(filter) || filter === 'all';
                    post.style.display = isFiltered ? 'block' : 'none';

                    // Apply the filter-transition-in class after the display is set
                    post.classList.remove('filter-transition-out');
                    post.classList.add('filter-transition-in');
                });
            }, 500); // Adjust the delay as needed

            // Update the filter row
            updateFilterRow(filter);
        }
    });

    // Initialize filter row with 'all' to show all posts
    updateFilterRow('all');
});
