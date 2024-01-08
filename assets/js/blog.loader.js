fetch('content/blog_posts.json')
    .then(response => response.json())
    .then(data => {
        const blogContainer = document.getElementById('blog-post-container');
        data.forEach((item, index) => {
            const blogPost = document.createElement('article');
            blogPost.classList.add('blog-post');
            blogPost.setAttribute('data-tags', item['data-tags']);

            blogPost.innerHTML =
                `<img src="${item.image}" alt="${item.alt}">
                 <ul>
                     ${item['data-tags'].split(' ').map(tag => `<li class="tag" data-filter="${tag}">${tag}</li>`).join('')}
                 </ul>
                 <h3>${item.title}</h3>
                 ${item.content.split('\n').map(sentence => `<p>${sentence}</p>`).join('')}`;

            blogContainer.appendChild(blogPost);
        });
    })
    .catch(error => console.error('Error:', error));