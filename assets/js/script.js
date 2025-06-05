// Constants
const SCROLL_THRESHOLD = 300;
let isScrolling = false;

// Form Validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.from_name.trim()) {
        errors.push("Name is required");
    }
    
    if (!formData.phone.trim()) {
        errors.push("Phone number is required");
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
        errors.push("Please enter a valid phone number");
    }
    
    if (formData.from_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
        errors.push("Please enter a valid email address");
    }
    
    if (!formData.message.trim()) {
        errors.push("Message is required");
    }
    
    return errors;
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Alert Message Functionality
function showAlertMessage() {
    setTimeout(function() {
        const alert = document.getElementById('customAlert');
        if (alert) {
            // Create close button if it doesn't exist
            if (!alert.querySelector('.alert-close')) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'alert-close';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                closeBtn.setAttribute('aria-label', 'Close alert');
                closeBtn.onclick = function() {
                    alert.style.display = 'none';
                };
                alert.appendChild(closeBtn);
            }

            alert.style.display = 'flex';
            alert.style.alignItems = 'center';
            alert.style.justifyContent = 'space-between'; // Changed to space-between for close button
            
            // Auto hide after 5 seconds
            const autoHideTimeout = setTimeout(function() {
                alert.style.display = 'none';
            }, 5000);

            // Clear timeout if user manually closes
            alert.querySelector('.alert-close').addEventListener('click', function() {
                clearTimeout(autoHideTimeout);
            });
        }
    }, 1000);
}

// EmailJS Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            try {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                this.classList.add('loading');
                
                const formData = {
                    from_name: this.querySelector("input[name='from_name']").value,
                    from_email: this.querySelector("input[name='from_email']").value,
                    phone: this.querySelector("input[name='phone']").value,
                    message: this.querySelector("textarea[name='message']").value
                };

                const errors = validateForm(formData);
                if (errors.length > 0) {
                    throw new Error(errors.join("\n"));
                }

                const response = await emailjs.send(
                    "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
                    "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
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
                this.classList.remove('loading');
            }
        });

        // Real-time form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const formData = {
                    from_name: contactForm.querySelector("input[name='from_name']").value,
                    from_email: contactForm.querySelector("input[name='from_email']").value,
                    phone: contactForm.querySelector("input[name='phone']").value,
                    message: contactForm.querySelector("textarea[name='message']").value
                };
                
                const errors = validateForm(formData);
                const errorElement = input.parentElement.querySelector('.error-message') || 
                                   document.createElement('div');
                
                if (!errorElement.classList.contains('error-message')) {
                    errorElement.className = 'error-message';
                    input.parentElement.appendChild(errorElement);
                }
                
                const fieldError = errors.find(err => err.toLowerCase().includes(input.name));
                errorElement.textContent = fieldError || '';
                input.setCustomValidity(fieldError || '');
            });
        });
    }

    showAlertMessage();
});

// Scroll Handling with Performance Optimization
const goToTopButton = document.querySelector('.go-to-top');

if (goToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            goToTopButton.classList.add('visible');
        } else {
            goToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    goToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Lazy Loading Images with Intersection Observer
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', () => {
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    
    // Add loading="lazy" to all images without it
    document.querySelectorAll('img:not([loading])').forEach(img => {
        if (!img.closest('.banner-image')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});