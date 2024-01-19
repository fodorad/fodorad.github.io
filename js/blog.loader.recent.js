fetch('content/blog_posts.json')
    .then(response => response.json())
    .then(data => {
        const projectContainer = document.getElementById('blog-container-recent')
        const blogContainer = document.createElement('section');
        blogContainer.classList.add('tiles')
        const breakAfterIndex = 3;

        data.forEach((item, index) => {

            if (index >= breakAfterIndex) {
                return;
            }

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

        projectContainer.appendChild(blogContainer)
    })
    .catch(error => console.error('Error:', error));