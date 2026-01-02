// Latest Posts Display - Shows latest 3 news and notices on index page

async function displayLatestPosts() {
    try {
        const { notices, news } = await dataService.getLatestPosts();

        // Display news
        displayLatestNews(news);

        // Display notices
        displayLatestNotices(notices);

    } catch (error) {
        console.error('Error loading latest posts:', error);
        // Show empty state
        showEmptyState();
    }
}

function displayLatestNews(news) {
    const newsGrid = document.getElementById('newsGrid');
    const newsContainer = document.getElementById('newsContainer');

    if (!newsGrid) return;

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

    // Create news cards
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
            imageWrapper.style.overflow = 'hidden';
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
        newsGrid.appendChild(newsCard);
    });
}

function displayLatestNotices(notices) {
    const noticeContainer = document.querySelector('.notice-container');

    if (!noticeContainer) return;

    if (notices.length === 0) {
        noticeContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666;">
                <i class="fas fa-inbox" style="font-size: 64px; opacity: 0.5; margin-bottom: 20px;"></i>
                <p style="font-size: 18px;">कुनै सूचना उपलब्ध छैन</p>
            </div>
        `;
        return;
    }

    // Clear existing content
    noticeContainer.innerHTML = '';

    // Create grid container for static display
    const noticeGrid = document.createElement('div');
    noticeGrid.className = 'notice-grid';
    noticeGrid.style.display = 'grid';
    noticeGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
    noticeGrid.style.gap = '20px';
    noticeGrid.style.padding = '20px 0';

    // Limit to 3 notices for index page
    const displayNotices = notices.slice(0, 3);

    displayNotices.forEach((notice, index) => {
        const noticeItem = document.createElement('div');
        noticeItem.className = 'notice-item';
        noticeItem.style.padding = '20px';
        noticeItem.style.borderRadius = '12px';
        noticeItem.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 243, 199, 0.08) 100%)';
        noticeItem.style.boxShadow = '0 4px 6px rgba(30, 58, 138, 0.08)';
        noticeItem.style.border = '1px solid rgba(30, 58, 138, 0.12)';
        noticeItem.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        noticeItem.style.position = 'relative';
        noticeItem.style.overflow = 'hidden';

        // Add top border accent
        const accentBar = document.createElement('div');
        accentBar.style.position = 'absolute';
        accentBar.style.top = '0';
        accentBar.style.left = '0';
        accentBar.style.width = '100%';
        accentBar.style.height = '4px';
        accentBar.style.backgroundColor = '#1e3a8a';
        accentBar.style.transform = 'scaleX(0)';
        accentBar.style.transition = 'transform 0.3s ease';
        accentBar.style.transformOrigin = 'left';
        noticeItem.appendChild(accentBar);

        noticeItem.onmouseover = () => {
            noticeItem.style.transform = 'translateY(-5px)';
            noticeItem.style.boxShadow = '0 8px 16px rgba(30, 58, 138, 0.15)';
            accentBar.style.transform = 'scaleX(1)';
        };
        noticeItem.onmouseout = () => {
            noticeItem.style.transform = 'translateY(0)';
            noticeItem.style.boxShadow = '0 4px 6px rgba(30, 58, 138, 0.08)';
            accentBar.style.transform = 'scaleX(0)';
        };

        const heading = document.createElement('h2');
        heading.textContent = notice.heading;
        heading.style.marginBottom = '10px';
        heading.style.color = '#1e3a8a';
        heading.style.fontSize = '18px';
        heading.style.fontWeight = 'bold';
        heading.style.lineHeight = '1.3';
        noticeItem.appendChild(heading);

        const dateElement = document.createElement('div');
        dateElement.className = 'notice-date';
        dateElement.style.display = 'flex';
        dateElement.style.alignItems = 'center';
        dateElement.style.gap = '8px';
        dateElement.style.margin = '10px 0';
        dateElement.style.fontSize = '14px';
        dateElement.style.color = '#666';
        const calendarIcon = document.createElement('i');
        calendarIcon.className = 'fas fa-calendar';
        calendarIcon.style.color = 'var(--primary-color, #1e3a8a)';
        dateElement.appendChild(calendarIcon);
        const dateText = document.createElement('span');
        dateText.textContent = formatDate(notice.date);
        dateElement.appendChild(dateText);
        noticeItem.appendChild(dateElement);

        if (notice.content) {
            const contentElement = document.createElement('div');
            contentElement.className = 'notice-content';
            const contentP = document.createElement('p');
            contentP.textContent = notice.content.length > 150 ? notice.content.substring(0, 150) + '...' : notice.content;
            contentP.style.lineHeight = '1.6';
            contentP.style.marginBottom = '15px';
            contentP.style.fontSize = '14px';
            contentP.style.color = '#333';
            contentElement.appendChild(contentP);
            noticeItem.appendChild(contentElement);
        }

        if (notice.image) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'notice-image-container';
            imageContainer.style.marginTop = '15px';
            imageContainer.style.position = 'relative';
            imageContainer.style.cursor = 'pointer';
            imageContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

            const image = document.createElement('img');
            image.src = notice.image;
            image.alt = notice.heading;
            image.className = 'notice-image';
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

            imageContainer.onmouseover = () => {
                image.style.transform = 'scale(1.05)';
                overlay.style.opacity = '1';
            };
            imageContainer.onmouseout = () => {
                image.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            };

            // Make image clickable to open in new tab
            imageContainer.onclick = () => {
                window.open(notice.image, '_blank');
            };

            imageContainer.appendChild(image);
            imageContainer.appendChild(overlay);
            noticeItem.appendChild(imageContainer);
        }

        noticeGrid.appendChild(noticeItem);
    });

    noticeContainer.appendChild(noticeGrid);
}

function showEmptyState() {
    const newsGrid = document.getElementById('newsGrid');
    const noticeContainer = document.querySelector('.notice-container');

    if (newsGrid) {
        newsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-inbox"></i>
                <p>कुनै समाचार तथा गतिविधिहरू उपलब्ध छैन</p>
            </div>
        `;
    }

    if (noticeContainer) {
        noticeContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666;">
                <i class="fas fa-inbox" style="font-size: 64px; opacity: 0.5; margin-bottom: 20px;"></i>
                <p style="font-size: 18px;">कुनै सूचना उपलब्ध छैन</p>
            </div>
        `;
    }
}

// Date formatting function
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ne-NP', options);
}

// Load latest posts when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only run on index page
    if (window.location.pathname === '/' ||
        window.location.pathname === '/index.html' ||
        window.location.pathname.endsWith('index.html')) {
        displayLatestPosts();
    }
});