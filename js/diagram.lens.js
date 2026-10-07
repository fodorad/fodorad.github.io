/* Magnifying glass for the pipeline diagrams: while the pointer is over a
   diagram, a round lens follows it and shows that part enlarged, so the small
   labels become readable without leaving the page. Skipped on touch screens,
   where there is no hover; a tap still opens the diagram full size. */
(function () {
    const ZOOM = 2.6;
    const LENS_SIZE = 240;

    if (!window.matchMedia('(hover: hover)').matches) {
        return;
    }

    document.querySelectorAll('.diagram-panel').forEach(panel => {
        const img = panel.querySelector('img');
        const lens = document.createElement('div');
        lens.className = 'diagram-lens';
        lens.setAttribute('aria-hidden', 'true');
        panel.appendChild(lens);

        function move(event) {
            const box = img.getBoundingClientRect();
            const x = event.clientX - box.left;
            const y = event.clientY - box.top;
            const inside = x >= 0 && y >= 0 && x <= box.width && y <= box.height;
            lens.style.display = inside ? 'block' : 'none';
            if (!inside) {
                return;
            }
            const panelBox = panel.getBoundingClientRect();
            lens.style.left = `${event.clientX - panelBox.left - LENS_SIZE / 2}px`;
            lens.style.top = `${event.clientY - panelBox.top - LENS_SIZE / 2}px`;
            lens.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
            lens.style.backgroundSize = `${box.width * ZOOM}px ${box.height * ZOOM}px`;
            lens.style.backgroundPosition =
                `${LENS_SIZE / 2 - x * ZOOM}px ${LENS_SIZE / 2 - y * ZOOM}px`;
        }

        panel.addEventListener('mousemove', move);
        panel.addEventListener('mouseleave', () => { lens.style.display = 'none'; });
    });
})();
