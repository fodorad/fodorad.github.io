fetch('../content/blog_posts.json')
    .then(response => response.json())
    .then(data => {
        const blogContainer = document.getElementById('blog-post-container');
        data.forEach((item, index) => {
            const blogPost = document.createElement('article');
            blogPost.classList.add('blog-post');
            blogPost.setAttribute('data-tags', item['data-tags']);

            blogPost.innerHTML =
                `<a href="html/generic.html">
                    <img src="../${item.image}" alt="${item.alt}">
                 </a>
                 <ul>
                     ${item['data-tags'].split(' ').map(tag => `<li class="tag" data-filter="${tag}">${tag}</li>`).join('')}
                 </ul>
                 <h2>${item.title}</h2>
                 ${item.content.split('\n').map(sentence => `<p>${sentence}</p>`).join('')}`;

            blogContainer.appendChild(blogPost);
        });
    })
    .catch(error => console.error('Error:', error));