document.addEventListener('DOMContentLoaded', function () {
    const tagsContainer = document.getElementById('blog-post-container');
    const filterRow = document.getElementById('filter-row');

    function updateFilterRow(activeFilter) {
        filterRow.innerHTML = '';

        const filteredText = document.createElement('p');
        filteredText.innerHTML = activeFilter === 'all'
            ? 'All posts are visible.'
            : `Posts filtered by tag: ${activeFilter}. Click here to <span class="remove-filter">[remove the filter].</span>`;
        filterRow.appendChild(filteredText);

        if (activeFilter !== 'all') {
            const removeFilterLink = filterRow.querySelector('.remove-filter');
            removeFilterLink.addEventListener('click', function () {
                const posts = document.querySelectorAll('.blog-post');
                posts.forEach(post => {
                    post.classList.remove('filter-transition-out', 'filter-transition-in');
                    post.classList.add('filter-transition-out');
                });
            
                setTimeout(() => {
                    updateFilterRow('all');
            
                    posts.forEach(post => {
                        post.classList.remove('filter-transition-out');
                        post.classList.add('filter-transition-in');
                        post.style.display = 'block';
                    });
                }, 500);
            });
            
        }
    }

    tagsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('tag')) {
            const filter = event.target.dataset.filter;
            const posts = document.querySelectorAll('.blog-post');

            posts.forEach(post => {
                post.classList.remove('filter-transition-out', 'filter-transition-in');
                post.classList.add('filter-transition-out');
            });

            setTimeout(() => {
                posts.forEach(post => {
                    const postTags = post.getAttribute('data-tags');
                    const isFiltered = postTags.includes(filter) || filter === 'all';
                    post.style.display = isFiltered ? 'block' : 'none';
                    post.classList.remove('filter-transition-out');
                    post.classList.add('filter-transition-in');
                });
            }, 500);

            updateFilterRow(filter);
        }
    });

    updateFilterRow('all');
});
