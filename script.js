// Toggle Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu?.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger?.classList.remove("active");
        navMenu?.classList.remove("active");
    });
});

// EmailJS Contact Form Submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            const formData = {
                from_name: this.querySelector("input[name='name']").value,
                from_email: this.querySelector("input[name='email']").value,
                phone: this.querySelector("input[name='phone']").value,
                message: this.querySelector("textarea[name='message']").value
            };

            if (!formData.from_name || !formData.phone || !formData.message) {
                throw new Error("Please fill out all required fields.");
            }

            const response = await emailjs.send(
                "YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
                formData
            );

            if (response.status === 200) {
                showNotification("Message sent successfully! We will get back to you soon.", "success");
                this.reset();
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            showNotification(error.message || "Failed to send message. Please try again later.", "error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const goToTopButton = document.querySelector('.go-to-top');
    
    if (goToTopButton) {
        const scrollThreshold = 300;

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                goToTopButton.classList.add('visible');
            } else {
                goToTopButton.classList.remove('visible');
            }
        });

        goToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

window.addEventListener('scroll', () => {
    console.log('Scroll position:', window.scrollY);
    if (window.scrollY > scrollThreshold) {
        goToTopButton.classList.add('visible');
    } else {
        goToTopButton.classList.remove('visible');
    }
});

// Alert Modal with Local Storage
document.addEventListener('DOMContentLoaded', () => {
    const alertModal = document.getElementById('alert-modal');
    const closeAlertButton = document.getElementById('close-alert');
    
    if (alertModal && closeAlertButton) {
        const modalShown = localStorage.getItem('alertModalShown');
        
        if (!modalShown) {
            alertModal.classList.add('active');
        }

        const closeModal = () => {
            alertModal.classList.remove('active');
            localStorage.setItem('alertModalShown', 'true');
        };

        closeAlertButton.addEventListener('click', closeModal);
        
        alertModal.addEventListener('click', (event) => {
            if (event.target === alertModal) {
                closeModal();
            }
        });
    }
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});