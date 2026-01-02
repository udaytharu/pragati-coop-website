// Constants
const SCROLL_THRESHOLD = 300;
let isScrolling = false;


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
    // Only show if not already shown in this session
    if (sessionStorage.getItem('alertShown')) return;
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

            // Mark as shown for this session
            sessionStorage.setItem('alertShown', 'true');
        }
    }, 1000);
}


    // Notice Modal Logic
    var noticeModal = document.getElementById('notice-modal');
    var noticeClose = document.getElementById('notice-modal-close');
    function showAlertMessageAfterModal() {
        showAlertMessage();
    }
    if (noticeModal && noticeClose) {
        // Only show modal if not already shown in this session
        if (!sessionStorage.getItem('noticeModalShown')) {
            noticeModal.style.display = 'flex';
            var noticeImg = noticeModal.querySelector('.notice-modal-img');
            if (noticeImg) {
                noticeImg.style.cursor = 'pointer';
                noticeImg.onclick = function(e) {
                    e.stopPropagation();
                    window.open('/notice/notice img/notice.png', '_blank');
                };
            }
            noticeClose.onclick = function() {
                noticeModal.style.display = 'none';
                sessionStorage.setItem('noticeModalShown', 'true');
                showAlertMessageAfterModal();
            };
            noticeModal.onclick = function(e) {
                if (e.target === noticeModal) {
                    noticeModal.style.display = 'none';
                    sessionStorage.setItem('noticeModalShown', 'true');
                    showAlertMessageAfterModal();
                }
            };
        } else {
            showAlertMessage();
        }
    } else {
        showAlertMessage();
    }

    // Animate all organization profile numbers
    const counters = [
        { id: 'active-members-count', target: 5000, duration: 1800 },
        { id: 'branches-count', target: 8, duration: 1000 },
        { id: 'years-count', target: 29, duration: 1200 },
        { id: 'projects-count', target: 50, duration: 1200 },
        { id: 'total-assets-count', target: NaN, duration: 1500 },
        { id: 'loan-distribution-count', target: NaN, duration: 1500 }
    ];
    counters.forEach(function(counter) {
        var el = document.getElementById(counter.id);
        if (el) {
            var start = 0;
            var startTime = null;
            function animateCount(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / counter.duration, 1);
                var value = Math.floor(progress * (counter.target - start) + start);
                el.textContent = value.toLocaleString('en-US');
                if (progress < 1) {
                    requestAnimationFrame(animateCount);
                } else {
                    el.textContent = counter.target.toLocaleString('en-US');
                }
            }
            requestAnimationFrame(animateCount);
        }
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