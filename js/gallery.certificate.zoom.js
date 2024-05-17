document.addEventListener('click', function (e) {
    const clickedElement = e.target;

    if (clickedElement.tagName === 'IMG' && clickedElement.id !== 'hero_index_close') {
        const currentImg = clickedElement;
        const container = document.querySelector('#cert-container');
        const images = document.querySelectorAll(".cert-box > img");
        const l = images.length;
        const parentItem = currentImg.parentElement;
        const screenItem = document.createElement('div');
        screenItem.id = "gg-screen";
        container.prepend(screenItem);

        const route = currentImg.src_original;
        document.body.style.overflow = 'hidden';

        screenItem.innerHTML = '<div class="gg-image"></div><div class="gg-close gg-btn">&times;</div><div class="gg-prev gg-btn">&larr;</div><div class="gg-next gg-btn">&rarr;</div>';
        const imgItem = document.querySelector(".gg-image");
        const prevBtn = document.querySelector(".gg-prev");
        const nextBtn = document.querySelector(".gg-next");
        const closeBtn = document.querySelector(".gg-close");

        imgItem.innerHTML = '<img src="' + route + '">';

        let currentIndex = Array.from(images).indexOf(currentImg);

        screenItem.addEventListener("click", function (e) {
            if (e.target == this || e.target == closeBtn) hide();
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
            if (e.key === 'Escape') hide();
        });

        prevBtn.addEventListener("click", prev);
        nextBtn.addEventListener("click", next);

        function prev() {
            currentIndex = (currentIndex - 1 + l) % l;
            const prevImg = images[currentIndex];
            imgItem.innerHTML = '<img src="' + prevImg.src_original + '">';
        }

        function next() {
            currentIndex = (currentIndex + 1) % l;
            const nextImg = images[currentIndex];
            imgItem.innerHTML = '<img src="' + nextImg.src_original + '">';
        }

        function hide() {
            document.body.style.overflow = 'auto';
            screenItem.remove();
        }
    }
});
