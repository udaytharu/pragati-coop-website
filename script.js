// Toggle Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Form validation
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.querySelector("input[type='text']").value;
    let email = document.querySelector("input[type='email']").value;
    let message = document.querySelector("textarea").value;

    if (name && email && message) {
        alert("Form submitted successfully! We will get back to you as soon as possible.");
        this.reset();
    } else {
        alert("Please fill out all fields.");
    }
});

// News slider
let newsItems = document.querySelectorAll(".news-item");
let currentNews = 0;

function slideNews() {
    newsItems.forEach(item => item.style.display = "none");
    newsItems[currentNews].style.display = "block";
    currentNews = (currentNews + 1) % newsItems.length;
}

setInterval(slideNews, 3000); // Set time here in milliseconds
slideNews();

// Go to Top Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const goToTopButton = document.querySelector('.go-to-top');

    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            goToTopButton.style.display = 'block';
        } else {
            goToTopButton.style.display = 'none';
        }
    });

    // Smooth scroll to top when the button is clicked
    goToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});