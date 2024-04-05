fetch('content/blog_posts.json')
    .then(response => response.json())
    .then(data => {
        const projectContainer = document.getElementById('blog-container-recent');
        const blogContainer = document.createElement('section');
        blogContainer.classList.add('tiles');
        const breakAfterIndex = 3;

        data.forEach((item, index) => {

            if (index >= breakAfterIndex || !item.date) {
                return;
            }

            const blogPost = document.createElement('article');
            blogPost.classList.add('blog-post');
            blogPost.setAttribute('data-tags', item['data-tags']);

            const imageHTML = item.image.endsWith('soon.jpg') 
                ? `<img src="../${item.image}" alt="${item.alt}">`
                : `<a href="html/${item.page}"><img src="../${item.image}" alt="${item.alt}"></a>`;

            blogPost.innerHTML =
                `${imageHTML}
                 <ul>
                     ${item['data-tags'].split(' ').map(tag => `<li class="tag" data-filter="${tag}">${tag}</li>`).join('')}
                 </ul>
                 <h2>${item.title}</h2>
                 ${item.content.split('\n').map(sentence => `<p>${sentence}</p>`).join('')}`;

            blogContainer.appendChild(blogPost);
        });

        projectContainer.appendChild(blogContainer);
    })
    .catch(error => console.error('Error:', error));
