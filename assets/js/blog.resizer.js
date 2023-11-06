const smallBoxes = document.querySelectorAll('.blog-post');

for (const smallBox of smallBoxes) {
  const contentHeight = smallBox.querySelector('.tags').clientHeight + smallBox.querySelector('h3').clientHeight + smallBox.querySelector('p').clientHeight;

  if (contentHeight > smallBox.clientHeight) {
    smallBox.style.height = contentHeight + 'px';
  }
}