document.addEventListener("DOMContentLoaded", function () {
    var currentPage = window.location.pathname.split("/").pop();
    var footerPath = "footer.html"
    var fullPath = window.location.pathname;

    if (currentPage == "index.html") {
        footerPath = "html/footer.html"
    } else if (fullPath.includes('/projects/')) {
        footerPath = "../../html/footer.html"
    } else if (fullPath.includes('/blog/')) {
        footerPath = "../../html/footer.html"
    }

    fetch(footerPath)
        .then(response => response.text())
        .then(content => {
            document.getElementById("footer-container").innerHTML = content;
        });
});