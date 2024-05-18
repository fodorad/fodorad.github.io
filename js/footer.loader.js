document.addEventListener("DOMContentLoaded", function () {
    var fullPath = window.location.pathname;

    var footerPath = "../html/footer.html"
    if (fullPath.includes('/projects/') || fullPath.includes('/blog/')) {
        footerPath = "../../html/footer.html";
    }

    fetch(footerPath)
        .then(response => response.text())
        .then(content => {
            document.getElementById("footer-container").innerHTML = content;
        });
});