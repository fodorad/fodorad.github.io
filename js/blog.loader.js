fetch('../content/blog_posts.json')
    .then(response => response.json())
    .then(data => {
        const blogContainer = document.getElementById('blog-post-container');
        data.forEach((item, index) => {
            if (!item.date) {
                return;
            }

            const originalDate = new Date(item.date);
            const formattedDate = `${originalDate.getUTCFullYear()}.${(originalDate.getUTCMonth() + 1).toString().padStart(2, '0')}.${originalDate.getUTCDate().toString().padStart(2, '0')}`;

            const blogPost = document.createElement('article');
            blogPost.classList.add('blog-post');
            blogPost.setAttribute('data-tags', item['data-tags']);
            blogPost.innerHTML =
                `<a href="${item.page}">
                    <img src="../${item.image}" alt="${item.alt}">
                </a>
                <ul>
                    ${item['data-tags'].split(' ').map(tag => `<li class="tag" data-filter="${tag}">${tag}</li>`).join('')}
                </ul>
                <h2>${item.title}</h2>
                <h3>${formattedDate}</h3>
                ${item.content.split('\n').map(sentence => `<p>${sentence}</p>`).join('')}`;

            blogContainer.appendChild(blogPost);
        });
    })
    .catch(error => console.error('Error:', error));