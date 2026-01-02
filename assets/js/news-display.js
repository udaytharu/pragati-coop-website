// News Display JavaScript - Dynamically loads news using data service

async function loadNews() {
    const news = await dataService.getNews();
    const newsGrid = document.getElementById('newsGrid');
    const newsContainer = document.getElementById('newsContainer');
    
    if (!newsGrid) return;
    
    // Sort news by date (newest first)
    news.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Limit to 3 latest news on index page
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        news = news.slice(0, 3);
    }
    
    if (news.length === 0) {
        newsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-inbox"></i>
                <p>कुनै समाचार तथा गतिविधिहरू उपलब्ध छैन</p>
            </div>
        `;
        return;
    }
    
    // Clear existing content
    newsGrid.innerHTML = '';
    
    // Create news cards with staggered animation
    news.forEach((item, index) => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        
        // Image wrapper
        if (item.image) {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'news-card-image-wrapper';
            imageWrapper.style.position = 'relative';
            imageWrapper.style.cursor = 'pointer';
            imageWrapper.style.borderRadius = '8px';
            imageWrapper.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.heading;
            image.className = 'news-card-image';
            image.style.transition = 'transform 0.3s ease';

            // Add overlay with zoom icon
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(30, 58, 138, 0.8)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            overlay.style.borderRadius = '8px';

            const zoomIcon = document.createElement('i');
            zoomIcon.className = 'fas fa-search-plus';
            zoomIcon.style.color = 'white';
            zoomIcon.style.fontSize = '24px';
            overlay.appendChild(zoomIcon);

            imageWrapper.onmouseover = () => {
                image.style.transform = 'scale(1.05)';
                overlay.style.opacity = '1';
            };
            imageWrapper.onmouseout = () => {
                image.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            };

            // Make image clickable to open in new tab
            imageWrapper.onclick = () => {
                window.open(item.image, '_blank');
            };

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(overlay);
            newsCard.appendChild(imageWrapper);
        }
        
        // Content wrapper
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'news-card-content';
        
        // Heading
        const heading = document.createElement('h2');
        heading.textContent = item.heading;
        contentWrapper.appendChild(heading);
        
        // Date
        const dateElement = document.createElement('div');
        dateElement.className = 'news-date';
        dateElement.style.display = 'flex';
        dateElement.style.alignItems = 'center';
        dateElement.style.gap = '8px';
        const calendarIcon = document.createElement('i');
        calendarIcon.className = 'fas fa-calendar';
        calendarIcon.style.color = 'var(--primary-color, #1e3a8a)';
        dateElement.appendChild(calendarIcon);
        const dateText = document.createElement('span');
        dateText.textContent = formatDate(item.date);
        dateElement.appendChild(dateText);
        contentWrapper.appendChild(dateElement);
        
        // Content
        if (item.content) {
            const contentElement = document.createElement('div');
            contentElement.className = 'news-content';
            contentElement.textContent = item.content;
            contentWrapper.appendChild(contentElement);
        }
        
        newsCard.appendChild(contentWrapper);
        // Add staggered animation delay
        newsCard.style.animationDelay = `${index * 0.1}s`;
        newsGrid.appendChild(newsCard);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ne-NP', options);
}

// Load news when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
});

